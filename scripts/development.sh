#!/bin/bash

CONTAINER_NAME=Shroff_dev

docker stop ${CONTAINER_NAME}
docker rm ${CONTAINER_NAME}

docker run -it -d -p 3030:3000 --name ${CONTAINER_NAME} -e "NODE_ENV=dev"