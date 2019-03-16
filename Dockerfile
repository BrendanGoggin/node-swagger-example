# uses ubuntu base image, installs node, yarn, etc.
FROM ubuntu:18.04

# general setup: node, yarn, etc.
RUN apt-get update && apt-get upgrade -y && apt-get install -y \
  curl \
  gnupg2 \
  mysql-client \
  vim
RUN curl -sL https://deb.nodesource.com/setup_10.x | bash -
RUN apt-get install -y nodejs
RUN curl -sL https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo 'deb https://dl.yarnpkg.com/debian/ stable main' | tee /etc/apt/sources.list.d/yarn.list
RUN apt-get update && apt-get install -y yarn

# app-specific setup
COPY ./app /root/app
COPY ./db /root/db
RUN mkdir -p /root/app/node_modules
WORKDIR /root/app
COPY app/package*.json .
RUN yarn install

EXPOSE 3000
CMD [ 'yarn', 'start' ]
