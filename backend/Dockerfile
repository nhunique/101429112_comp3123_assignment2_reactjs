# Backend Dockerfile
FROM node:18

# Create app dir
WORKDIR /app

# Copy package.json first (better caching)
COPY package*.json ./

RUN npm install

# Copy rest of backend code
COPY . .

# Expose backend port
EXPOSE 5000

# Start backend
CMD ["npm", "start"]
