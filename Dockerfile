FROM node:10.13.0-alpine


EXPOSE 3000
RUN mkdir -p /usr/app/current
WORKDIR /usr/app/current

COPY package.json .

RUN npm install

COPY . .

#docker build -t api-node:v1 .
