FROM node:10-alpine

# make sure the user named 'node' owns the right folders
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app
COPY app/package*.json ./
USER node
RUN npm install
COPY --chown=node:node ./app .

EXPOSE 3000
CMD [ "npm", "start" ]
