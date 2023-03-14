# FROM node:9.8.0 AS build
#FROM node:10.16.3-alpine AS build
###LABEL maintainer "jrofurtado@gmail.com"
###WORKDIR /app
###COPY package.json yarn.lock ./
###RUN yarn
###COPY . .babelrc backup/
###RUN rm -rf backup/node_modules dist coverage && cp -r backup/* . && cp backup/.babelrc . && rm -rf backup
# RUN yarn test && yarn build
###RUN yarn build
###RUN mkdir vendor && mkdir app && mkdir other && mv dist/vendor* vendor && mv dist/app* app && mv dist/* other

#FROM nginx:1.13.10-alpine
###LABEL maintainer "jrofurtado@gmail.com"
###RUN apk add --update curl && rm -rf /var/cache/apk/*
###HEALTHCHECK --interval=30s --timeout=3s CMD curl -f http://localhost:8080/ || exit 1
###COPY nginx-conf-setup-preload.sh /
###COPY nginx.conf /etc/nginx/
###COPY --from=build /app/vendor /usr/share/nginx/html/
###COPY --from=build /app/other /usr/share/nginx/html/
###COPY --from=build /app/app /usr/share/nginx/html/
###RUN sed -i 's@__PRELOAD@'"$(sh /nginx-conf-setup-preload.sh /usr/share/nginx/html)"'@g' /etc/nginx/nginx.conf

FROM node:19.6.1-alpine3.16 as builder
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
RUN npm install
COPY . ./
RUN npm run build

FROM nginx:1.17.9-alpine
COPY files/ /
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 CMD wget -O /dev/null http://localhost || exit 1
COPY --from=builder /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["sh", "/env.sh"]
