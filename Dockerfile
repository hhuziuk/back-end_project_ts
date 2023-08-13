FROM node:latest

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

COPY ./build ./build

CMD ["npm", "run", "start:dev"]