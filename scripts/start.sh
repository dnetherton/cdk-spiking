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

docker network create lambda-local || true
docker stop mysql-docker || true
docker run --rm \
           --name mysql-docker \
           -e MYSQL_ROOT_PASSWORD=docker \
           -d \
           -p 3306:3306 \
           --network lambda-local \
           mysql

echo "Waiting for mysql to start"
set +e
SET_AUTH_TYPE="ALTER USER 'root'@'%' IDENTIFIED WITH mysql_native_password BY 'docker';"
cmd="printf '.'; mysql --host localhost -P 3306 --protocol=tcp -u root -pdocker -e \"$SET_AUTH_TYPE\" > /dev/null 2>&1;"
eval $cmd
while [ $? -ne 0 ]; do sleep 1; eval $cmd; done
set -e

echo

CREATE_DB="CREATE DATABASE blah;"
mysql --host localhost -P 3306 --protocol=tcp -u root -pdocker -e "$CREATE_DB"

echo "mysql started and initialised"

sam local start-api -t .template.yaml --docker-network lambda-local

#docker stop pg-docker
