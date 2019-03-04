#!/usr/bin/env bash

# run a bash shell using the node-swagger-example image
docker-compose run --rm -p 3000:3000 --name node-swagger-example-bash node-swagger-example bash
