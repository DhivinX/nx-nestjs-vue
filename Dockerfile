FROM node:18.13-alpine
WORKDIR /usr

COPY package.json ./
COPY package-lock.json ./
COPY dist/apps/server ./server

RUN ls -a
RUN npm install

CMD node ./server/main.js