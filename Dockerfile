FROM node:14-alpine

WORKDIR /app

ADD . /app

RUN npm i

CMD node -r esm index.js