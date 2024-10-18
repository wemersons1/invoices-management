FROM node:18-slim

RUN mkdir app

WORKDIR /usr/app

RUN apt-get update -y && apt-get install -y openssl

COPY package.json /usr/app

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]