# Deployment Files

Dieses Verzeichnis enthält alle Production Deployment Files.

## 📁 Dateien

- **DEPLOYMENT.md**: Komplette Deployment-Anleitung (im Root-Verzeichnis)
- **nginx/eckert-enterprise.conf**: Nginx Reverse Proxy Config
- **deploy.sh**: Automatisches Deployment Script

## 🚀 Quick Start

### Erste Installation

```bash
# 1. Auf dem Server
ssh user@ihr-server.de

# 2. Docker installieren
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker $USER
newgrp docker

# 3. Repository clonen
cd /opt
sudo mkdir eckert-enterprise && sudo chown $USER:$USER eckert-enterprise
git clone https://github.com/moritzfbecker/eckert.git eckert-enterprise

# 4. Backend starten (generiert config/)
cd eckert-enterprise/backend
docker compose up -d config-server
sleep 30
docker compose stop config-server

# 5. WICHTIG: Config-Dateien anpassen!
nano config/application.yml  # JWT Secret ändern!
nano config/database.yml
nano config/mail.yml

# 6. Alle Services starten
docker compose up -d

# 7. Frontend bauen
cd ../frontend
npm install
npm run build

# 8. Nginx Setup
sudo apt install nginx -y
sudo cp ../deployment/nginx/eckert-enterprise.conf /etc/nginx/sites-available/
sudo nano /etc/nginx/sites-available/eckert-enterprise  # Domain anpassen!
sudo ln -s /etc/nginx/sites-available/eckert-enterprise /etc/nginx/sites-enabled/

# 9. Frontend zu Nginx
sudo mkdir -p /var/www/eckert-enterprise
sudo cp -r packages/shell/dist/* /var/www/eckert-enterprise/
sudo chown -R www-data:www-data /var/www/eckert-enterprise

# 10. Nginx starten
sudo nginx -t
sudo systemctl restart nginx

# 11. DONE! Testen:
curl http://ihr-server-ip
```

### Updates deployen

```bash
cd /opt/eckert-enterprise/deployment
chmod +x deploy.sh
./deploy.sh
```

## 🔐 KRITISCH - Vor Production!

**MUSS geändert werden:**
- ❗ JWT Secret in `config/application.yml`
- ❗ Database Passwords in `config/database.yml`
- ❗ SMTP Credentials in `config/mail.yml`
- ❗ Domain in nginx config

**Testen:**
```bash
# Backend Health
curl http://localhost:8080/actuator/health

# Frontend
curl http://localhost

# i18n API
curl http://localhost:8080/api/i18n/messages/de
```

## 📊 Was läuft wo?

**Backend (Docker):**
- Eureka: `localhost:8761`
- Config Server: `localhost:8888`
- API Gateway: `localhost:8080`

**Frontend:**
- Nginx: `localhost:80` → `/var/www/eckert-enterprise`
- Build Output: `frontend/packages/shell/dist/`

**Nginx Reverse Proxy:**
- `/` → Frontend Static Files
- `/api/` → Backend API Gateway (localhost:8080)

## 🛠 Troubleshooting

### Backend startet nicht
```bash
docker compose logs -f
docker ps -a
```

### Frontend nicht erreichbar
```bash
sudo systemctl status nginx
sudo tail -f /var/log/nginx/error.log
```

### Config Server Probleme
```bash
docker logs backend-config-server-1
docker exec backend-config-server-1 ls -la /app/config
```

---

**Siehe: ../DEPLOYMENT.md für vollständige Anleitung**
