docker-compose -f docker-compose-docker.yml build $1
docker-compose -f docker-compose-docker.yml up -d $1
docker-compose -f docker-compose-docker.yml logs -f $1