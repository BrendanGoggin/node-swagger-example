#!/usr/bin/env bash

# run a mysql shell using the node-swagger-example image
docker-compose run --rm --name node-swagger-example-mysql \
  node-swagger-example bash -c "mysql -h mysql todo"
