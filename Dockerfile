FROM node:alpine
WORKDIR /app
COPY . .
RUN apk --update add nginx &&\
    npm install -g serve &&\
    yarn &&\
    yarn run  build-prod
WORKDIR /app/dist/logfish
ENTRYPOINT ["/app/scripts/docker-entrypoint.sh"]
