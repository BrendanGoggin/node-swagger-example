#!/usr/bin/env bash

set -e

WITH_HOST="-h ${DB_HOST:-mysql} "
WITH_USER="-u${DB_USER:-root}"
WITH_PASSWORD=''

if [ $DB_PASSWORD ]; then
  WITH_PASSWORD="-p'$DB_PASSWORD'"
fi

# note: this is intended to show an error if the db already exists
echo "Creating db 'todo' ... ... ..."
mysql $WITH_HOST $WITH_USER $WITH_PASSWORD -e "CREATE DATABASE todo;"
echo "Done!"
echo "All databases:"
mysql $WITH_HOST $WITH_USER $WITH_PASSWORD -e "SHOW DATABASES;"
