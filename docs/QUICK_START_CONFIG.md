# Quick Start: Configuration System

## 5-Minute Guide

### NO .env Files!

All configuration is in external YAML files that are auto-generated on first start.

---

## First Startup

### 1. Start Application

```bash
cd backend
mvn spring-boot:run
```

### 2. Config Files Created Automatically

```
config/
├── application.yml
├── database.yml
├── mail.yml
├── language.yml
└── i18n/
    ├── messages_de.properties
    └── messages_en.properties
```

### 3. Stop Application

```bash
Ctrl+C
```

### 4. Edit Config Files

```bash
cd config
nano application.yml
nano database.yml
nano mail.yml
```

### 5. Restart Application

```bash
mvn spring-boot:run
```

---

## Configuration Files

### application.yml

```yaml
server:
  port: 8080

application:
  name: eckert-preisser-enterprise
  version: 1.0.0
  default-language: de

security:
  jwt:
    secret: CHANGE_THIS_SECRET_KEY_IN_PRODUCTION
    expiration: 86400000
```

**Change**:
- `security.jwt.secret` to secure random string
- `application.default-language` to `de` or `en`

---

### database.yml

```yaml
datasource:
  url: jdbc:postgresql://localhost:5432/eckert_preisser
  username: postgres
  password: CHANGE_THIS_PASSWORD
  driver-class-name: org.postgresql.Driver
```

**Change**:
- `datasource.url` to your database
- `datasource.username` and `datasource.password`

---

### mail.yml

```yaml
mail:
  host: smtp.gmail.com
  port: 587
  username: your-email@example.com
  password: CHANGE_THIS_PASSWORD
  from: noreply@eckert-preisser.com
  from-name: Eckert Preisser
```

**Change**:
- `mail.host` and `mail.port` to your SMTP server
- `mail.username` and `mail.password`
- `mail.from` to your sender email

---

### language.yml

```yaml
languages:
  default: de
  supported:
    - de
    - en
  fallback: en
```

**Change**:
- `languages.default` to `de` or `en`

---

## Using Config in Code

### Backend

```java
import com.eckertpreisser.common.utils.ConfigManager;

// Load config
Map<String, Object> dbConfig = ConfigManager.loadConfig("database.yml");
String dbUrl = (String) dbConfig.get("datasource.url");
```

---

## Production Deployment

### 1. Deploy Application

```bash
# Build
mvn clean package

# Run
java -jar target/api-gateway.jar
```

### 2. Config Generated

App creates `config/` folder automatically.

### 3. Stop Application

```bash
Ctrl+C
```

### 4. Configure

```bash
cd config
vim application.yml  # Set production JWT secret
vim database.yml     # Set production DB credentials
vim mail.yml        # Set production SMTP
```

### 5. Start Production

```bash
java -jar target/api-gateway.jar
```

---

## Backup Config

```bash
# Backup
tar -czf config-backup.tar.gz config/

# Restore
tar -xzf config-backup.tar.gz
```

---

## .gitignore

**NEVER commit config files!**

```
config/
*.yml
*.properties
```

---

## Environment-Specific

### Development
```yaml
# config/database.yml
datasource:
  url: jdbc:postgresql://localhost:5432/eckert_dev
  username: dev_user
  password: dev_password
```

### Production
```yaml
# config/database.yml
datasource:
  url: jdbc:postgresql://prod-server:5432/eckert_prod
  username: prod_user
  password: super-secure-prod-password
```

---

## DO's ✅

- Use external config files
- Backup config/ folder
- Change secrets before production
- Keep config/ in .gitignore

## DON'Ts ❌

- Don't use .env files
- Don't commit config/ to git
- Don't hardcode credentials
- Don't skip config backup

---

## Troubleshooting

### Config not created?

```java
ConfigManager.initializeConfigIfNotExists();
```

### Config location?

```java
String configDir = ConfigManager.getConfigDirectory();
System.out.println("Config: " + configDir);
```

---

## Need More Help?

- Full Documentation: CONFIG_SYSTEM.md
- ConfigManager: backend/shared/common-utils/ConfigManager.java
