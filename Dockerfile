FROM node:12-slim

RUN mkdir /public-service
COPY . /public-service

WORKDIR /public-service

RUN npm install --only=prod
RUN npm run build

CMD [ "npm", "run", "start:prod" ]
