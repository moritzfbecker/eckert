# Multi-stage Docker build for Frontend
# Stage 1: Build React app with Vite
FROM node:20-alpine AS build

WORKDIR /app

# Install pnpm (understands workspace:* syntax!)
RUN npm install -g pnpm

# Copy all files
COPY package*.json pnpm-lock.yaml* ./
COPY turbo.json ./
COPY packages packages/

# Install all dependencies with pnpm (workspace aware!)
RUN pnpm install --frozen-lockfile || pnpm install

# Build with Turborepo
RUN pnpm run build

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
