# Pull latest official node image
FROM node:latest

RUN mkdir /frontend
WORKDIR /frontend
COPY package.json /frontend/package.json
RUN npm install