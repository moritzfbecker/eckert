# Multi-stage Docker build for Frontend
# Stage 1: Build React app with Vite + Turborepo
FROM node:20-alpine AS build

WORKDIR /app

# Copy all package files (Turborepo workspace)
COPY package*.json ./
COPY turbo.json ./
COPY packages packages/

# Install dependencies (workspace aware!)
RUN npm install

# Build for production
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine

# Copy built files from build stage
COPY --from=build /app/packages/shell/dist /usr/share/nginx/html

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
