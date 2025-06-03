# Stage 1: Build React application
FROM node:20-alpine AS build
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci

# Copy source and build
COPY . .
RUN npm run build

# Stage 2: Production image with Nginx
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html

# # Copy custom Nginx config
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port and start
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]