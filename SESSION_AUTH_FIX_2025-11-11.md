# Session: Auth System Fix & Medicallix Navigation - 2025-11-11

## 🎯 Aufgaben (heute erledigt)

### 1. ✅ Medicallix Navigation umstrukturiert (Frontend v2.21.2)
- **Navbar**: Medicallix Link entfernt
- **Footer**: Medicallix zur "Unternehmen"-Spalte hinzugefügt
- **About Page**: "Company 5 (2020)" Text jetzt klickbar → führt zu /medicallix
- Cleaner Navigation mit Fokus auf Hauptseiten

### 2. ✅ Multi-Domain API Routing gefixt (Frontend v2.21.3-2.21.4)
- **Problem**: Hardcoded `localhost:8080` in authApi.ts
- **Problem**: `/development/api` für BEIDE Domains
- **Fix**: Dynamische URL-Erkennung:
  - `eckertpreisser.de` → `/api` (kein /development prefix)
  - `becker.limited` → `/development/api` (mit /development subpath)
  - `localhost` → `http://localhost:8080/api`
- Gefixt in 5 Files: api.ts, authApi.ts, useConfig.ts, email.ts, logger.ts
- Vite base path von `/development/` → `/` (Asset loading fix)

### 3. ✅ Backend Services aktiviert (Backend v3.4.1)
- **docker-compose.yml**: Alle Services aktiviert (waren auskommentiert!)
- PostgreSQL Database erstellt
- user-service, auth-service, medicallix-service hinzugefügt
- Dockerfiles erstellt/gefixt
- Maven Versionen synchronisiert (alle auf 3.4.1-SNAPSHOT)

### 4. ✅ ENV Variablen für Docker Networking
- **Problem**: Services hatten hardcoded `localhost` statt ENV Variablen
- **Fix**:
  - `EUREKA_URL=http://service-discovery:8761/eureka/` (statt localhost:8761)
  - `SERVER_PORT=8081/8082/8085` (explizit gesetzt)
  - `DB_HOST=postgres-user` (Docker Network Name)
  - medicallix-service application.yml komplett überarbeitet

### 5. ✅ Apache Proxy Configuration
- ProxyPass /api/ → http://localhost:8080/api/ konfiguriert
- Apache mod_proxy aktiviert
- Requests kommen jetzt beim API Gateway an

---

## ⚠️ Offene Probleme (morgen fixen!)

### 1. **user-service läuft ABER nicht bei Eureka registriert** ❌
**Symptom:**
```
docker ps → Container healthy
curl eureka → USER-SERVICE fehlt in der Liste!
```

**Grund:** Vermutlich Docker Build Cache - alte Version ohne ENV Variablen
**Fix morgen:** `docker compose build --no-cache user-service && docker compose up -d`

---

### 2. **auth-service crashed** ❌
**Error:**
```
Parameter 0 of constructor in UserServiceClient required a bean
of type 'org.springframework.web.client.RestTemplate' that could not be found.
```

**Grund:** RestTemplate Bean wird nicht gefunden (obwohl RestTemplateConfig.java existiert!)
**Fix morgen:**
- Checken ob `@Configuration` Annotation da ist
- Eventuell `@ComponentScan` Problem
- Oder SecurityConfig überschreibt RestTemplate

---

### 3. **API Calls geben 404** ❌
**Symptom:**
```
POST https://eckertpreisser.de/api/auth/register → 404
GET https://eckertpreisser.de/api/i18n/messages/de → 404
POST https://eckertpreisser.de/api/logs → 404
```

**Grund:** auth-service crashed, user-service nicht registriert → API Gateway kann nicht routen
**Fix morgen:** Nach Fix von #1 und #2 sollten alle API Calls funktionieren!

---

## 📦 Versionen

**Heute released:**
- Frontend: v2.21.2, v2.21.3, v2.21.4
- Backend: v3.4.1-SNAPSHOT

**Git Tags:**
- frontend-v2.21.2
- frontend-v2.21.3
- frontend-v2.21.4
- backend-v3.4.1

**Commits:**
- `236dd0c` - Navigation fixes
- `b755672` - Multi-domain API routing
- `3502d29` - Activate all auth services
- `6b2e65d` - POM versions sync
- `1f9ee87` - Medicallix ENV variables
- `a33b77e` - Medicallix application.yml
- `fae4ad3` - SERVER_PORT env variables

---

## 🔧 Morgen zu tun

### A) **Quick Wins** (30 Min)
1. `docker compose build --no-cache` auf Server
2. `docker compose up -d`
3. Checken ob user-service + auth-service bei Eureka erscheinen
4. Test: Registration auf eckertpreisser.de

### B) **Falls immer noch Probleme** (1-2 Std)
1. **Auth-Service RestTemplate Fix:**
   - SecurityConfig checken (überschreibt es vielleicht RestTemplate?)
   - ComponentScan Pfade verifizieren
   - Notfall: RestTemplate direkt in AuthServiceApplication als @Bean

2. **user-service Eureka Registration Debug:**
   - Logs checken warum Registration fehlschlägt
   - Network connectivity zu service-discovery testen
   - Eventuell Eureka Client Dependency fehlt?

3. **Integration Tests:**
   - Registration testen
   - Login testen
   - Medicallix App öffnen (protected route)
   - Translations laden

### C) **Permanente Apache Config** (5 Min)
Proxy-Regeln zur PERMANENTEN Config hinzufügen:
```bash
nano /var/www/vhosts/system/eckertpreisser.de/conf/vhost_ssl.conf
```
Damit Plesk die Regeln nicht bei nächstem Regenerate löscht!

---

## 📊 Aktueller Status

**Services Laufen:**
```
✅ postgres-user (5432)
✅ service-discovery (8761) - Eureka
✅ config-server (8888)
✅ api-gateway (8080)
✅ user-service (8081) - Container healthy, aber NICHT bei Eureka
✅ email-service (8084)
✅ medicallix-service (8085)
✅ frontend (8090)
❌ auth-service - CRASHED (RestTemplate Bean fehlt)
```

**Eureka Registrierte Services:**
```
✅ API-GATEWAY
✅ EMAIL-SERVICE
✅ CONFIG-SERVER
✅ MEDICALLIX-SERVICE
❌ USER-SERVICE (fehlt!)
❌ AUTH-SERVICE (crashed!)
```

---

## 🚀 Erwartetes Endergebnis (morgen)

**Nach dem Fix sollte funktionieren:**
1. ✅ https://eckertpreisser.de → Homepage lädt mit Übersetzungen
2. ✅ https://eckertpreisser.de/register → Registration Form
3. ✅ User kann sich registrieren → Daten in PostgreSQL
4. ✅ User kann sich einloggen → JWT Token erhalten
5. ✅ https://eckertpreisser.de/medicallix/app → Protected Route (login required)
6. ✅ Medicallix Speech-to-Text Demo funktioniert

**Alle 9 Services bei Eureka registriert:**
- service-discovery, config-server, api-gateway
- user-service, auth-service, email-service
- medicallix-service

---

## 🎓 Lessons Learned

1. **Docker Build Cache ist tückisch!**
   - `CACHED` bedeutet alte Version wird genutzt
   - Bei ENV Variablen Änderungen: `--no-cache` nutzen!

2. **Plesk Apache Config regeneriert sich!**
   - NICHT in `/etc/apache2/plesk.conf.d/vhosts/*.conf` editieren
   - Nur in `/var/www/vhosts/system/*/conf/vhost_ssl.conf`

3. **Multi-Domain Deployment braucht dynamische URLs!**
   - Jede Domain kann unterschiedliche Subpaths haben
   - Hostname detection in JEDEM API Client nötig

4. **Microservices Dependencies sind komplex!**
   - auth-service braucht user-service + email-service
   - Alle brauchen Eureka Registration
   - ENV Variablen müssen ÜBERALL konsistent sein

---

**Status**: 70% fertig! Morgen die letzten 30% und dann läuft alles! 🚀

**Nächste Session**: Docker Build Cache cleanen, Services debuggen, Integration testen!
