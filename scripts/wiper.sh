#!/usr/bin/env bash

# wipe and initialize the database

set -e

echo 'Deleting volume node-swagger-example-data ... ... ...'
./db/init/rm_volume.sh || true
echo ''

echo 'Creating volume node-swagger-example-data ... ... ...'
./db/init/create_volume.sh
echo 'Done!'

echo 'Initializing database ... ... ...'
docker-compose -f db/init/docker-compose.yml run --rm init
docker-compose -f db/init/docker-compose.yml down
echo ''
echo 'Success!'
echo ''

