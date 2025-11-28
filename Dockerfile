# Stage 1: Build React UI
FROM node:20-alpine AS build

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Serve menggunakan NGINX
FROM nginx:stable-alpine

RUN rm -rf /usr/share/nginx/html/*

# Copy build output
COPY --from=build /app/dist /usr/share/nginx/html

# Copy default runtime env (akan dioverride oleh ConfigMap)
COPY public/env.js /usr/share/nginx/html/env.js

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
