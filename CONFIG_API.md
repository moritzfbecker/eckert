# Enterprise Config API - Complete Guide

**Version:** 2.0.0
**Author:** Moritz F. Becker
**Date:** 2025-10-21

---

## 🎯 Overview

Enterprise-level configuration system with modular structure, auto-registration, and fluent API.

**Features:**
- ✅ **Modular Config Files** - One file per category (homepage, concept, email, etc.)
- ✅ **Auto-Registration** - Defaults automatically registered on first use
- ✅ **Fluent API** - Clean `.get()` pattern in both Backend and Frontend
- ✅ **Multiple Types** - i18n, App Configs, Feature Flags, Custom
- ✅ **RESTful API** - Complete CRUD operations
- ✅ **Caching** - In-memory caching for performance
- ✅ **Type-Safe** - TypeScript Frontend, Java Backend

---

## 📁 File Structure

```
config/
├── i18n/                          # Translations (modular!)
│   ├── de/
│   │   ├── common.properties      # nav.*, button.*, form.*
│   │   ├── homepage.properties    # home.*
│   │   ├── concept.properties     # concept.*
│   │   ├── contact.properties     # contact.*
│   │   └── email.properties       # email.* (backend)
│   └── en/
│       └── ... (same structure)
│
├── app/                           # Service configs
│   ├── api-gateway.yml
│   ├── user-service.yml
│   └── email.yml
│
└── features/                      # Feature flags
    └── flags.yml
```

**Benefits:**
- Small, maintainable files (not one giant file!)
- Lazy loading - only load what you need
- Easy to find and edit specific translations

---

## 🚀 Quick Start

### Frontend (React)

```typescript
// In any React component
import { useConfig } from '@eckert-preisser/shared/hooks'

const Home = () => {
  // Load config with English defaults
  const config = useConfig('homepage', 'de')

  return (
    <div>
      <h1>{config.get('home.title', 'Welcome to Eckert Preisser')}</h1>
      <p>{config.get('home.subtitle', 'Enterprise solutions')}</p>
    </div>
  )
}
```

**What happens:**
1. First render → Loads `config/i18n/de/homepage.properties`
2. If file doesn't exist → Creates it with EN defaults
3. If exists → Returns German translations (or falls back to EN default)
4. All `.get()` calls register their defaults automatically

### Backend (Java - Microservices)

```java
// In any Spring Service
@Service
@RequiredArgsConstructor
public class UserService {

    private final ConfigClient configClient;

    public void sendWelcomeEmail(User user) {
        // Load email config with defaults
        ServiceConfig config = configClient.load("email", user.getLanguage());

        String subject = config.get("email.welcome.subject", "Welcome!");
        String body = config.get("email.welcome.body", "Hi {name}, thank you for joining!");

        emailService.send(user.getEmail(), subject, body);
    }
}
```

### Backend (Java - In Config Server)

```java
// In Config Server itself
@Service
@RequiredArgsConstructor
public class I18nService {

    private final ConfigService configService;

    public void generateTranslations() {
        // Load config
        Config config = configService.load("homepage", "de");

        // Use fluent API
        String title = config.get("home.title", "Willkommen");
        String subtitle = config.get("home.subtitle", "Enterprise Lösungen");

        // Auto-saves if new keys added
        configService.save(config);
    }
}
```

---

## 📖 API Reference

### Frontend - `useConfig`

```typescript
useConfig(category: string, language: string | null): FrontendConfig
```

**Parameters:**
- `category` - Config category (e.g., "homepage", "concept")
- `language` - Language code ("de", "en") or null for app configs

**Returns:** `FrontendConfig` with methods:
- `.get(key, default)` - Get string value
- `.getNumber(key, default)` - Get number value
- `.getBoolean(key, default)` - Get boolean value
- `.contains(key)` - Check if key exists

**Example:**
```typescript
const config = useConfig('homepage', 'de')
const title = config.get('home.title', 'Welcome')
const count = config.getNumber('home.itemCount', 10)
const enabled = config.getBoolean('home.featureEnabled', false)
```

### Backend - `ConfigClient`

```java
ServiceConfig load(String category, String language)
ServiceConfig load(String category, String language, ConfigClientType type, Map<String, String> defaults)
ServiceConfig loadApp(String category)
ServiceConfig loadApp(String category, Map<String, String> defaults)
```

**Example:**
```java
// i18n
ServiceConfig config = configClient.load("email", "de");

// App config
ServiceConfig config = configClient.loadApp("api-gateway", Map.of(
    "server.port", "8080",
    "app.name", "API Gateway"
));
```

### Config Server - `ConfigService`

```java
Config load(String category, String language, ConfigType type)
void save(Config config)
Map<String, String> getOrCreate(String category, String language, ConfigType type, Map<String, String> defaults)
void update(String category, String language, ConfigType type, String key, String value)
boolean delete(String category, String language, ConfigType type)
List<String> listCategories(ConfigType type, String language)
```

---

## 🌐 REST API Endpoints

### I18N Endpoints

**Get or Register i18n Config**
```http
POST /api/config/i18n/{category}/{language}
Content-Type: application/json

{
  "home.title": "Welcome",
  "home.subtitle": "Enterprise solutions"
}

Response: { "home.title": "Willkommen", "home.subtitle": "Enterprise Lösungen" }
```

**Get i18n Config (Read-Only)**
```http
GET /api/config/i18n/{category}/{language}

Response: { "home.title": "Willkommen", ... }
```

**Update Single Key**
```http
PUT /api/config/i18n/{category}/{language}/{key}
Content-Type: application/json

{ "value": "New translation" }
```

**Delete Key**
```http
DELETE /api/config/i18n/{category}/{language}/{key}
```

**Delete Entire Config**
```http
DELETE /api/config/i18n/{category}/{language}
```

**List Categories**
```http
GET /api/config/i18n/categories/{language}

Response: ["common", "homepage", "concept", "contact"]
```

### App Config Endpoints

**Get or Register App Config**
```http
POST /api/config/app/{category}
Content-Type: application/json

{
  "server.port": "8080",
  "app.name": "API Gateway"
}

Response: { "server.port": "8080", ... }
```

**Get App Config**
```http
GET /api/config/app/{category}
```

**Update App Config Key**
```http
PUT /api/config/app/{category}/{key}
Content-Type: application/json

{ "value": "8081" }
```

**Delete App Config**
```http
DELETE /api/config/app/{category}
```

**List App Categories**
```http
GET /api/config/app/categories

Response: ["api-gateway", "user-service", "email"]
```

### Cache Management

**Clear Cache**
```http
GET /api/config/cache/clear

Response: { "status": "success", "message": "Cache cleared successfully" }
```

**Health Check**
```http
GET /api/config/health

Response: { "status": "UP", "service": "Config Server API", "version": "2.0.0" }
```

---

## 🔄 Workflow

### First Load (No Config Exists)

1. **Frontend Component:**
   ```typescript
   const config = useConfig('homepage', 'de')
   const title = config.get('home.title', 'Welcome')
   ```

2. **Request to Backend:**
   ```http
   POST /api/config/i18n/homepage/de
   { "home.title": "Welcome" }
   ```

3. **Config Server:**
   - Checks: Does `config/i18n/de/homepage.properties` exist?
   - No → Creates file with default: `home.title=Welcome`
   - Returns: `{ "home.title": "Welcome" }`

4. **Frontend:**
   - Caches config
   - Renders: "Welcome"

### Subsequent Loads (Config Exists)

1. **Component Loads:**
   ```typescript
   const config = useConfig('homepage', 'de')
   const title = config.get('home.title', 'Welcome')
   ```

2. **Request to Backend:**
   ```http
   POST /api/config/i18n/homepage/de
   { "home.title": "Welcome" }
   ```

3. **Config Server:**
   - File exists → Reads `config/i18n/de/homepage.properties`
   - Contains: `home.title=Willkommen`
   - Merges: Defaults + Existing (existing wins!)
   - Returns: `{ "home.title": "Willkommen" }`

4. **Frontend:**
   - Caches config
   - Renders: "Willkommen" ✅

### Admin Changes Translation

1. **Admin edits file or uses API:**
   ```http
   PUT /api/config/i18n/homepage/de/home.title
   { "value": "Herzlich Willkommen" }
   ```

2. **Config Server:**
   - Updates `homepage.properties`
   - Clears cache

3. **Next Component Load:**
   - Fetches fresh config
   - Renders: "Herzlich Willkommen"

---

## 💡 Best Practices

### DO's ✅

1. **Use English as Defaults**
   ```typescript
   config.get('home.title', 'Welcome to Our Platform')
   ```

2. **Group Related Keys**
   ```typescript
   // ✅ Good - all in 'homepage' category
   config.get('home.title', 'Welcome')
   config.get('home.subtitle', 'Enterprise Solutions')
   config.get('home.cta', 'Get Started')
   ```

3. **Use Descriptive Keys**
   ```typescript
   // ✅ Good
   config.get('email.welcome.subject', 'Welcome!')

   // ❌ Bad
   config.get('e1', 'Welcome!')
   ```

4. **One Category Per Page/Feature**
   - Homepage → `homepage` category
   - Concept Page → `concept` category
   - Email Templates → `email` category

5. **Load Config Once at Top**
   ```typescript
   const Home = () => {
     const config = useConfig('homepage', 'de')

     return (
       <div>
         <h1>{config.get('home.title', 'Welcome')}</h1>
         <p>{config.get('home.subtitle', 'Subtitle')}</p>
       </div>
     )
   }
   ```

### DON'Ts ❌

1. **Don't Hardcode Strings**
   ```typescript
   // ❌ Bad
   return <h1>Welcome to our platform</h1>

   // ✅ Good
   return <h1>{config.get('home.title', 'Welcome to our platform')}</h1>
   ```

2. **Don't Mix Languages in Defaults**
   ```typescript
   // ❌ Bad - default should be English
   config.get('home.title', 'Willkommen')

   // ✅ Good
   config.get('home.title', 'Welcome')
   ```

3. **Don't Load Config Multiple Times**
   ```typescript
   // ❌ Bad - loads config twice!
   const ComponentA = () => {
     const config = useConfig('homepage', 'de')
     return <div>{config.get('home.title', 'Welcome')}</div>
   }

   const ComponentB = () => {
     const config = useConfig('homepage', 'de')  // ❌ Duplicate!
     return <div>{config.get('home.subtitle', 'Subtitle')}</div>
   }

   // ✅ Good - pass config down or use context
   const Parent = () => {
     const config = useConfig('homepage', 'de')
     return (
       <>
         <ComponentA config={config} />
         <ComponentB config={config} />
       </>
     )
   }
   ```

---

## 🔧 Advanced Usage

### Feature Flags

```typescript
// Frontend
const config = useConfig('features', null)  // null = app config, not i18n
const darkModeEnabled = config.getBoolean('darkMode.enabled', false)

if (darkModeEnabled) {
  // Show dark mode toggle
}
```

### Dynamic Language Switching

```typescript
const [language, setLanguage] = useState('de')
const config = useConfig('homepage', language)

const switchLanguage = () => {
  setLanguage(language === 'de' ? 'en' : 'de')
  clearConfigCache()  // Clear cache to force reload
}
```

### Batch Updates (Admin UI)

```typescript
// Update multiple keys at once
const updates = {
  'home.title': 'New Title',
  'home.subtitle': 'New Subtitle',
  'home.description': 'New Description'
}

for (const [key, value] of Object.entries(updates)) {
  await fetch(`/api/config/i18n/homepage/de/${key}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ value })
  })
}
```

---

## 🎓 Migration Guide

### From Old MessageSource System

**Old Way (Hardcoded in MessageSource.java):**
```java
// MessageSource.java - 900+ lines! 😱
messages.setProperty("home.title", "Willkommen");
messages.setProperty("home.subtitle", "Enterprise Lösungen");
// ... 500 more lines ...
```

**New Way (Fluent API):**
```java
// Anywhere in code
Config config = configService.load("homepage", "de");
String title = config.get("home.title", "Welcome");
```

**Migration Steps:**
1. Identify config category (e.g., "homepage", "concept")
2. Replace hardcoded values with `.get()` calls
3. First run creates config files automatically
4. Old MessageSource.java can be deleted!

---

## 📊 Performance

**Caching Strategy:**
- Frontend: In-memory Map cache per category
- Backend: ConcurrentHashMap cache in ConfigService
- Cache invalidation: On config updates or manual clear

**Load Times:**
- First load: ~50-100ms (file read + HTTP)
- Subsequent loads: <1ms (cached)
- File size: <10KB per category (fast!)

---

## 🔒 Security

**Access Control:**
- Frontend: Read-only access to config values
- Backend Services: Full access via ConfigClient
- Admin UI: Update via REST API (add auth middleware!)

**Recommendations:**
```java
// Add security to update endpoints
@PreAuthorize("hasRole('ADMIN')")
@PutMapping("/i18n/{category}/{language}/{key}")
public ResponseEntity<Void> updateI18nKey(...) {
    // ...
}
```

---

## 🐛 Troubleshooting

**Config not loading?**
1. Check Config Server is running (port 8888)
2. Check `config/` directory permissions
3. Check logs for errors (search for CONFIG_ERR)

**Translations not updating?**
1. Clear cache: `GET /api/config/cache/clear`
2. Or restart Config Server
3. Check file was actually saved

**File not created?**
1. Check `config/i18n/{language}/` directory exists
2. Check write permissions
3. Check ConfigRepository logs

---

## 📚 Additional Resources

- **CLAUDE.md** - Development guidelines
- **ERROR_CODES.md** - All error codes (CONFIG_*)
- **CHANGELOG.md** - Version history
- **backend/config-server/** - Source code

---

**Built with ❤️ for Enterprise-Level Configuration Management**

---

## 📝 Changelog

### [2.0.0] - 2025-10-21

**BREAKING CHANGES:**
- Complete rewrite of config system
- MessageSource.java deprecated
- New fluent API in Backend and Frontend

**Added:**
- Modular config file structure
- Auto-registration of defaults
- RESTful API for config management
- ConfigClient for microservices
- useConfig hook for React
- Support for i18n, app configs, feature flags

**Improved:**
- Performance (caching)
- Scalability (modular files)
- Developer Experience (fluent API)
- Maintainability (small files)

---

**Author:** Moritz F. Becker - Helped by Claude AI
**Version:** 2.0.0
**Date:** 2025-10-21
