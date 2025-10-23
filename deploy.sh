#!/bin/bash
# Deployment Script for Linux Server
# Usage: ./deploy.sh

set -e  # Exit on error

echo "🚀 Eckert Preisser Enterprise - Docker Deployment"
echo "=================================================="
echo ""

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Step 1: Pull latest code
echo -e "${BLUE}[1/5]${NC} Pulling latest code from GitHub..."
git pull origin main
echo -e "${GREEN}✓${NC} Code updated\n"

# Step 2: Stop running containers
echo -e "${BLUE}[2/5]${NC} Stopping running containers..."
cd backend
docker-compose down
echo -e "${GREEN}✓${NC} Containers stopped\n"

# Step 3: Build and start all services
echo -e "${BLUE}[3/5]${NC} Building and starting all 8 services..."
echo "This may take 10-15 minutes on first run..."
docker-compose up -d --build

echo -e "${GREEN}✓${NC} All services started\n"

# Step 4: Wait for services to be ready
echo -e "${BLUE}[4/5]${NC} Waiting for services to be ready (2 minutes)..."
sleep 120

# Step 5: Health checks
echo -e "${BLUE}[5/5]${NC} Running health checks...\n"

echo -n "Checking Eureka (8761)... "
if curl -s http://localhost:8761 > /dev/null; then
    echo -e "${GREEN}✓ UP${NC}"
else
    echo -e "${RED}✗ DOWN${NC}"
fi

echo -n "Checking Config Server (8888)... "
if curl -s http://localhost:8888/api/config/health > /dev/null; then
    echo -e "${GREEN}✓ UP${NC}"
else
    echo -e "${RED}✗ DOWN${NC}"
fi

echo -n "Checking API Gateway (8080)... "
if curl -s http://localhost:8080/api/health/services > /dev/null; then
    echo -e "${GREEN}✓ UP${NC}"
else
    echo -e "${RED}✗ DOWN${NC}"
fi

echo -n "Checking Frontend (80)... "
if curl -s http://localhost > /dev/null; then
    echo -e "${GREEN}✓ UP${NC}"
else
    echo -e "${RED}✗ DOWN${NC}"
fi

echo ""
echo "=================================================="
echo -e "${GREEN}✓ Deployment Complete!${NC}"
echo "=================================================="
echo ""
echo "Access your application:"
echo "  Frontend: http://$(hostname -I | awk '{print $1}')"
echo "  API:      http://$(hostname -I | awk '{print $1}'):8080"
echo "  Eureka:   http://$(hostname -I | awk '{print $1}'):8761"
echo ""
echo "Useful commands:"
echo "  docker ps                    - View running containers"
echo "  docker-compose logs -f       - View all logs"
echo "  docker-compose restart       - Restart all services"
echo "  docker-compose down          - Stop all services"
echo ""
