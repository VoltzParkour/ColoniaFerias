//Dockerfile
FROM node:7.10.0

# use changes to package.json to force Docker not to use the cache# when we change our application's nodejs dependencies:ADD package.json /tmp/package.jsonRUN cd /tmp && yarn installRUN mkdir -p /usr/src/app && cp -a /tmp/node_modules /usr/src/app

# From here we load our application's code in, therefore the previous docker# "layer" thats been cached will be used if possibleWORKDIR /usr/src/appADD . /usr/src/app

RUN npm run buildRUN rm -rf ./buildRUN rm -rf ./testRUN rm -rf ./src

ENV PORT=80
EXPOSE 80

CMD ["npm", "start"]

//.dockerignore
dist
node_modules