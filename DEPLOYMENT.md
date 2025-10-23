# Docker Deployment Guide - Linux Server

**Complete deployment with Docker for Backend + Frontend**

---

## 🚀 Quick Start (5 Commands!)

```bash
# 1. SSH to your Linux server
ssh user@your-server.com

# 2. Clone repository
git clone https://github.com/moritzfbecker/eckert.git
cd eckert

# 3. Start EVERYTHING (Backend + Frontend)
cd backend
docker-compose up -d --build

# 4. Check status
docker ps

# 5. Open browser
# → http://your-server-ip (Frontend)
# → http://your-server-ip:8080 (API Gateway)
```

**DONE! All 8 containers running!** 🎉

---

## 📦 What Gets Deployed:

**Backend (7 Containers):**
1. postgres-user - PostgreSQL database (5432)
2. service-discovery - Eureka (8761)
3. config-server - Config API (8888)
4. api-gateway - API Gateway (8080)
5. user-service - User CRUD (8081)
6. auth-service - JWT Auth (8082)
7. email-service - SMTP (8084)

**Frontend (1 Container):**
8. frontend - React + Nginx (80, 443)

**Total: 8 Containers, 1 Network, 2 Volumes**

---

## 🔧 Prerequisites (On Linux Server)

**1. Install Docker:**
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Install Docker Compose
sudo apt install docker-compose -y

# Add user to docker group (no sudo needed!)
sudo usermod -aG docker $USER
newgrp docker

# Verify
docker --version
docker-compose --version
```

**2. Open Firewall Ports:**
```bash
sudo ufw allow 80/tcp    # HTTP (Frontend)
sudo ufw allow 443/tcp   # HTTPS (Frontend)
sudo ufw allow 8080/tcp  # API Gateway (optional - for testing)
sudo ufw enable
```

---

## 📋 Step-by-Step Deployment

### **Step 1: Get Code on Server**

```bash
# Clone repository
cd ~
git clone https://github.com/moritzfbecker/eckert.git
cd eckert

# Checkout main branch
git checkout main
git pull origin main

# Verify
ls -la
# Should show: backend/, frontend/, config/, README.md, etc.
```

### **Step 2: Configure Environment (Optional)**

```bash
# Edit docker-compose.yml if needed
cd backend
nano docker-compose.yml

# Change passwords (IMPORTANT for production!)
# - POSTGRES_PASSWORD (line ~60)
# - DB_PASSWORD (line ~87)
```

**Recommended Production Changes:**
```yaml
# PostgreSQL
environment:
  - POSTGRES_PASSWORD=YOUR_STRONG_PASSWORD_HERE  # Change this!

# user-service
environment:
  - DB_PASSWORD=YOUR_STRONG_PASSWORD_HERE  # Same as above
  - SPRING_PROFILES_ACTIVE=production  # Production mode
```

### **Step 3: Build & Start All Services**

```bash
cd ~/eckert/backend

# Build and start ALL 8 containers
docker-compose up -d --build

# This will:
# 1. Download base images (Maven, JDK, Node, Nginx)
# 2. Build all 7 backend services (~5-10 min)
# 3. Build frontend React app (~2-3 min)
# 4. Start all containers
# Total time: ~10-15 minutes first time
```

### **Step 4: Monitor Progress**

```bash
# Watch all logs (Ctrl+C to exit)
docker-compose logs -f

# Check running containers
docker ps

# Should show 8 containers:
# - backend-postgres-user-1
# - backend-service-discovery-1
# - backend-config-server-1
# - backend-api-gateway-1
# - backend-user-service-1
# - backend-auth-service-1
# - backend-email-service-1
# - backend-frontend-1
```

### **Step 5: Health Checks**

```bash
# Wait ~2-3 minutes for all services to start
sleep 120

# Check Eureka (Service Discovery)
curl http://localhost:8761

# Check Config Server
curl http://localhost:8888/api/config/health

# Check API Gateway
curl http://localhost:8080/api/health/services

# Check Frontend
curl http://localhost

# All should return 200 OK
```

### **Step 6: Test in Browser**

**Open browser:**
```
http://your-server-ip
```

**You should see:**
- ✅ Homepage loads
- ✅ Navbar with HOME, CONCEPT, ABOUT, CONTACT
- ✅ Language switcher (DE/EN)
- ✅ Account button (click → Login/Register)

**Test Auth Flow:**
1. Click ACCOUNT → Register
2. Fill form → Submit
3. User created!
4. Click ACCOUNT → Login
5. Enter credentials → Submit
6. Redirected to Dashboard
7. See user info!

---

## 🔄 Managing Services

### **Start/Stop Services**

```bash
cd ~/eckert/backend

# Stop all
docker-compose down

# Start all
docker-compose up -d

# Restart all
docker-compose restart

# Restart single service
docker-compose restart auth-service
```

### **View Logs**

```bash
# All services
docker-compose logs -f

# Single service
docker-compose logs -f user-service

# Last 100 lines
docker-compose logs --tail=100 api-gateway
```

### **Update Code**

```bash
cd ~/eckert

# Pull latest code
git pull origin main

# Rebuild and restart
cd backend
docker-compose up -d --build

# Or specific service
docker-compose up -d --build auth-service
```

---

## 🌐 Domain Setup (Production)

### **With Domain Name (e.g., eckert.becker.limited)**

**1. Point Domain to Server:**
```
DNS A Record:
  eckert.becker.limited → YOUR_SERVER_IP
  www.eckert.becker.limited → YOUR_SERVER_IP
```

**2. Update nginx.conf:**
```bash
cd ~/eckert/frontend
nano nginx.conf

# Change line:
server_name localhost;
# To:
server_name eckert.becker.limited www.eckert.becker.limited;
```

**3. Rebuild Frontend:**
```bash
cd ~/eckert/backend
docker-compose up -d --build frontend
```

**4. Install SSL (HTTPS):**

**Option A: Let's Encrypt (Automatic, Free)**
```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx -y

# Stop frontend container (Certbot needs port 80)
cd ~/eckert/backend
docker-compose stop frontend

# Get certificate
sudo certbot certonly --standalone -d eckert.becker.limited -d www.eckert.becker.limited

# Update nginx.conf with SSL
# Add to docker-compose.yml:
volumes:
  - /etc/letsencrypt:/etc/letsencrypt:ro

# Restart frontend
docker-compose up -d frontend
```

---

## 🐛 Troubleshooting

### **Services not starting?**

```bash
# Check logs
docker-compose logs service-name

# Check if ports are blocked
sudo netstat -tulpn | grep :8080

# Restart specific service
docker-compose restart service-name
```

### **Frontend shows white page?**

```bash
# Check frontend logs
docker-compose logs frontend

# Rebuild frontend
docker-compose up -d --build frontend

# Check nginx config
docker exec backend-frontend-1 nginx -t
```

### **Database connection errors?**

```bash
# Check PostgreSQL
docker-compose logs postgres-user

# Check if database is up
docker exec backend-postgres-user-1 psql -U postgres -c "\l"

# Restart database
docker-compose restart postgres-user
```

### **Port already in use?**

```bash
# Find what's using port 80
sudo lsof -i :80

# Kill process (if needed)
sudo kill -9 PID

# Or change port in docker-compose.yml:
ports:
  - "8000:80"  # Use port 8000 instead of 80
```

---

## 🔐 Production Security Checklist

```
☐ Change default PostgreSQL password
☐ Change SMTP password (for email sending)
☐ Enable HTTPS with SSL certificate
☐ Set SPRING_PROFILES_ACTIVE=production
☐ Disable debug logging (set to INFO)
☐ Use strong JWT secret (in JwtUtils)
☐ Enable firewall (ufw)
☐ Regular backups (PostgreSQL volume)
☐ Monitor logs daily
☐ Update Docker images monthly
```

---

## 📊 Monitoring

### **Container Stats:**
```bash
docker stats  # Real-time CPU/RAM
```

### **Health Dashboard:**
```
http://your-server/status
→ Shows all 6 backend services status
```

### **Service Discovery:**
```
http://your-server:8761
→ Eureka dashboard with all registered services
```

---

## 🔄 Backup & Restore

### **Backup PostgreSQL:**
```bash
# Backup database
docker exec backend-postgres-user-1 pg_dump -U postgres user_db > backup.sql

# Or with Docker volume
docker run --rm -v backend_postgres-user-data:/data -v $(pwd):/backup alpine tar czf /backup/postgres-backup.tar.gz /data
```

### **Restore:**
```bash
# Restore database
docker exec -i backend-postgres-user-1 psql -U postgres user_db < backup.sql
```

---

## 📝 Quick Commands Reference

```bash
# Start everything
cd ~/eckert/backend && docker-compose up -d --build

# Stop everything
docker-compose down

# View all containers
docker ps

# View all logs
docker-compose logs -f

# Restart single service
docker-compose restart auth-service

# Update code and redeploy
git pull && docker-compose up -d --build

# Clean everything (CAREFUL!)
docker-compose down -v  # Deletes volumes too!
docker system prune -a  # Clean all unused images
```

---

## 🎯 Architecture on Server

```
Linux Server
├── Port 80 → frontend (Nginx)
│   └── Proxies /api/* to api-gateway:8080
├── Port 8080 → api-gateway
├── Port 8761 → eureka
├── Port 8888 → config-server
├── Port 8081 → user-service
├── Port 8082 → auth-service
└── Port 8084 → email-service

All in Docker network: eckert-network
All managed by: docker-compose
```

---

**Author:** Moritz F. Becker - Helped by Claude AI
**Version:** 3.1.0
**Last Updated:** 2025-10-23
