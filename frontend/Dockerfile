# Build Stage
FROM node:18 AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build


# Nginx Stage
FROM nginx:stable-alpine

# Remove default site
RUN rm -rf /usr/share/nginx/html/*

# Copy React build into Nginx HTML folder
COPY --from=build /app/build /usr/share/nginx/html

# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
