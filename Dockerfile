FROM node:lts-alpine

EXPOSE 3000
# RUN mkdir -p /usr/app/current
WORKDIR /usr/app/current

# COPY package.json .

RUN npm i -g nodemon --silent
RUN npm i -g jest --silent
# RUN npm i --silent

# COPY . .

# CMD node server.js
#docker build -t api-node:v1 .
