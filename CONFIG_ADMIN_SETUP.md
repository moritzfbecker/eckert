# Config Admin Setup - Deployment Guide

**Version:** 2.0.0
**Date:** 2025-11-06
**Author:** Moritz F. Becker

---

## 🎯 Was haben wir gebaut?

Ein **sicheres Web-Interface** für Herr Eckert zum Bearbeiten aller Website-Texte:

✅ **Backend:** JWT-basierte Authentifizierung mit BCrypt-gehashtem Passwort
✅ **Frontend:** Login-Page + Config Editor
✅ **Sicherheit:** Nur `PUT`/`DELETE` Endpoints geschützt, Read-Only bleibt public
✅ **Dokumentation:** Komplette deutsche Anleitung für den Boss

---

## 🔐 Login-Credentials Setup

### Schritt 1: Passwort-Hash generieren

**Option A: Auf dem Server (empfohlen)**

```bash
# Auf dem Server
cd /opt/eckert/backend

# Maven Build (damit Dependencies verfügbar sind)
docker exec backend-config-server-1 mvn dependency:resolve

# Password Hash Generator ausführen
docker exec backend-config-server-1 java -cp "target/classes:$(mvn dependency:build-classpath -q -DincludeScope=runtime)" com.eckertpreisser.configserver.util.PasswordHashGenerator
```

**Option B: Online BCrypt Generator**

1. Gehe zu: https://bcrypt-generator.com/
2. Gib dein gewünschtes Passwort ein (z.B. `EckertPreisser2025!`)
3. Rounds: `10`
4. Kopiere den generierten Hash

---

### Schritt 2: Passwort in application.yml setzen

Editiere die Config Server `application.yml`:

```bash
cd /opt/eckert/backend/config-server/src/main/resources
nano application.yml
```

Füge hinzu:

```yaml
config:
  auth:
    username: admin
    password: $2a$10$[DEIN_GENERIERTER_HASH_HIER]
    jwt:
      secret: eckert-preisser-super-secret-jwt-key-change-this-2025
      expiration: 86400000  # 24 hours
```

**Beispiel mit dem Passwort "EckertPreisser2025!":**

```yaml
config:
  auth:
    username: admin
    password: $2a$10$vI7J5F9xqX3qX3qX3qX3qOX3qX3qX3qX3qX3qX3qX3qX3qX3qX3q  # Beispiel-Hash
    jwt:
      secret: eckert-preisser-super-secret-jwt-key-change-this-2025
      expiration: 86400000
```

---

## 📦 Deployment

### Schritt 1: Code committen

```bash
cd /opt/eckert

# Backend ändern
git add backend/
git commit -m "feat: Add secure Config Admin authentication

- JWT-based auth for Config Editor
- Protected PUT/DELETE endpoints
- Config Admin login page
- Password hash generator utility

[CONFIG-ADMIN-001]"

# Frontend ändern
git add frontend/
git commit -m "feat: Add Config Admin login and dashboard

- Login page at /config-admin/login
- Config Editor with auth token
- Auto-redirect if not logged in
- Logout functionality

[CONFIG-ADMIN-002]"

git push
```

---

### Schritt 2: Backend neu bauen

```bash
cd /opt/eckert/backend

# Stop services
docker compose down

# Rebuild config-server (mit neuen Dependencies)
docker compose build config-server

# Rebuild frontend (mit neuen Routes)
docker compose build frontend

# Start all services
docker compose up -d

# Check logs
docker compose logs -f config-server | head -50
```

---

### Schritt 3: Testen

**1. Backend API testen:**

```bash
# Login (sollte Token zurückgeben)
curl -X POST http://localhost:8888/api/config/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"EckertPreisser2025!"}'

# Erwartete Response:
# {"token":"eyJhbGc...","username":"admin"}
```

**2. Frontend testen:**

1. Gehe zu: `https://eckertpreisser.de/config-admin/login`
2. Login: `admin` / `EckertPreisser2025!` (oder dein Passwort)
3. Sollte zum Dashboard weiterleiten
4. Config Editor sollte funktionieren
5. Speichern testen

---

## 🔒 Sicherheit

### Was ist geschützt?

✅ **PUT** `/api/config/i18n/{category}/{language}/{key}` - Erfordert JWT
✅ **DELETE** `/api/config/i18n/{category}/{language}/{key}` - Erfordert JWT
✅ **GET** `/api/config/cache/clear` - Erfordert JWT

### Was bleibt public?

✓ **GET** `/api/config/i18n/{category}/{language}` - Lesen (für Frontend)
✓ **GET** `/api/config/i18n/languages` - Liste der Sprachen
✓ **GET** `/api/config/i18n/categories/{lang}` - Liste der Kategorien
✓ **POST** `/api/config/auth/login` - Login-Endpoint

---

## 📝 Passwort ändern

### Option 1: Hash neu generieren (empfohlen)

1. Generiere neuen Hash (siehe oben)
2. Update `application.yml`
3. Restart Config Server: `docker compose restart config-server`

### Option 2: Programmatisch (später)

Später kannst du ein Admin-Interface bauen zum Passwort-Reset.

---

## 🐛 Troubleshooting

### Login funktioniert nicht

**Check 1: Password Hash korrekt?**

```bash
docker logs backend-config-server-1 | grep "CONFIG_AUTH"
```

Wenn du siehst: `CONFIG_AUTH_ERR_002 - Invalid password` → Hash falsch

**Check 2: Spring Security lädt?**

```bash
docker logs backend-config-server-1 | grep "Security"
```

Sollte sehen: `SecurityFilterChain configured`

---

### Token wird nicht akzeptiert

**Check: JWT Secret richtig konfiguriert?**

Muss gleich sein in `application.yml` wie in `JwtUtil.java`

---

### Frontend zeigt Fehler

**Check 1: API erreichbar?**

```bash
curl https://eckertpreisser.de/api/config/health
```

**Check 2: CORS aktiviert?**

Config Server hat `@CrossOrigin(origins = "*")` - sollte funktionieren

---

## 📖 Dokumentation für Boss

Die Anleitung für Herr Eckert ist hier:

**→ `docs/CONFIG_EDITOR_ANLEITUNG.md`**

Diese Datei kannst du ihm als PDF schicken!

---

## 🎉 System ist fertig!

### Login-URL für Boss:
**https://eckertpreisser.de/login**

### Login-Daten:
- **Username:** `admin` (bei "Email / Username" eingeben)
- **Password:** `[Das Passwort, das du gesetzt hast]`

**Wichtig:** Das System erkennt automatisch "admin" und nutzt Config Auth statt User Auth!

---

## 🔄 Nächste Schritte (Optional)

1. **Email-Benachrichtigung** bei Config-Änderungen
2. **Versions-History** (wer hat was wann geändert)
3. **Passwort-Reset per Email**
4. **Mehrere Admin-Benutzer**

Aber für jetzt: **Das System ist komplett funktionsfähig!** 🚀

---

**Author:** Moritz F. Becker - Helped by Claude AI
**Date:** 2025-11-06
