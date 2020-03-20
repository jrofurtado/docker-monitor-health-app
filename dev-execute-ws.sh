#!/bin/sh
set -e

if [ $# -ne 6 ]; then
  echo 1>&2 "Usage: . $0 host username password flags method path. Example $0 172.17.0.1 admin password \"-i\" GET \"/api/app?appName=monitor\""
  return 1
fi
TOKEN=$(sh dev-keycloak-curl.sh $1 $2 $3)
CURL="curl $4 -X$5 \"http://$1$6\" -H \"Authorization: Bearer $TOKEN\""
eval $CURL