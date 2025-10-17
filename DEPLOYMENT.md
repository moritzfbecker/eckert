# Production Deployment Guide

**Version**: 1.0.0
**Last Updated**: 2025-10-17
**Author**: Moritz F. Becker - Helped by Claude AI

## 📋 Inhaltsverzeichnis

- [Voraussetzungen](#voraussetzungen)
- [Server Setup](#server-setup)
- [Code Deployment](#code-deployment)
- [Backend Deployment](#backend-deployment)
- [Frontend Deployment](#frontend-deployment)
- [Nginx Reverse Proxy](#nginx-reverse-proxy)
- [SSL/HTTPS Setup](#sslhttps-setup)
- [Monitoring](#monitoring)

---

## 🖥 Voraussetzungen

### Server Requirements
- **OS**: Ubuntu 22.04 LTS oder neuer
- **RAM**: Minimum 4GB (8GB empfohlen)
- **CPU**: 2+ Cores
- **Storage**: 20GB+ freier Speicher
- **Ports**: 80, 443, 8080, 8761, 8888 (optional für Direktzugriff)

### Software Requirements
- Docker Engine 24+
- Docker Compose 2.20+
- Git
- Nginx (für Reverse Proxy)
- Certbot (für SSL/HTTPS - optional)

---

## 🚀 Server Setup

### 1. System aktualisieren

```bash
sudo apt update && sudo apt upgrade -y
```

### 2. Docker installieren

```bash
# Docker installieren
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Docker ohne sudo nutzen
sudo usermod -aG docker $USER
newgrp docker

# Docker Compose installieren
sudo apt install docker-compose-plugin -y

# Verify Installation
docker --version
docker compose version
```

### 3. Git installieren

```bash
sudo apt install git -y
git --version
```

### 4. Nginx installieren

```bash
sudo apt install nginx -y
sudo systemctl enable nginx
sudo systemctl start nginx
```

---

## 📦 Code Deployment

### 1. Repository clonen

```bash
cd /opt
sudo mkdir eckert-enterprise
sudo chown $USER:$USER eckert-enterprise
cd eckert-enterprise

git clone https://github.com/moritzfbecker/eckert.git .
```

### 2. Branch auschecken

```bash
# Production Branch (main)
git checkout main

# Oder spezifische Version
git checkout backend-v1.1.1
```

---

## 🔧 Backend Deployment

### 1. Config Server konfigurieren

**Beim ersten Start erstellt Config Server automatisch `config/` Templates!**

```bash
cd backend

# Erstmal starten um config/ zu generieren
docker compose up -d config-server

# 30 Sekunden warten
sleep 30

# Config Server stoppen
docker compose stop config-server
```

### 2. Config-Dateien anpassen

**WICHTIG: Secrets MÜSSEN geändert werden!**

```bash
# JWT Secret ändern (KRITISCH!)
nano config/application.yml
# Ändere: security.jwt.secret zu einem sicheren 256-bit Key
# Generiere mit: openssl rand -base64 32

# Database Credentials
nano config/database.yml
# Ändere: datasource.url, username, password

# SMTP Settings
nano config/mail.yml
# Ändere: mail.host, username, password, from

# Language Settings (optional)
nano config/language.yml
# Default: de oder en
```

**Beispiel config/application.yml:**
```yaml
server:
  port: 8080

application:
  version: 1.1.1
  default-language: de

security:
  jwt:
    secret: "IHR_SUPER_SICHERER_256_BIT_SECRET_KEY_HIER"  # ÄNDERN!
    expiration: 86400000  # 24 hours
```

### 3. Docker Compose Production starten

```bash
# Alle Services starten
docker compose up -d

# Logs checken
docker compose logs -f

# Status prüfen
docker ps
```

**Services sollten laufen:**
- `backend-service-discovery-1` (Eureka - Port 8761)
- `backend-config-server-1` (Config Server - Port 8888)
- `backend-api-gateway-1` (API Gateway - Port 8080)

### 4. Health Checks

```bash
# Eureka Dashboard
curl http://localhost:8761

# Config Server
curl http://localhost:8888/actuator/health

# API Gateway
curl http://localhost:8080/actuator/health

# i18n Endpoint
curl http://localhost:8080/api/i18n/messages/de | jq
```

---

## 🎨 Frontend Deployment

### Option 1: Static Build mit Nginx (Empfohlen)

#### 1. Frontend builden

```bash
cd frontend

# Dependencies installieren
npm install

# Production Build
npm run build

# Build Output ist in packages/shell/dist/
ls -la packages/shell/dist/
```

#### 2. Build zu Nginx kopieren

```bash
# Nginx Web Root erstellen
sudo mkdir -p /var/www/eckert-enterprise

# Build kopieren
sudo cp -r packages/shell/dist/* /var/www/eckert-enterprise/

# Permissions setzen
sudo chown -R www-data:www-data /var/www/eckert-enterprise
```

### Option 2: Frontend in Docker (Alternative)

**Frontend Dockerfile:**
```dockerfile
# frontend/Dockerfile
FROM node:20-alpine AS build

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/packages/shell/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

```bash
cd frontend
docker build -t eckert-frontend .
docker run -d -p 3000:80 --name frontend eckert-frontend
```

---

## 🔄 Nginx Reverse Proxy

### Nginx Config für Production

**Erstelle: `/etc/nginx/sites-available/eckert-enterprise`**

```nginx
server {
    listen 80;
    server_name ihre-domain.de www.ihre-domain.de;

    # Frontend (Static Files)
    location / {
        root /var/www/eckert-enterprise;
        try_files $uri $uri/ /index.html;

        # Cache für Static Assets
        location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2)$ {
            expires 1y;
            add_header Cache-Control "public, immutable";
        }
    }

    # Backend API Gateway
    location /api/ {
        proxy_pass http://localhost:8080/api/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # Health Check
    location /actuator/health {
        proxy_pass http://localhost:8080/actuator/health;
        proxy_set_header Host $host;
    }
}
```

**Aktivieren:**
```bash
# Config aktivieren
sudo ln -s /etc/nginx/sites-available/eckert-enterprise /etc/nginx/sites-enabled/

# Test
sudo nginx -t

# Restart
sudo systemctl restart nginx
```

---

## 🔒 SSL/HTTPS Setup (mit Let's Encrypt)

### 1. Certbot installieren

```bash
sudo apt install certbot python3-certbot-nginx -y
```

### 2. SSL Zertifikat erstellen

```bash
# Automatische Nginx Config
sudo certbot --nginx -d ihre-domain.de -d www.ihre-domain.de

# Email eingeben
# Terms akzeptieren
# Redirect HTTP → HTTPS: Yes
```

### 3. Auto-Renewal testen

```bash
# Dry run
sudo certbot renew --dry-run

# Certbot erneuert automatisch alle 90 Tage
```

---

## 📊 Monitoring & Logging

### Docker Logs

```bash
# Alle Services
docker compose logs -f

# Spezifischer Service
docker compose logs -f api-gateway

# Letzte 100 Zeilen
docker compose logs --tail=100 config-server
```

### Service Health Checks

```bash
# Alle Services Status
curl http://localhost:8080/api/health/services

# Einzelner Service
curl http://localhost:8761/actuator/health
curl http://localhost:8888/actuator/health
curl http://localhost:8080/actuator/health
```

### System Resources

```bash
# Docker Stats
docker stats

# Disk Usage
docker system df

# Container Status
docker ps -a
```

---

## 🔄 Updates & Maintenance

### Code Update

```bash
cd /opt/eckert-enterprise

# Pull latest changes
git pull origin main

# Rebuild Services
cd backend
docker compose build
docker compose up -d

# Frontend neu builden
cd ../frontend
npm install
npm run build
sudo cp -r packages/shell/dist/* /var/www/eckert-enterprise/

# Nginx reload
sudo systemctl reload nginx
```

### Config Updates

```bash
cd /opt/eckert-enterprise/backend

# Config bearbeiten
nano config/application.yml

# Nur Config Server neu starten
docker compose restart config-server

# Services reloaden Configs automatisch beim nächsten Request
```

### Backup

```bash
# Config Backup
cd /opt/eckert-enterprise/backend
tar -czf config-backup-$(date +%Y%m%d).tar.gz config/

# Database Backup (wenn PostgreSQL läuft)
docker exec backend-postgres-user-1 pg_dump -U postgres userdb > backup-userdb.sql
```

---

## 🐛 Troubleshooting

### Services starten nicht

```bash
# Logs checken
docker compose logs config-server
docker compose logs api-gateway

# Container Status
docker ps -a

# Network prüfen
docker network ls
docker network inspect backend_eckert-network
```

### Config Server Fehler

```bash
# Config Verzeichnis prüfen
docker exec backend-config-server-1 ls -la /app/config

# Config Server Logs
docker logs backend-config-server-1 | grep CONFIG_SERVER

# Neu starten mit clean build
docker compose down
docker volume rm backend_config-data
docker compose up -d
```

### Frontend nicht erreichbar

```bash
# Nginx Status
sudo systemctl status nginx

# Nginx Error Logs
sudo tail -f /var/log/nginx/error.log

# Nginx Access Logs
sudo tail -f /var/log/nginx/access.log

# Config Test
sudo nginx -t
```

### Port Konflikte

```bash
# Prüfe welcher Prozess Port nutzt
sudo lsof -i :8080
sudo lsof -i :80

# Port freigeben
sudo kill -9 <PID>
```

---

## 📋 Production Checklist

Vor Go-Live:

- [ ] **Config Server**: JWT Secret geändert
- [ ] **Config Server**: Database Credentials gesetzt
- [ ] **Config Server**: SMTP Settings konfiguriert
- [ ] **Docker**: Alle Services laufen (`docker ps`)
- [ ] **Health Checks**: Alle Services UP
- [ ] **Frontend**: Production Build erstellt
- [ ] **Nginx**: Config getestet (`nginx -t`)
- [ ] **SSL**: HTTPS funktioniert
- [ ] **Firewall**: Nur Ports 80, 443 offen
- [ ] **Backup**: Config Backup erstellt
- [ ] **Monitoring**: Logs werden geprüft
- [ ] **Testing**: Alle Seiten erreichbar

---

## 🔐 Security Checklist

- [ ] JWT Secret ist unique und sicher (256+ bit)
- [ ] Database Passwords geändert
- [ ] SMTP Credentials gesichert
- [ ] config/ Ordner NICHT in Git
- [ ] Firewall aktiv (UFW)
- [ ] Nur HTTPS (HTTP → HTTPS Redirect)
- [ ] Docker läuft als non-root user
- [ ] Regular Updates (Docker, OS)

---

## 🚀 Quick Start (Copy-Paste)

```bash
# 1. Server vorbereiten
sudo apt update && sudo apt upgrade -y
curl -fsSL https://get.docker.com -o get-docker.sh && sudo sh get-docker.sh
sudo usermod -aG docker $USER && newgrp docker
sudo apt install nginx git -y

# 2. Code clonen
cd /opt && sudo mkdir eckert-enterprise && sudo chown $USER:$USER eckert-enterprise
git clone https://github.com/moritzfbecker/eckert.git eckert-enterprise
cd eckert-enterprise

# 3. Backend starten (generiert config/)
cd backend && docker compose up -d config-server
sleep 30 && docker compose stop config-server

# 4. Secrets ändern
nano config/application.yml  # JWT Secret ändern!
nano config/database.yml     # DB Credentials
nano config/mail.yml        # SMTP Settings

# 5. Alle Services starten
docker compose up -d

# 6. Frontend builden
cd ../frontend && npm install && npm run build

# 7. Frontend deployen
sudo mkdir -p /var/www/eckert-enterprise
sudo cp -r packages/shell/dist/* /var/www/eckert-enterprise/
sudo chown -R www-data:www-data /var/www/eckert-enterprise

# 8. Nginx konfigurieren (siehe Nginx Section oben)
# 9. SSL mit Certbot (optional aber empfohlen)
# 10. Testen!
```

---

## 📞 Support

Bei Problemen:
- Logs checken: `docker compose logs -f`
- Health Checks: `curl http://localhost:8080/actuator/health`
- GitHub Issues: https://github.com/moritzfbecker/eckert/issues

---

**Next Steps**: [SSL Setup](#sslhttps-setup) → [Monitoring](#monitoring)
