FROM node:7

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json /usr/src/app/

RUN npm set progress=false
RUN npm install
RUN npm install -g reggie

COPY . /usr/src/app
