FROM node:16-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npx prisma generate --schema src/database/prisma/schema.test.prisma

CMD [ "npm", "start" ]