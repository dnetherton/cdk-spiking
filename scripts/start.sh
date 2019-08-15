#!/bin/bash

set -e
set -x

SAM_LOCAL=true cdk synth > .template.yaml

# docker stop pg-docker || true
# docker run --rm  \
#            --name pg-docker \
#            -e POSTGRES_PASSWORD=docker \
#            -d \
#            -p 5432:5432 \
#            -v /tmp/postgresdata:/var/lib/postgresql/data  \
#            postgres

docker stop mysql-docker
docker run --rm \
           --name mysql-docker \
           -e MYSQL_ROOT_PASSWORD=docker \
           -d \
           -p 3306:3306 \
           mysql

sam local start-api -t .template.yaml

#docker stop pg-docker
