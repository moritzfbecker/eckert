# Deployment zu becker.limited/development/

**Server**: vps2596528 (becker.limited)
**Ziel**: https://becker.limited/development/
**Author**: Moritz F. Becker

---

## 🚀 Schritt-für-Schritt Anleitung

### 1. Auf Server einloggen

```bash
ssh root@vps2596528
```

### 2. Repository clonen/updaten

```bash
# Erstmalig:
cd /opt
git clone https://github.com/moritzfbecker/eckert.git eckert-enterprise
cd eckert-enterprise

# Oder bei Update:
cd /opt/eckert-enterprise
git pull origin main
```

### 3. Backend deployen (Docker)

```bash
cd /opt/eckert-enterprise/backend

# Erste Installation: Config generieren
docker compose up -d config-server
sleep 30
docker compose stop config-server

# WICHTIG: Secrets ändern!
nano config/application.yml
# Ändere: security.jwt.secret (generiere mit: openssl rand -base64 32)

nano config/database.yml    # DB Credentials
nano config/mail.yml        # SMTP Settings

# Alle Services starten
docker compose up -d

# Prüfen ob alles läuft
docker ps
docker compose logs -f
```

### 4. Frontend builden

```bash
cd /opt/eckert-enterprise/frontend

# Dependencies installieren
npm install

# Production Build (mit base: '/development/')
npm run build

# Prüfen
ls -la packages/shell/dist/
```

### 5. Frontend zu Server kopieren

```bash
# Zielverzeichnis erstellen
mkdir -p /opt/eckert-enterprise-frontend

# Build kopieren
cp -r /opt/eckert-enterprise/frontend/packages/shell/dist/* /opt/eckert-enterprise-frontend/

# Permissions
chmod -R 755 /opt/eckert-enterprise-frontend
```

### 6. Nginx Config anpassen

```bash
# Backup der aktuellen Config
cp /etc/nginx/sites-available/eckertpreisser /etc/nginx/sites-available/eckertpreisser.backup

# Config bearbeiten
nano /etc/nginx/sites-available/eckertpreisser
```

**Füge NACH dem /eckertpreisser/ Block ein:**

```nginx
    # Redirect /development to /development/
    location = /development {
        return 301 /development/;
    }

    # Frontend - Neue Enterprise Version
    location /development/ {
        alias /opt/eckert-enterprise-frontend/;
        try_files $uri $uri/ /development/index.html;
        index index.html;
    }

    # API Proxy für Enterprise Backend
    location /development/api/ {
        rewrite ^/development/api/(.*)$ /api/$1 break;
        proxy_pass http://localhost:8080;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header X-Forwarded-Prefix /development;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";

        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }
```

**Position in der Config:**
```nginx
server {
    server_name becker.limited;

    # ... becker.limited/ (Portfolio) ...

    # ... /eckertpreisser/ (Alte Version) ...

    # NEU: /development/ (Enterprise Version)
    location = /development { ... }
    location /development/ { ... }
    location /development/api/ { ... }

    error_page 404 /404.html;  # ← Hier bleibt alles wie es ist
    # ... SSL Stuff ...
}
```

### 7. Nginx testen und neu laden

```bash
# Config testen
nginx -t

# Wenn OK:
systemctl reload nginx
```

### 8. Testen!

```bash
# Frontend
curl https://becker.limited/development/

# API
curl https://becker.limited/development/api/i18n/messages/de

# Im Browser:
# https://becker.limited/development/
```

---

## 🔄 Updates deployen

```bash
# 1. Code pullen
cd /opt/eckert-enterprise
git pull origin main

# 2. Backend neu builden
cd backend
docker compose build
docker compose up -d

# 3. Frontend neu builden
cd ../frontend
npm install
npm run build

# 4. Frontend kopieren
cp -r packages/shell/dist/* /opt/eckert-enterprise-frontend/

# 5. Nginx reload
systemctl reload nginx

# 6. Fertig!
```

---

## 🐛 Troubleshooting

### Frontend zeigt 404
```bash
# Prüfe ob Files da sind
ls -la /opt/eckert-enterprise-frontend/

# Prüfe Nginx Config
nginx -t
cat /etc/nginx/sites-enabled/eckertpreisser | grep development

# Nginx Logs
tail -f /var/log/nginx/error.log
```

### API Calls schlagen fehl
```bash
# Backend läuft?
docker ps | grep backend

# API Gateway erreichbar?
curl http://localhost:8080/actuator/health

# Nginx Proxy funktioniert?
curl -v https://becker.limited/development/api/i18n/messages/de
```

### Config Server Fehler
```bash
# Logs checken
docker logs backend-config-server-1

# Config Verzeichnis
docker exec backend-config-server-1 ls -la /app/config

# Neu starten
cd /opt/eckert-enterprise/backend
docker compose restart config-server
```

---

## 📋 Quick Checklist

- [ ] Code geclont: `/opt/eckert-enterprise`
- [ ] Backend läuft: `docker ps`
- [ ] Config angepasst: `config/application.yml`
- [ ] Frontend gebaut: `npm run build`
- [ ] Frontend kopiert: `/opt/eckert-enterprise-frontend/`
- [ ] Nginx config erweitert
- [ ] Nginx getestet: `nginx -t`
- [ ] Nginx neu geladen: `systemctl reload nginx`
- [ ] Frontend erreichbar: `https://becker.limited/development/`
- [ ] API funktioniert: `https://becker.limited/development/api/...`

---

**Next**: Teste https://becker.limited/development/ im Browser!
