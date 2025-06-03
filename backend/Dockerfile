# Stage 1: Build the TypeScript application
FROM node:20-alpine AS builder
WORKDIR /app

# Install dependencies first for better caching
COPY package*.json ./
RUN npm ci

# Copy source code and build
COPY . .
RUN npm run build

# Stage 2: Create production image
FROM node:20-alpine
WORKDIR /app

# Install production dependencies only
COPY package*.json ./
RUN npm ci --omit=dev

# Copy built files from builder stage
COPY --from=builder /app/dist ./dist

# Copy necessary files
COPY prisma ./prisma
COPY .env .env

# Install Prisma CLI and generate client
RUN npm install -g prisma
RUN prisma generate

# Expose port and start application
EXPOSE 5000
CMD ["npm", "start"]