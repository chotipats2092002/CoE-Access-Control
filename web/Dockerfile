FROM node:18-alpine AS build

WORKDIR /app

COPY . .

RUN npm install

RUN npm i tailwindcss

CMD ["npm", "run", "dev"]


# ใช้ Node.js เป็น base image สำหรับ build React
# FROM node:18 AS build

# WORKDIR /app

# COPY package*.json ./

# RUN npm install

# COPY . .
# RUN npm run build

# FROM nginx:alpine
# COPY --from=build /app/dist /usr/share/nginx/html

# EXPOSE 80

# CMD ["nginx", "-g", "daemon off;"]