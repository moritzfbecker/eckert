# Configuration System Documentation v2.0

**Version**: 2.0.0 - Enterprise Config API
**Last Updated**: 2025-10-21
**Breaking Changes**: YES - Complete rewrite with fluent API

---

## 🎯 Overview

Enterprise-level configuration system with:
- ✅ **Modular Config Structure** - Small files instead of giant monolith
- ✅ **Fluent API** - Clean `.get()` pattern everywhere
- ✅ **Auto-Registration** - Defaults automatically saved
- ✅ **RESTful API** - Complete CRUD operations
- ✅ **Multi-Type Support** - i18n, App Configs, Feature Flags
- ✅ **Caching** - Fast in-memory caching
- ✅ **No .env files!** - Everything in Config Server

---

## 🏗️ Architecture v2.0

```
Config Server (Port 8888)
├── RESTful API (/api/config/*)
├── ConfigService (Business Logic)
├── ConfigRepository (File I/O)
└── Modular config/ structure

Services (Gateway, User, Product, etc.)
├── ConfigClient (Fluent API)
├── ServiceConfig (.get() pattern)
└── Auto-registration of defaults

Frontend (React)
├── useConfig Hook (Fluent API)
├── FrontendConfig (.get() pattern)
└── Auto-registration of defaults
```

**Key Change from v1.x:**
- ❌ OLD: Hardcoded in MessageSource.java (900+ lines!)
- ✅ NEW: Modular files + Fluent API

---

## 📁 File Structure v2.0

```
config/
├── i18n/                          # Translations (NEW: Modular!)
│   ├── de/
│   │   ├── common.properties      # nav.*, button.*, form.*
│   │   ├── homepage.properties    # home.*
│   │   ├── concept.properties     # concept.*
│   │   ├── contact.properties     # contact.*
│   │   └── email.properties       # email.* (backend)
│   └── en/
│       └── ... (same structure)
│
├── app/                           # Service configs (NEW!)
│   ├── api-gateway.yml
│   ├── user-service.yml
│   └── email.yml
│
└── features/                      # Feature flags (NEW!)
    └── flags.yml
```

**Benefits:**
- Small files (< 10KB each)
- Easy to find and edit
- Lazy loading - only load what you need
- Git-friendly (can version control per category)

---

## 🚀 Quick Start - Frontend

### React Component (NEW v2.0 API)

```typescript
import { useConfig } from '@eckert-preisser/shared/hooks'

const Home = () => {
  // Load homepage config with German translations
  const config = useConfig('homepage', 'de')

  return (
    <div>
      {/* Fluent API - English defaults, German from backend */}
      <h1>{config.get('home.title', 'Welcome to Eckert Preisser')}</h1>
      <p>{config.get('home.subtitle', 'Enterprise solutions')}</p>
      <button>{config.get('home.cta', 'Get Started')}</button>
    </div>
  )
}
```

**What Happens:**
1. First `.get()` call → Registers default ("Welcome...")
2. Hook sends request to Config Server
3. Config Server checks: `config/i18n/de/homepage.properties` exists?
   - NO → Creates file with EN defaults
   - YES → Loads DE translations, merges with defaults
4. Component renders with correct language

**Result:**
- `config/i18n/de/homepage.properties` created/updated automatically
- No manual file editing needed!
- Admin can edit file later if needed

---

## 🚀 Quick Start - Backend (Microservices)

### Spring Service (NEW v2.0 API)

```java
@Service
@RequiredArgsConstructor
public class UserService {

    private final ConfigClient configClient;
    private final EmailService emailService;

    public void sendWelcomeEmail(User user) {
        // Load email config with fluent API
        ServiceConfig config = configClient.load("email", user.getLanguage());

        // Use .get() pattern - clean and simple!
        String subject = config.get("email.welcome.subject", "Welcome to our platform!");
        String body = config.get("email.welcome.body", "Hi {name}, thank you for joining us!");

        emailService.send(
            user.getEmail(),
            subject,
            body.replace("{name}", user.getName())
        );
    }
}
```

**What Happens:**
1. ConfigClient calls Config Server API
2. Config Server loads `config/i18n/{language}/email.properties`
3. If doesn't exist → Creates with EN defaults
4. Returns translations (DE if exists, EN defaults otherwise)
5. Service uses values

---

## 🚀 Quick Start - Config Server Itself

### Inside Config Server (NEW v2.0 API)

```java
@Service
@RequiredArgsConstructor
public class AdminService {

    private final ConfigService configService;

    public void setupDefaultTranslations() {
        // Load config with fluent API
        Config config = configService.load("homepage", "de");

        // Use .get() pattern to register defaults
        String title = config.get("home.title", "Willkommen");
        String subtitle = config.get("home.subtitle", "Enterprise Lösungen");
        String cta = config.get("home.cta", "Jetzt starten");

        // Auto-saves if config was modified
        configService.save(config);
    }
}
```

---

## 🌐 REST API Reference

### I18N Endpoints

**Get or Register Translations**
```http
POST /api/config/i18n/{category}/{language}
Content-Type: application/json

Body (Optional - EN defaults):
{
  "home.title": "Welcome",
  "home.subtitle": "Enterprise solutions"
}

Response:
{
  "home.title": "Willkommen",      // DE translation if exists
  "home.subtitle": "Enterprise Lösungen"
}
```

**Get Translations (Read-Only)**
```http
GET /api/config/i18n/{category}/{language}

Response:
{
  "home.title": "Willkommen",
  "home.subtitle": "Enterprise Lösungen"
}
```

**Update Single Key**
```http
PUT /api/config/i18n/{category}/{language}/{key}
Content-Type: application/json

Body:
{
  "value": "Neue Übersetzung"
}
```

**Delete Key**
```http
DELETE /api/config/i18n/{category}/{language}/{key}
```

**Delete Entire Category**
```http
DELETE /api/config/i18n/{category}/{language}
```

**List All Categories**
```http
GET /api/config/i18n/categories/{language}

Response:
["common", "homepage", "concept", "contact", "email"]
```

### App Config Endpoints

**Get or Register App Config**
```http
POST /api/config/app/{category}
Content-Type: application/json

Body:
{
  "server.port": "8080",
  "app.name": "API Gateway"
}

Response:
{
  "server.port": "8080",
  "app.name": "API Gateway"
}
```

**Update App Config Key**
```http
PUT /api/config/app/{category}/{key}
Content-Type: application/json

Body:
{
  "value": "8081"
}
```

### Cache Management

**Clear Cache**
```http
GET /api/config/cache/clear

Response:
{
  "status": "success",
  "message": "Cache cleared successfully"
}
```

---

## 📊 Migration from v1.x

### What Changed

| Aspect | v1.x | v2.0 |
|--------|------|------|
| File Structure | Single file | Modular per category |
| API | MessageSource static methods | Fluent Config API |
| Registration | Manual in Java | Auto-registration on .get() |
| Frontend | useTranslation with t() | useConfig with .get() |
| Backend | MessageSource.getMessage() | config.get() |
| File Size | 900+ lines | ~50 lines per file |

### Migration Steps

**Frontend:**
```typescript
// OLD v1.x
const { t } = useTranslation()
<h1>{t('home.title')}</h1>

// NEW v2.0
const config = useConfig('homepage', 'de')
<h1>{config.get('home.title', 'Welcome')}</h1>
```

**Backend:**
```java
// OLD v1.x
String message = MessageSource.getMessage("user.created", "de");

// NEW v2.0
ServiceConfig config = configClient.load("user", "de");
String message = config.get("user.created", "User created successfully");
```

**Config Files:**
```
OLD: config/i18n/messages_de.properties (1000+ lines!)

NEW: config/i18n/de/
     ├── common.properties (50 lines)
     ├── homepage.properties (20 lines)
     ├── concept.properties (100 lines)
     └── ... (modular!)
```

---

## 💡 Best Practices v2.0

### Frontend

**✅ DO:**
```typescript
// Load config once at top
const config = useConfig('homepage', 'de')

// Use everywhere with English defaults
<h1>{config.get('home.title', 'Welcome to Eckert Preisser')}</h1>
<p>{config.get('home.subtitle', 'Enterprise solutions for modern businesses')}</p>
```

**❌ DON'T:**
```typescript
// Don't hardcode!
<h1>Welcome to Eckert Preisser</h1>  // ❌

// Don't load config multiple times
const config1 = useConfig('homepage', 'de')
const config2 = useConfig('homepage', 'de')  // ❌ Duplicate!
```

### Backend

**✅ DO:**
```java
// Load once, use multiple times
ServiceConfig config = configClient.load("email", language);

String subject = config.get("email.subject", "Welcome!");
String body = config.get("email.body", "Thank you for joining!");
String footer = config.get("email.footer", "Best regards");
```

**❌ DON'T:**
```java
// Don't load for each key
String subject = configClient.load("email", "de").get("email.subject", "Welcome!");
String body = configClient.load("email", "de").get("email.body", "...");  // ❌ Inefficient!
```

---

## 🔐 Security

**Important Rules:**
1. **Never commit `config/` folder** - Add to .gitignore
2. **Use environment-specific secrets** - Different per env
3. **Secure Config Server API** - Add authentication
4. **Backup configs regularly** - Store securely

**Recommended .gitignore:**
```
config/
*.yml
*.properties
```

---

## 🐛 Troubleshooting v2.0

**Config not loading?**
1. Check Config Server: `curl http://localhost:8888/api/config/health`
2. Check logs for `CONFIG_API_*` or `CONFIG_SRV_*` codes
3. Clear cache: `curl http://localhost:8888/api/config/cache/clear`

**Translations not updating?**
1. Edit file: `config/i18n/de/homepage.properties`
2. Clear cache
3. Reload component

**File not created?**
1. Check `config/i18n/{language}/` directory exists
2. Check write permissions
3. Check ConfigRepository logs for `CONFIG_REPO_ERR_*`

---

## 📚 Additional Documentation

- **CONFIG_API.md** - Complete API reference with examples
- **CLAUDE.md** - Development guidelines
- **ERROR_CODES.md** - All CONFIG_* error codes
- **CHANGELOG.md** - Version history

---

## 🎯 Summary - v2.0 vs v1.x

**v1.x Problems:**
- ❌ MessageSource.java: 900+ lines
- ❌ Not scalable
- ❌ Hard to maintain
- ❌ One giant file

**v2.0 Solutions:**
- ✅ Modular structure
- ✅ Fluent API
- ✅ Auto-registration
- ✅ RESTful API
- ✅ 50 lines per file

**Developer Experience:**
```java
// v1.x - Manual registration in code
messages.setProperty("home.title", "Welcome");  // In MessageSource.java

// v2.0 - Auto-registration on use
config.get("home.title", "Welcome");  // Anywhere in code!
```

---

**Built with ❤️ for Enterprise-Level Configuration Management**

**Author:** Moritz F. Becker - Helped by Claude AI
**Version:** 2.0.0
**Date:** 2025-10-21
