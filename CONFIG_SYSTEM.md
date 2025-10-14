# Configuration System Documentation

## Overview

Das Eckert Preisser Enterprise System verwendet ein **zentrales externes Konfigurationssystem**.

**Wichtige Regel**: **KEINE** `.env` Dateien im Code!

Alle Konfigurationen werden beim ersten Start automatisch in externen YAML-Dateien erstellt, die der Admin dann anpassen kann.

---

## Konfigurationsordner

Beim ersten Start der Applikation wird automatisch ein `config/` Ordner erstellt:

```
config/
├── application.yml       # Haupt-Konfiguration
├── database.yml          # Datenbank-Einstellungen
├── mail.yml             # E-Mail-Einstellungen
├── language.yml         # Sprach-Einstellungen
└── i18n/               # Übersetzungsdateien
    ├── messages_de.properties
    └── messages_en.properties
```

---

## Konfigurationsdateien

### 1. application.yml

Haupt-Konfiguration der Applikation

```yaml
# Eckert Preisser Enterprise Configuration
# Generated automatically - Please configure before production use

server:
  port: 8080

application:
  name: eckert-preisser-enterprise
  version: 1.0.0
  default-language: de

security:
  jwt:
    secret: CHANGE_THIS_SECRET_KEY_IN_PRODUCTION
    expiration: 86400000  # 24 hours in milliseconds
```

**Produktions-Anpassungen:**
- Ändere `security.jwt.secret` zu einem sicheren Secret
- Passe `server.port` bei Bedarf an
- Setze `default-language` auf `de` oder `en`

---

### 2. database.yml

Datenbank-Konfiguration

```yaml
datasource:
  url: jdbc:postgresql://localhost:5432/eckert_preisser
  username: postgres
  password: CHANGE_THIS_PASSWORD
  driver-class-name: org.postgresql.Driver

jpa:
  hibernate:
    ddl-auto: validate  # Use 'update' for dev, 'validate' for prod
  show-sql: false      # Set to true for debugging

connection-pool:
  maximum-pool-size: 10
  minimum-idle: 5
```

**Produktions-Anpassungen:**
- Ändere `datasource.url` zu deinem Datenbank-Server
- Setze `datasource.username` und `datasource.password`
- Verwende `ddl-auto: validate` in Production
- Setze `show-sql: false` in Production

---

### 3. mail.yml

E-Mail-Server-Konfiguration

```yaml
mail:
  host: smtp.gmail.com
  port: 587
  username: your-email@example.com
  password: CHANGE_THIS_PASSWORD
  from: noreply@eckert-preisser.com
  from-name: Eckert Preisser
  properties:
    smtp:
      auth: true
      starttls-enable: true
```

**Produktions-Anpassungen:**
- Setze deinen SMTP-Server (`host`, `port`)
- Konfiguriere `username` und `password`
- Ändere `from` und `from-name` zu deinen Werten

---

### 4. language.yml

Sprach-Konfiguration

```yaml
languages:
  default: de              # Default language (de or en)
  supported:
    - de
    - en
  fallback: en            # Fallback if translation missing

i18n:
  messages-path: config/i18n/messages
  encoding: UTF-8
```

**Produktions-Anpassungen:**
- Setze `default` auf bevorzugte Sprache (`de` oder `en`)
- `fallback` ist die Sprache bei fehlenden Übersetzungen

---

## i18n (Internationalisierung)

### Übersetzungsdateien

Automatisch generierte Übersetzungsdateien:

**config/i18n/messages_de.properties** (Deutsch):
```properties
# Eckert Preisser i18n - DE

app.name=Eckert Preisser Enterprise
app.welcome=Willkommen bei Eckert Preisser

user.created=Benutzer erfolgreich erstellt
user.updated=Benutzer erfolgreich aktualisiert
user.not.found=Benutzer nicht gefunden

validation.email.invalid=Ungültige E-Mail-Adresse
validation.password.weak=Passwort ist zu schwach
```

**config/i18n/messages_en.properties** (English):
```properties
# Eckert Preisser i18n - EN

app.name=Eckert Preisser Enterprise
app.welcome=Welcome to Eckert Preisser

user.created=User created successfully
user.updated=User updated successfully
user.not.found=User not found

validation.email.invalid=Invalid email address
validation.password.weak=Password is too weak
```

### Neue Übersetzungen hinzufügen

1. **Beide Dateien bearbeiten** (DE + EN)
2. **Gleichen Key verwenden**:
```properties
# messages_de.properties
product.added=Produkt hinzugefügt

# messages_en.properties
product.added=Product added
```

3. **Im Code verwenden**:

**Backend:**
```java
String message = MessageSource.getMessage("product.added", "de");
String formatted = MessageSource.getMessage("user.welcome", "de", "John");
```

**Frontend:**
```typescript
import { t } from '@eckert-preisser/shared/utils';

const message = t('product.added');
const formatted = t('user.welcome', { 0: 'John' });
```

---

## Backend: Verwendung

### ConfigManager

Automatische Konfigurationsinitialisierung:

```java
import com.eckertpreisser.common.utils.ConfigManager;

// Wird automatisch beim Start aufgerufen
ConfigManager.initializeConfigIfNotExists();

// Config laden
Map<String, Object> dbConfig = ConfigManager.loadConfig("database.yml");

// Config-Verzeichnis abrufen
String configDir = ConfigManager.getConfigDirectory();
```

### MessageSource

Multi-Language Nachrichten abrufen:

```java
import com.eckertpreisser.common.utils.MessageSource;

// Deutsche Nachricht
String messageDe = MessageSource.getMessage("user.created", "de");

// Englische Nachricht
String messageEn = MessageSource.getMessage("user.created", "en");

// Mit Parametern
String welcome = MessageSource.getMessage("user.welcome", "de", "Max Mustermann");

// Nachrichten neu laden (Hot-Reload)
MessageSource.reloadMessages();
```

### Im Service verwenden

```java
@Service
@RequiredArgsConstructor
public class UserService {
    private static final Logger logger = LoggerFactory.getLogger(UserService.class);

    public UserDTO createUser(CreateUserRequest request) {
        // ... create user logic ...

        String message = MessageSource.getMessage("user.created", "de");
        LoggerUtil.info(logger, "USER_001", message, Map.of("userId", user.getId()));

        return convertToDTO(user);
    }
}
```

---

## Frontend: Verwendung

### i18n Initialisierung

In der Shell App:

```typescript
import { initI18n } from '@eckert-preisser/shared/utils';

// In App.tsx or main.tsx
useEffect(() => {
  initI18n();
}, []);
```

### Übersetzungen verwenden

```typescript
import { t, changeLanguage, getCurrentLanguage } from '@eckert-preisser/shared/utils';

// Übersetzen
const message = t('user.created');
const welcome = t('user.welcome', { 0: 'John' });

// Sprache wechseln
changeLanguage('en');  // Wechsel zu Englisch
changeLanguage('de');  // Wechsel zu Deutsch

// Aktuelle Sprache
const lang = getCurrentLanguage();  // 'de' oder 'en'
```

### LanguageSwitcher Component

```typescript
import { LanguageSwitcher } from '@eckert-preisser/shared/ui';

// In Header oder Navigation
<LanguageSwitcher />
```

Das zeigt zwei Buttons (DE / EN) zum Sprachwechsel.

---

## Production Deployment

### 1. Erste Installation

1. **Backend starten** → `config/` Ordner wird automatisch erstellt
2. **Anwendung stoppen**
3. **Config-Dateien bearbeiten**:
   - `application.yml` → JWT Secret ändern
   - `database.yml` → DB Credentials eintragen
   - `mail.yml` → SMTP Einstellungen
   - `language.yml` → Standardsprache setzen
4. **Anwendung neu starten**

### 2. Config-Dateien sichern

**WICHTIG**: Der `config/` Ordner sollte NICHT ins Git committed werden!

**.gitignore**:
```
config/
*.yml
*.properties
```

**Backup erstellen**:
```bash
# Config-Dateien sichern
tar -czf config-backup.tar.gz config/

# Backup wiederherstellen
tar -xzf config-backup.tar.gz
```

### 3. Updates

Bei App-Updates:
- **Bestehende Config-Dateien bleiben erhalten**
- Neue Config-Keys werden automatisch hinzugefügt
- Alte Werte werden NICHT überschrieben

---

## Umgebungsspezifische Konfiguration

### Development

```yaml
# config/application.yml (Development)
server:
  port: 8080

application:
  default-language: de

security:
  jwt:
    secret: dev-secret-key-not-for-production
```

### Staging

```yaml
# config/application.yml (Staging)
server:
  port: 8080

application:
  default-language: de

security:
  jwt:
    secret: staging-secret-key-change-in-production
```

### Production

```yaml
# config/application.yml (Production)
server:
  port: 443

application:
  default-language: de

security:
  jwt:
    secret: super-secure-production-secret-key-min-256-bit
```

---

## Hot-Reload (Erweitert)

### Backend

Nachrichten ohne Neustart neu laden:

```java
import com.eckertpreisser.common.utils.MessageSource;

// Alle Übersetzungen neu laden
MessageSource.reloadMessages();
```

### Frontend

Sprache zur Laufzeit wechseln:

```typescript
import { changeLanguage } from '@eckert-preisser/shared/utils';

// Sofortiger Sprachwechsel ohne Reload
changeLanguage('en');
```

---

## Fehlerbehebung

### Config-Dateien fehlen

**Problem**: Config-Dateien wurden nicht erstellt

**Lösung**:
```java
// Manuell initialisieren
ConfigManager.initializeConfigIfNotExists();
```

### Übersetzung fehlt

**Problem**: Key wird anstatt Übersetzung angezeigt

**Lösung**:
1. Prüfe ob Key in `messages_de.properties` und `messages_en.properties` existiert
2. Füge fehlende Übersetzung hinzu:
```properties
# messages_de.properties
missing.key=Deutsche Übersetzung

# messages_en.properties
missing.key=English Translation
```
3. Lade Nachrichten neu:
```java
MessageSource.reloadMessages();
```

### Falsche Sprache

**Problem**: App zeigt falsche Sprache

**Lösung**:
```yaml
# config/language.yml
languages:
  default: de  # Ändere zu 'en' für Englisch
```

---

## Best Practices

### ✅ DO's

1. **Config-Dateien außerhalb des Codes verwalten**
2. **Niemals Secrets ins Git committen**
3. **Backups der Config-Dateien erstellen**
4. **Übersetzungen in beiden Sprachen pflegen**
5. **Aussagekräftige Keys verwenden** (`user.created` statt `uc`)
6. **Config-Änderungen dokumentieren**

### ❌ DON'Ts

1. **Keine .env Dateien verwenden**
2. **Keine Hardcoded Credentials**
3. **Keine Secrets im Code**
4. **Keine Config-Dateien ins Git**
5. **Nicht nur eine Sprache pflegen**

---

## Beispiel: Kompletter Workflow

### 1. Backend Service

```java
@Service
@RequiredArgsConstructor
public class ProductService {
    private static final Logger logger = LoggerFactory.getLogger(ProductService.class);
    private final ProductRepository productRepository;

    public ProductDTO createProduct(CreateProductRequest request, String language) {
        // Create product
        Product product = productRepository.save(newProduct);

        // Get localized message
        String message = MessageSource.getMessage("product.created", language);

        // Log with message
        LoggerUtil.info(logger, "PRODUCT_001", message,
            Map.of("productId", product.getId(), "language", language));

        return convertToDTO(product);
    }
}
```

### 2. Frontend Component

```typescript
import { t, getCurrentLanguage } from '@eckert-preisser/shared/utils';
import { api, logger } from '@eckert-preisser/shared/utils';

const ProductForm = () => {
  const handleSubmit = async (data) => {
    try {
      const lang = getCurrentLanguage();
      const response = await api.post('/products', { ...data, language: lang });

      logger.info('PRODUCT_001', t('product.created'), { productId: response.data.id });
      toast.success(t('product.created'));
    } catch (error) {
      logger.error('PRODUCT_ERR_001', t('error.product.create'), error);
      toast.error(t('error.product.create'));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>{t('form.product.name')}</label>
      <input type="text" />
      <button>{t('button.save')}</button>
    </form>
  );
};
```

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2025-10-14 | Initial config system implementation |

---

**Last Updated**: 2025-10-14
**Version**: 1.0.0
