FROM node:18-alpine as builder

WORKDIR /app

COPY package*.json ./

RUN npm install 

COPY . .

RUN npm run build

EXPOSE 000

CMD ["npm", "run", "dev"]