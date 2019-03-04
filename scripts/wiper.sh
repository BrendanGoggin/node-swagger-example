#!/usr/bin/env bash

# wipe and initialize the database

set -e

# if mysql container is running, kill it
if docker ps -f name=mysql | grep mysql >/dev/null 2>&1; then
  echo 'Stopping mysql container... ... ...'
  docker kill mysql >/dev/null 2>&1
fi

# if mysql container exists, remove it
if docker ps -a -f name=mysql | grep mysql >/dev/null 2>&1; then
  echo 'Removing mysql container... ... ...'
  docker rm mysql >/dev/null 2>&1
fi

# if volume exists, remove it
if docker volume inspect node-swagger-example-data >/dev/null 2>&1; then
  echo 'Deleting volume node-swagger-example-data ... ... ...'
  ./db/init/rm_volume.sh >/dev/null 2>&1
fi

echo 'Creating volume node-swagger-example-data ... ... ...'
./db/init/create_volume.sh >/dev/null 2>&1

echo ''
echo 'Initializing database ... ... ...'
docker-compose -f db/init/docker-compose.yml run --rm init
docker-compose -f db/init/docker-compose.yml down
echo ''
echo 'Success!'
echo ''

