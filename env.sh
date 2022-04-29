set -e

sed -i s%___KEYCLOAK_AUTH_SERVER_URL___%"$KEYCLOAK_AUTH_SERVER_URL"%g /usr/share/nginx/html/static/js/*.js
sed -i s%___KEYCLOAK_AUTH_SERVER_URL___%"$KEYCLOAK_AUTH_SERVER_URL"%g /usr/share/nginx/html/static/js/*.js.map
sed -i s%___KEYCLOAK_REALM___%"$KEYCLOAK_REALM"%g /usr/share/nginx/html/static/js/*.js
sed -i s%___KEYCLOAK_REALM___%"$KEYCLOAK_REALM"%g /usr/share/nginx/html/static/js/*.js.map
sed -i s%___KEYCLOAK_RESOURCE___%"$KEYCLOAK_RESOURCE"%g /usr/share/nginx/html/static/js/*.js
sed -i s%___KEYCLOAK_RESOURCE___%"$KEYCLOAK_RESOURCE"%g /usr/share/nginx/html/static/js/*.js.map

nginx -g 'daemon off;'