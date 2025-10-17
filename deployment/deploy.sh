#!/bin/bash
# Eckert Preisser Enterprise - Production Deployment Script
# Version: 1.0.0
# Author: Moritz F. Becker

set -e  # Exit on error

echo "=========================================="
echo "Eckert Preisser Enterprise Deployment"
echo "=========================================="
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
PROJECT_DIR="/opt/eckert-enterprise"
BACKEND_DIR="$PROJECT_DIR/backend"
FRONTEND_DIR="$PROJECT_DIR/frontend"
NGINX_ROOT="/var/www/eckert-enterprise"

# Functions
print_success() {
    echo -e "${GREEN}✓${NC} $1"
}

print_error() {
    echo -e "${RED}✗${NC} $1"
}

print_info() {
    echo -e "${YELLOW}→${NC} $1"
}

# Check if running as correct user
if [ "$EUID" -eq 0 ]; then
    print_error "Don't run as root! Run as regular user with docker permissions."
    exit 1
fi

# 1. Pull latest code
print_info "Pulling latest code from GitHub..."
cd "$PROJECT_DIR"
git pull origin main
print_success "Code updated"

# 2. Backend Deployment
print_info "Deploying Backend..."
cd "$BACKEND_DIR"

# Stop services
docker compose down
print_success "Services stopped"

# Rebuild
docker compose build
print_success "Services rebuilt"

# Start
docker compose up -d
print_success "Services started"

# Wait for startup
print_info "Waiting for services to start (30 seconds)..."
sleep 30

# Health checks
print_info "Running health checks..."
if curl -f http://localhost:8761/actuator/health > /dev/null 2>&1; then
    print_success "Eureka: UP"
else
    print_error "Eureka: DOWN"
fi

if curl -f http://localhost:8888/actuator/health > /dev/null 2>&1; then
    print_success "Config Server: UP"
else
    print_error "Config Server: DOWN"
fi

if curl -f http://localhost:8080/actuator/health > /dev/null 2>&1; then
    print_success "API Gateway: UP"
else
    print_error "API Gateway: DOWN"
fi

# 3. Frontend Deployment
print_info "Deploying Frontend..."
cd "$FRONTEND_DIR"

# Install dependencies
npm install
print_success "Dependencies installed"

# Build
npm run build
print_success "Frontend built"

# Deploy to nginx
sudo cp -r packages/shell/dist/* "$NGINX_ROOT/"
sudo chown -R www-data:www-data "$NGINX_ROOT"
print_success "Frontend deployed to nginx"

# Reload nginx
sudo systemctl reload nginx
print_success "Nginx reloaded"

# 4. Final checks
echo ""
echo "=========================================="
echo "Deployment Complete!"
echo "=========================================="
echo ""
echo "Services:"
echo "  - Eureka: http://localhost:8761"
echo "  - Config Server: http://localhost:8888"
echo "  - API Gateway: http://localhost:8080"
echo ""
echo "Frontend: http://ihre-domain.de"
echo ""
echo "Check logs: docker compose logs -f"
echo ""
