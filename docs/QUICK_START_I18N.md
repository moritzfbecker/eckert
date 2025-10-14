# Quick Start: Multi-Language Support

## 5-Minute Guide

### Backend

#### 1. Import MessageSource
```java
import com.eckertpreisser.common.utils.MessageSource;
```

#### 2. Get Messages
```java
// German
String messageDe = MessageSource.getMessage("user.created", "de");

// English
String messageEn = MessageSource.getMessage("user.created", "en");

// With parameters
String welcome = MessageSource.getMessage("user.welcome", "de", "Max Mustermann");
```

#### 3. Use in Service
```java
@Service
public class UserService {
    public UserDTO createUser(CreateUserRequest request, String language) {
        // ... create user ...

        String message = MessageSource.getMessage("user.created", language);
        LoggerUtil.info(logger, "USER_001", message, Map.of("userId", user.getId()));

        return dto;
    }
}
```

---

### Frontend

#### 1. Import i18n
```typescript
import { t, changeLanguage } from '@eckert-preisser/shared/utils';
```

#### 2. Translate Text
```typescript
// Simple translation
const message = t('user.created');

// With parameters
const welcome = t('user.welcome', { 0: 'John' });

// In JSX
<h1>{t('app.welcome')}</h1>
<p>{t('home.hero.subtitle')}</p>
```

#### 3. Switch Language
```typescript
// Change to English
changeLanguage('en');

// Change to German
changeLanguage('de');

// Get current language
const lang = getCurrentLanguage();
```

#### 4. Language Switcher Component
```typescript
import { LanguageSwitcher } from '@eckert-preisser/shared/ui';

// In Header
<LanguageSwitcher />
```

---

## Adding New Translations

### 1. Backend - Add to Properties Files

**config/i18n/messages_de.properties**:
```properties
product.added=Produkt hinzugefügt
product.updated=Produkt aktualisiert
product.deleted=Produkt gelöscht
```

**config/i18n/messages_en.properties**:
```properties
product.added=Product added
product.updated=Product updated
product.deleted=Product deleted
```

### 2. Use in Code

**Backend**:
```java
String message = MessageSource.getMessage("product.added", language);
```

**Frontend**:
```typescript
const message = t('product.added');
```

---

## Common Translations

### Buttons
```
button.save
button.cancel
button.delete
button.edit
button.submit
button.get.started
button.learn.more
```

### Forms
```
form.email
form.password
form.first.name
form.last.name
```

### Validation
```
validation.required
validation.email.invalid
validation.password.weak
```

### Errors
```
error.something.went.wrong
error.unauthorized
error.not.found
error.internal
```

---

## Complete Example

### Backend Service
```java
@Service
@RequiredArgsConstructor
public class UserService {
    private static final Logger logger = LoggerFactory.getLogger(UserService.class);

    public UserDTO createUser(CreateUserRequest request, String language) {
        // Validate
        if (userRepository.existsByEmail(request.getEmail())) {
            String error = MessageSource.getMessage("user.already.exists", language);
            throw new ValidationException("USER_ERR_409_001", error);
        }

        // Create
        User user = userRepository.save(newUser);

        // Log with localized message
        String message = MessageSource.getMessage("user.created", language);
        LoggerUtil.info(logger, "USER_001", message, Map.of("userId", user.getId()));

        return convertToDTO(user);
    }
}
```

### Frontend Component
```typescript
const UserForm = () => {
  const [language, setLanguage] = useState(getCurrentLanguage());

  const handleSubmit = async (data) => {
    try {
      await api.post('/users', { ...data, language });
      toast.success(t('user.created'));
    } catch (error) {
      toast.error(t('error.something.went.wrong'));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{t('user.create')}</h2>

      <label>{t('form.email')}</label>
      <input type="email" />

      <label>{t('form.password')}</label>
      <input type="password" />

      <button>{t('button.save')}</button>
    </form>
  );
};
```

---

## DO's ✅

- Use MessageSource (backend) or t() (frontend)
- Add translations in BOTH DE and EN
- Use same key in both files
- Use descriptive keys (user.created not uc)
- Keep messages in external files

## DON'Ts ❌

- Don't hardcode text
- Don't forget English translation
- Don't use vague keys
- Don't skip i18n for user-facing text

---

## Need More Help?

- Full Documentation: CONFIG_SYSTEM.md
- Backend i18n: MessageSource.java
- Frontend i18n: shared/utils/i18n.ts
