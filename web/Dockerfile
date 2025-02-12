FROM node:18-alpine AS build

WORKDIR /app

COPY . .

RUN npm install

RUN npm i tailwindcss

CMD ["npm", "run", "dev"]