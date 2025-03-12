
FROM node:20.10

WORKDIR /fnt_frontend

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

RUN npm run build