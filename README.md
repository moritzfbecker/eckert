# Eckert Preisser Enterprise

Eine vollständige Enterprise-Level Web-Applikation mit Microservices-Backend (Spring Boot) und Micro-Frontend-Architektur (React + Tailwind CSS).

## 📋 Inhaltsverzeichnis

- [Überblick](#überblick)
- [Technologie-Stack](#technologie-stack)
- [Projektstruktur](#projektstruktur)
- [Getting Started](#getting-started)
- [Entwicklungsrichtlinien](#entwicklungsrichtlinien)
- [Architecture](#architecture)

## 🎯 Überblick

Dieses Projekt implementiert eine moderne, skalierbare Enterprise-Lösung mit:

- **Backend**: Microservices-Architektur mit Spring Boot 3.3.5 und Java 21
- **Frontend**: Micro-Frontend-Architektur mit React 18, Vite, und Turborepo
- **Design**: Minimalistisches Black/White Theme mit Apple-Gradient-Akzenten
- **Infrastructure**: Docker Compose für lokale Entwicklung
- **Multi-Language**: Vollständige Unterstützung für Deutsch und Englisch
- **Configuration**: Externes Config-System (keine .env Dateien!)
- **Logging**: Enterprise-Level Logging mit strukturierten Error Codes
- **Versioning**: Automatisches Version Management mit Changelog

## 🛠 Technologie-Stack

### Backend
- **Framework**: Spring Boot 3.3.5
- **Language**: Java 21
- **Build Tool**: Maven
- **Service Discovery**: Netflix Eureka
- **API Gateway**: Spring Cloud Gateway
- **Config Management**: External YAML configs (auto-generated)
- **Database**: PostgreSQL (Production), H2 (Development)
- **Security**: JWT, Spring Security
- **Logging**: SLF4J + Logback mit strukturierten Error Codes
- **i18n**: MessageSource mit DE/EN Support

### Frontend
- **Framework**: React 18.3.1
- **Build Tool**: Vite 6
- **Monorepo**: Turborepo
- **Styling**: Tailwind CSS 3.4
- **Animations**: Framer Motion 11
- **Routing**: React Router v6
- **Language**: TypeScript 5.6
- **i18n**: Custom i18n System mit DE/EN Support
- **Logging**: Structured Logger mit Error Codes
- **Error Handling**: Global Error Handler mit custom Error Classes

## 📁 Projektstruktur

```
Eckert Enterprise/
├── backend/                          # Backend Microservices
│   ├── api-gateway/                 # API Gateway (Port: 8080)
│   ├── service-discovery/           # Eureka Server (Port: 8761)
│   ├── config-server/               # Config Server (Port: 8888)
│   ├── services/
│   │   ├── user-service/           # User Management (Port: 8081)
│   │   ├── product-service/        # Product Management (Port: 8082)
│   │   ├── order-service/          # Order Management (Port: 8083)
│   │   └── notification-service/   # Notifications (Port: 8084)
│   ├── shared/
│   │   ├── common-models/          # Shared DTOs
│   │   ├── common-utils/           # Shared Utilities
│   │   └── security-config/        # Security Configuration
│   ├── pom.xml                     # Root Maven Configuration
│   └── docker-compose.yml          # Docker Compose Setup
│
└── frontend/                        # Frontend Monorepo
    ├── packages/
    │   ├── shell/                  # Main Shell Application
    │   ├── home/                   # Home Micro Frontend
    │   ├── products/               # Products Micro Frontend
    │   ├── dashboard/              # Dashboard Micro Frontend
    │   └── shared/                 # Shared Components
    │       ├── ui-components/      # Button, Card, etc.
    │       ├── hooks/              # Custom React Hooks
    │       ├── utils/              # Utility Functions
    │       ├── styles/             # Shared Styles
    │       └── animations/         # Animation Configurations
    ├── package.json                # Root Package.json
    └── turbo.json                  # Turborepo Configuration
```

## 🚀 Getting Started

### Prerequisites

- Java 21 JDK
- Maven 3.8+
- Node.js 20+
- Docker & Docker Compose
- Git

### Backend Setup

1. **Build alle Microservices:**
```bash
cd backend
mvn clean install
```

2. **Beim ersten Start werden automatisch Config-Dateien erstellt:**
```
config/
├── application.yml      # Main settings (JWT secret, port, etc.)
├── database.yml        # Database credentials
├── mail.yml           # SMTP settings
├── language.yml       # i18n settings
└── i18n/
    ├── messages_de.properties  # German translations
    └── messages_en.properties  # English translations
```

3. **Config-Dateien bearbeiten vor Production:**
```bash
# Nach erstem Start App stoppen und editieren:
nano config/application.yml  # JWT Secret ändern
nano config/database.yml     # DB Credentials eintragen
nano config/mail.yml        # SMTP Settings
```

4. **Starte einzelne Services lokal:**
```bash
# Eureka Service Discovery zuerst starten
cd service-discovery
mvn spring-boot:run

# Config Server
cd ../config-server
mvn spring-boot:run

# API Gateway
cd ../api-gateway
mvn spring-boot:run

# Business Services
cd ../services/user-service
mvn spring-boot:run
```

3. **Oder mit Docker Compose:**
```bash
cd backend
docker-compose up -d
```

### Frontend Setup

1. **Dependencies installieren:**
```bash
cd frontend
npm install
```

2. **Development Server starten:**
```bash
npm run dev
```

Die Shell-App läuft dann auf `http://localhost:3000`

3. **Build für Production:**
```bash
npm run build
```

## 📝 Entwicklungsrichtlinien

### Wichtige Dokumentation
- [DEVELOPMENT_GUIDELINES.md](./DEVELOPMENT_GUIDELINES.md) - Vollständige Entwicklungsrichtlinien
- [ERROR_CODES.md](./ERROR_CODES.md) - Alle Error Codes und deren Bedeutung
- [VERSION_MANAGEMENT.md](./VERSION_MANAGEMENT.md) - Version Bump Workflow
- [CONFIG_SYSTEM.md](./CONFIG_SYSTEM.md) - Externes Konfigurationssystem
- [CHANGELOG.md](./CHANGELOG.md) - Projekt Changelog

### Quick Start Guides
- [docs/QUICK_START_LOGGING.md](./docs/QUICK_START_LOGGING.md) - Logging in 5 Minuten
- [docs/QUICK_START_VERSIONING.md](./docs/QUICK_START_VERSIONING.md) - Versioning in 5 Minuten
- [docs/QUICK_START_I18N.md](./docs/QUICK_START_I18N.md) - i18n in 5 Minuten
- [docs/QUICK_START_CONFIG.md](./docs/QUICK_START_CONFIG.md) - Config in 5 Minuten

### Code Style

#### Backend (Java)
- Verwende Lombok für Boilerplate-Code
- Folge Spring Boot Best Practices
- DTOs für alle API-Responses
- Verwende `@Transactional` für Service-Layer
- **IMMER** LoggerUtil mit Error Codes verwenden
- **IMMER** MessageSource für i18n verwenden
- **NIEMALS** .env Dateien - nur externe YAML Configs
- Custom Exceptions mit Error Codes werfen

#### Frontend (React/TypeScript)
- Functional Components mit Hooks
- TypeScript für Type Safety
- Shared Components in `@eckert-preisser/shared`
- Tailwind CSS für Styling
- Framer Motion für Animationen
- **IMMER** logger für Logging verwenden
- **IMMER** t() für Übersetzungen verwenden
- **NIEMALS** console.log verwenden

### Git Workflow

```bash
# Feature Branch erstellen
git checkout -b feature/user-authentication

# Commits
git commit -m "feat: add JWT authentication"

# Pull Request erstellen
git push origin feature/user-authentication
```

**Commit Convention:**
- `feat:` Neue Features
- `fix:` Bug Fixes
- `docs:` Dokumentation
- `style:` Code Style (Formatting)
- `refactor:` Code Refactoring
- `test:` Tests
- `chore:` Build/Config Changes

**WICHTIG: Bei JEDEM Commit:**
1. Version bumpen (mvn versions:set OR npm version)
2. CHANGELOG.md aktualisieren
3. Error Codes dokumentieren (falls neue hinzugefügt)
4. Git Tag erstellen (backend-v1.0.1 OR frontend-v1.0.1)

Siehe [VERSION_MANAGEMENT.md](./VERSION_MANAGEMENT.md) für Details.

## 🏗 Architecture

### Backend Architecture

```
Client
  ↓
API Gateway (8080) ← CORS, Load Balancing, Circuit Breaker
  ↓
Service Discovery (8761) ← Service Registration
  ↓
Microservices:
  - User Service (8081)
  - Product Service (8082)
  - Order Service (8083)
  - Notification Service (8084)
```

### Frontend Architecture

```
Shell App (Main Container)
  ├── Header/Navigation
  ├── Router
  └── Micro Frontends:
      ├── Home
      ├── Products
      └── Dashboard

Shared Package
  ├── UI Components (Button, Card, etc.)
  ├── Hooks (useScrollAnimation, etc.)
  ├── Utils (API Client, etc.)
  └── Animations (Framer Motion Configs)
```

## 🎨 Design System

### Colors
- **Primary Background**: `#000000` (Black)
- **Text**: `#FFFFFF` (White)
- **Accent Gradient**: Pink (#ec4899) → Purple (#a855f7) → Yellow (#eab308)

### Components
- Alle UI-Komponenten verwenden das Apple-Gradient-Theme
- Hover-Effekte mit Glow-Animations
- Scroll-Animations mit Framer Motion
- Minimalistisches, modernes Design

### Tailwind Configuration
```javascript
// Gradient Classes
bg-apple-gradient
text-gradient

// Glow Effects
shadow-apple-glow
shadow-apple-glow-lg

// Animations
animate-fade-in
animate-slide-in
animate-glow
```

## 📊 Service Ports

| Service | Port | URL |
|---------|------|-----|
| API Gateway | 8080 | http://localhost:8080 |
| Eureka Server | 8761 | http://localhost:8761 |
| Config Server | 8888 | http://localhost:8888 |
| User Service | 8081 | http://localhost:8081 |
| Product Service | 8082 | http://localhost:8082 |
| Order Service | 8083 | http://localhost:8083 |
| Notification Service | 8084 | http://localhost:8084 |
| Shell App | 3000 | http://localhost:3000 |

## 🔐 Security

- JWT-basierte Authentifizierung
- Shared Security Config für alle Services
- CORS Configuration im API Gateway
- Secret Key Management via externe Config-Dateien
- KEINE .env Dateien - alles in config/application.yml
- Passwörter und Secrets in externen YAML-Dateien

## 🌐 Multi-Language Support

Die komplette Applikation unterstützt Deutsch und Englisch:

### Backend
```java
// i18n verwenden
String messageDe = MessageSource.getMessage("user.created", "de");
String messageEn = MessageSource.getMessage("user.created", "en");
```

### Frontend
```typescript
// Übersetzungen verwenden
import { t, changeLanguage } from '@eckert-preisser/shared/utils';

const message = t('user.created');  // Aktuelle Sprache
changeLanguage('en');  // Zu Englisch wechseln
```

### Übersetzungsdateien
- Backend: `config/i18n/messages_de.properties` und `messages_en.properties`
- Frontend: Verwendet gleiche Keys, lädt von Backend

Siehe [CONFIG_SYSTEM.md](./CONFIG_SYSTEM.md) für Details.

---

## 📊 Logging & Error Handling

### Strukturiertes Logging mit Error Codes

**Backend:**
```java
import com.eckertpreisser.common.utils.LoggerUtil;

LoggerUtil.info(logger, "USER_001", "User created", Map.of("userId", 123));
LoggerUtil.error(logger, "USER_ERR_404", "User not found", exception, context);
```

**Frontend:**
```typescript
import { logger } from '@eckert-preisser/shared/utils';

logger.info('USER_001', 'User created', { userId: 123 });
logger.error('USER_ERR_001', 'Failed to load user', error, context);
```

### Error Codes
Alle Error Codes sind dokumentiert in [ERROR_CODES.md](./ERROR_CODES.md)

Format: `{SERVICE}_{TYPE}_{HTTP_CODE}_{NUMBER}`
- `USER_001` - Success
- `USER_ERR_404_001` - Not found
- `USER_ERR_400_001` - Validation error

---

## 🔄 Version Management

**Regel**: Bei JEDER Änderung Version bumpen!

```bash
# Backend
cd backend
mvn versions:set -DnewVersion=1.0.1

# Frontend
cd frontend
npm version patch

# Changelog updaten
# Git tag erstellen
git tag backend-v1.0.1
```

Aktuelle Versionen:
- Backend: v1.0.0
- Frontend: v1.0.0

Siehe [VERSION_MANAGEMENT.md](./VERSION_MANAGEMENT.md) für Details.

---

## ⚙️ Configuration System

**KEINE .env Dateien!** Alle Konfiguration in externen YAML-Dateien.

Beim ersten Start werden automatisch erstellt:
```
config/
├── application.yml      # JWT secret, port, default language
├── database.yml        # DB credentials
├── mail.yml           # SMTP settings
├── language.yml       # i18n config
└── i18n/              # Übersetzungen
```

**Production Workflow:**
1. App starten → config/ wird generiert
2. App stoppen
3. Config-Dateien bearbeiten
4. App neu starten

Siehe [CONFIG_SYSTEM.md](./CONFIG_SYSTEM.md) für Details.

---

## 📈 Monitoring

Alle Services haben Actuator Endpoints:
- Health: `/actuator/health`
- Metrics: `/actuator/metrics`
- Info: `/actuator/info`

Log-Dateien:
- `logs/application.log` - Alle Logs
- `logs/error.log` - Nur Error Logs
- `logs/application.json` - JSON Format (ELK Stack)

## 🧪 Testing

```bash
# Backend Tests
cd backend
mvn test

# Frontend Tests
cd frontend
npm run test
```

## 📦 Deployment

### Production Checklist

**Vor Deployment:**
- [ ] Alle Config-Dateien in `config/` korrekt ausgefüllt
- [ ] JWT Secret in `config/application.yml` geändert
- [ ] DB Credentials in `config/database.yml` gesetzt
- [ ] SMTP Settings in `config/mail.yml` konfiguriert
- [ ] Übersetzungen in `config/i18n/` überprüft
- [ ] Version in pom.xml/package.json aktualisiert
- [ ] CHANGELOG.md aktualisiert
- [ ] Backup von `config/` Ordner erstellt

**WICHTIG**: `config/` Ordner NICHT ins Git committen!

### Docker Deployment

```bash
cd backend
docker-compose up -d
```

### Kubernetes

TODO: Kubernetes Deployment Configuration

## 🤝 Contributing

1. Fork das Repository
2. Erstelle einen Feature Branch
3. Commit deine Changes
4. Push zum Branch
5. Erstelle einen Pull Request

## 📄 License

Proprietary - Eckert Preisser

## 👥 Team

- **Project Lead**: TBD
- **Backend Team**: TBD
- **Frontend Team**: TBD
- **DevOps**: TBD

---

**Gebaut mit ❤️ für Enterprise-Level Performance**
