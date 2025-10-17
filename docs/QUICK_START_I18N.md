# Quick Start: Multi-Language Support

**Version**: 2.0.0 (Updated for useTranslation Hook + Config Server)
**Last Updated**: 2025-10-17

## ⚠️ CRITICAL RULES

```
1. NIEMALS hardcoded Text in Frontend!
   ❌ <h1>Contact</h1>
   ✅ <h1>{t('contact.title')}</h1>

2. IMMER useTranslation Hook verwenden!
   const { t } = useTranslation()

3. Keys in MessageSource.java hinzufügen!
   Nicht direkt in .properties Files!

4. Beide Sprachen pflegen (DE + EN)!
```

---

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

### Frontend (v1.6.0+ - useTranslation Hook)

#### 1. Import useTranslation Hook
```typescript
import { useTranslation } from '@eckert-preisser/shared/hooks';
```

#### 2. Use in Component
```tsx
const MyComponent = () => {
  const { t, language, changeLanguage } = useTranslation();

  return (
    <div>
      <h1>{t('page.title')}</h1>
      <p>{t('page.description')}</p>
      <button>{t('button.submit')}</button>
    </div>
  );
};
```

#### 3. CRITICAL: NEVER Hardcode Text!
```tsx
// ❌ WRONG - NEVER DO THIS!
<h1>Welcome</h1>
<button>Submit</button>
<p>Contact us at info@example.com</p>

// ✅ CORRECT - ALWAYS DO THIS!
const { t } = useTranslation();
<h1>{t('welcome.title')}</h1>
<button>{t('button.submit')}</button>
<p>{t('contact.email.info')}</p>
```

#### 4. Switch Language
```tsx
const { changeLanguage } = useTranslation();

// In a button
<button onClick={() => changeLanguage('en')}>
  English
</button>

<button onClick={() => changeLanguage('de')}>
  Deutsch
</button>
```

---

## Adding New Translations (v1.1.0+)

### 1. Add to MessageSource.java (Backend)

**Wichtig**: Editiere `backend/shared/common-utils/.../MessageSource.java`

```java
// In createMessageFile("de") Methode
if ("de".equals(language)) {
    messages.setProperty("product.added", "Produkt hinzugefügt");
    messages.setProperty("product.updated", "Produkt aktualisiert");
    messages.setProperty("product.deleted", "Produkt gelöscht");
}

// In createMessageFile("en") Methode
else if ("en".equals(language)) {
    messages.setProperty("product.added", "Product added");
    messages.setProperty("product.updated", "Product updated");
    messages.setProperty("product.deleted", "Product deleted");
}
```

### 2. Rebuild Config Server

**Properties Files werden automatisch generiert!**

```bash
cd backend
docker-compose build config-server
docker-compose up -d config-server
```

### 3. Use in Code

**Backend**:
```java
String message = MessageSource.getMessage("product.added", language);
```

**Frontend**:
```tsx
const { t } = useTranslation();
<p>{t('product.added')}</p>
```

**Frontend lädt Keys automatisch vom Backend!**

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

### Frontend Component (v1.6.0+ with useTranslation)
```tsx
import { useTranslation } from '@eckert-preisser/shared/hooks';
import { useState } from 'react';

const UserForm = () => {
  const { t, language } = useTranslation();  // ← IMMER useTranslation Hook!
  const [formData, setFormData] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/users', { ...formData, language });
      // ✅ RICHTIG: t() für Notifications
      toast.success(t('user.created'));
    } catch (error) {
      // ✅ RICHTIG: t() für Fehler
      toast.error(t('error.something.went.wrong'));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* ✅ RICHTIG: t() für ALLE Texte */}
      <h2>{t('user.create')}</h2>

      <label>{t('form.email')}</label>
      <input type="email" placeholder={t('form.email.placeholder')} />

      <label>{t('form.password')}</label>
      <input type="password" placeholder={t('form.password.placeholder')} />

      <button>{t('button.save')}</button>
    </form>
  );
};
```

**WICHTIG**: Auch Placeholders, Alt-Texte, Tooltips mit t() Keys!

---

## DO's ✅

- **Frontend**: IMMER useTranslation Hook verwenden
- **Frontend**: ALLE Texte mit t() - auch Placeholders!
- **Backend**: MessageSource für alle user-facing Strings
- Add translations in BOTH DE and EN
- Use same key in both files
- Use descriptive keys (contact.form.name not cfn)
- Edit MessageSource.java, nicht .properties direkt!
- Rebuild Config Server nach Änderungen

## DON'Ts ❌

- ❌ **NIEMALS hardcoded Text im Frontend!**
- ❌ **NIEMALS Strings wie "Submit", "Contact", "Send"!**
- ❌ Don't forget English translation
- ❌ Don't use vague keys
- ❌ Don't skip i18n for ANY user-facing text
- ❌ Don't edit .properties files directly
- ❌ Don't forget to rebuild Config Server

---

## Need More Help?

- Full Documentation: CONFIG_SYSTEM.md
- Backend i18n: MessageSource.java
- Frontend i18n: shared/utils/i18n.ts
