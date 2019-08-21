FROM node:8

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY index.js .
COPY package.json .
COPY package-lock.json .

RUN npm ci --production  --unsafe-perm

EXPOSE 3000

CMD [ "node", "index.js" ]
