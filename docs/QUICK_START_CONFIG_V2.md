# Quick Start - Config API v2.0 ⚡

**Time to read:** 5 minutes
**Version:** 2.0.0
**Date:** 2025-10-21

---

## 🎯 What is Config API v2.0?

Enterprise-level configuration system with:
- ✅ **Auto-Registration** - Defaults in code, files created automatically
- ✅ **Modular Files** - Small files (50 lines) instead of giant monolith
- ✅ **Fluent API** - Clean `.get()` pattern everywhere
- ✅ **No Manual Editing** - Defaults in code = source of truth

---

## 🚀 Frontend (React) - 60 Seconds

### Step 1: Import Hook

```typescript
import { useConfig } from '@eckert-preisser/shared/hooks'
```

### Step 2: Load Config

```typescript
const Home = () => {
  // Load 'homepage' category for German
  const config = useConfig('homepage', 'de')

  return (
    <div>
      {/* Use .get() with English defaults */}
      <h1>{config.get('home.title', 'Welcome to Eckert Preisser')}</h1>
      <p>{config.get('home.subtitle', 'Enterprise solutions for modern businesses')}</p>
      <button>{config.get('home.cta', 'Get Started')}</button>
    </div>
  )
}
```

### Step 3: Run App

```bash
npm run dev
```

**What happens:**
1. Component renders with "Welcome to Eckert Preisser" (EN default)
2. Hook calls Config Server API
3. Config Server creates `config/i18n/de/homepage.properties` with EN defaults
4. Admin can edit file to change to German
5. Next load → Shows German translations!

**That's it!** No manual file editing needed! 🎉

---

## 🔧 Backend (Java) - 60 Seconds

### Step 1: Add Dependency

```xml
<!-- pom.xml -->
<dependency>
    <groupId>com.eckertpreisser</groupId>
    <artifactId>config-client</artifactId>
</dependency>
```

### Step 2: Inject ConfigClient

```java
@Service
@RequiredArgsConstructor
public class UserService {

    private final ConfigClient configClient;
    private final EmailService emailService;

    public void sendWelcomeEmail(User user) {
        // Load config
        ServiceConfig config = configClient.load("email", user.getLanguage());

        // Use .get() with English defaults
        String subject = config.get("email.welcome.subject", "Welcome to our platform!");
        String body = config.get("email.welcome.body", "Hi {name}, thank you for joining!");

        emailService.send(user.getEmail(), subject, body);
    }
}
```

### Step 3: Run Service

```bash
mvn spring-boot:run
```

**What happens:**
1. Service calls ConfigClient
2. ConfigClient calls Config Server API
3. Config Server creates `config/i18n/de/email.properties` with EN defaults
4. Admin can edit to customize
5. Next call → Returns customized values!

**Done!** Files created automatically! 🎉

---

## 🎨 Real Example - Before & After

### Before v1.x (BAD!)

**MessageSource.java - 900+ lines:**
```java
// In MessageSource.java
messages.setProperty("home.title", "Willkommen");
messages.setProperty("home.subtitle", "Enterprise Lösungen");
messages.setProperty("home.cta", "Jetzt starten");
// ... 897 more lines ...
```

**Frontend:**
```typescript
const { t } = useTranslation()
<h1>{t('home.title')}</h1>
```

**Problems:**
- ❌ Giant file (impossible to maintain!)
- ❌ Manual editing required
- ❌ Not scalable
- ❌ Hardcoded in Java

### After v2.0 (GOOD!)

**No manual editing!** Just use in code:

**Backend:**
```java
ServiceConfig config = configClient.load("homepage", "de");
String title = config.get("home.title", "Welcome");
// → Auto-creates config/i18n/de/homepage.properties
```

**Frontend:**
```typescript
const config = useConfig('homepage', 'de')
<h1>{config.get('home.title', 'Welcome')}</h1>
// → Auto-creates config/i18n/de/homepage.properties
```

**Benefits:**
- ✅ Small modular files (~50 lines)
- ✅ Auto-created on first use
- ✅ Defaults in code (easy to find!)
- ✅ Scalable to 1000s of keys

---

## 📁 File Structure Example

**After running app with useConfig:**

```
config/
└── i18n/
    ├── de/
    │   └── homepage.properties   # Auto-created!
    └── en/
        └── homepage.properties   # Auto-created!
```

**homepage.properties:**
```properties
# Eckert Preisser Enterprise - i18n Configuration
# Category: homepage
# Language: DE
# Generated: 2025-10-21
#
# DO NOT EDIT MANUALLY - Managed by Config Server

home.title=Welcome to Eckert Preisser
home.subtitle=Enterprise solutions for modern businesses
home.cta=Get Started
```

**To customize:** Just edit the file! Change "Welcome" → "Willkommen"

---

## 🔥 Pro Tips

### 1. Type-Safe Config

```java
// String
String value = config.get("key", "default");

// Integer
int port = config.getInt("server.port", 8080);

// Boolean
boolean enabled = config.getBoolean("feature.enabled", false);

// Long
long timeout = config.getLong("timeout.ms", 30000L);

// Double
double rate = config.getDouble("tax.rate", 0.19);
```

### 2. Load Once, Use Everywhere

```typescript
// ✅ Good - load once at top
const config = useConfig('homepage', 'de')

return (
  <div>
    <h1>{config.get('home.title', 'Welcome')}</h1>
    <p>{config.get('home.subtitle', 'Subtitle')}</p>
    <button>{config.get('home.cta', 'CTA')}</button>
  </div>
)

// ❌ Bad - loading multiple times!
<h1>{useConfig('homepage', 'de').get('home.title', 'Welcome')}</h1>
```

### 3. English Defaults ALWAYS

```typescript
// ✅ Good - English defaults
config.get('home.title', 'Welcome to Eckert Preisser')

// ❌ Bad - German defaults
config.get('home.title', 'Willkommen bei Eckert Preisser')
```

**Why?** English is universal fallback. German comes from backend!

### 4. Categories = Pages/Features

```
homepage.properties    → Home page translations
concept.properties     → Concept page
contact.properties     → Contact page
email.properties       → Email templates (backend)
payment.properties     → Payment config (backend)
```

One category = One small file!

---

## 🐛 Troubleshooting

**Config not loading?**
- Check Config Server: `http://localhost:8888/api/config/health`
- Check logs for `CONFIG_API_*` codes

**File not created?**
- Check `config/i18n/{language}/` directory exists
- Check write permissions
- Check logs for `CONFIG_REPO_ERR_*` codes

**Translations not updating?**
- Clear cache: `curl http://localhost:8888/api/config/cache/clear`
- Or edit file directly

---

## 📚 Next Steps

**Comprehensive Docs:**
- **CONFIG_API.md** - Complete API reference
- **CONFIG_SYSTEM.md** - Architecture and migration
- **ERROR_CODES.md** - All CONFIG_* error codes

**Other Quick Starts:**
- `QUICK_START_LOGGING.md` - Logging in 5 min
- `QUICK_START_VERSIONING.md` - Versioning in 5 min
- `QUICK_START_I18N.md` - i18n in 5 min

---

**Built with ❤️ for Enterprise-Level Configuration**

**Author:** Moritz F. Becker - Helped by Claude AI
**Version:** 2.0.0
