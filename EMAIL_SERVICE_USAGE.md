# Email Service - Usage Guide

**Version:** 3.2.0
**Type:** Generic SMTP Utility (like Config Server!)
**Author:** Moritz F. Becker - Helped by Claude AI

---

## 🎯 Philosophy

Email Service is a **Pure Generic SMTP Utility** - EXACTLY like Config Server!

**NO Business Logic:**
- ❌ NO sendWelcomeEmail()
- ❌ NO sendVerificationEmail()
- ❌ NO Templates
- ❌ NO Welcome/Reset/Verification

**Just:**
- ✅ sendEmail(to, subject, body)
- ✅ DONE!

**Business Logic belongs in YOUR service!**

---

## 🏗️ Architecture

```
Email Service (Port 8084) - Generic SMTP Utility
├── EmailController
│   └── POST /api/email/send
├── EmailService (JavaMailSender + SMTP)
└── ConfigClient (loads SMTP settings)

EmailClient (Shared Library)
├── sendEmail(to, subject, body)
└── sendEmail(to, subject, body, html)

Frontend Email Utility
├── email.send(to, subject, body)
└── email.sendHtml(to, subject, body)
```

**Exactly like Config Server!**

---

## 🔧 Backend Usage

### 1. Add Dependency

```xml
<!-- In your service pom.xml -->
<dependency>
    <groupId>com.eckertpreisser</groupId>
    <artifactId>email-client</artifactId>
</dependency>
```

### 2. Inject EmailClient

```java
@Service
@RequiredArgsConstructor
public class YourService {

    private final EmailClient emailClient;
    private final ConfigClient configClient; // For templates!
}
```

### 3. Generic Email (Simple!)

```java
// Plain text
emailClient.sendEmail(
    "user@example.com",
    "Your Order Confirmation",
    "Your order #123 has been confirmed!"
);

// HTML email
emailClient.sendEmail(
    "user@example.com",
    "Your Order Confirmation",
    "<h1>Order Confirmed!</h1><p>Order #123</p>",
    true  // HTML flag
);
```

**DONE!** So einfach!

---

### 4. Templated Emails (YOUR Business Logic!)

**Load template from Config Server, THEN send:**

```java
@Service
@RequiredArgsConstructor
public class AuthService {

    private final EmailClient emailClient;
    private final ConfigClient configClient;

    public void sendWelcomeEmail(User user) {
        // 1. Load template from Config Server
        ServiceConfig config = configClient.load("email", user.getLanguage());

        String subject = config.get("email.welcome.subject", "Welcome to Eckert Preisser!");
        String body = config.get("email.welcome.body", "Hello {name}, thank you for joining us!");

        // 2. Replace variables (YOUR logic!)
        body = body.replace("{name}", user.getFirstName());
        body = body.replace("{email}", user.getEmail());

        // 3. Send via EmailClient (generic!)
        emailClient.sendEmail(user.getEmail(), subject, body);
    }

    public void sendVerificationEmail(User user, String token) {
        // 1. Load template
        ServiceConfig config = configClient.load("email", user.getLanguage());

        String subject = config.get("email.verification.subject", "Verify your email");
        String body = config.get("email.verification.body", "Click here: {link}");

        // 2. Build verification link (YOUR logic!)
        ServiceConfig appConfig = configClient.loadApp("auth");
        String frontendUrl = appConfig.get("frontend.url", "http://localhost:3000");
        String link = frontendUrl + "/verify-email?token=" + token;

        body = body.replace("{link}", link);
        body = body.replace("{name}", user.getFirstName());

        // 3. Send via EmailClient (generic!)
        emailClient.sendEmail(user.getEmail(), subject, body);
    }
}
```

**Benefits:**
- ✅ EmailClient stays pure and simple
- ✅ Business logic in YOUR service
- ✅ Easy to customize per service
- ✅ Templates from Config Server (multi-language!)

---

## 💻 Frontend Usage

### 1. Import Email Utility

```typescript
import { email } from '@eckert-preisser/shared/utils'
```

### 2. Simple Email

```typescript
// Plain text
const result = await email.send(
  'info@eckertpreisser.de',
  'Contact Form: Question',
  'From: John (john@example.com)\n\nMessage: Hello!'
)

if (result.success) {
  console.log('Email sent!')
}

// HTML email
const result = await email.sendHtml(
  'info@eckertpreisser.de',
  'Contact Form: Question',
  '<h1>From: John</h1><p>Hello!</p>'
)
```

**DONE!** So einfach!

---

### 3. Templated Emails (YOUR Business Logic!)

**Load template from useConfig, THEN send:**

```typescript
import { email } from '@eckert-preisser/shared/utils'
import { useConfig, useTranslation } from '@eckert-preisser/shared/hooks'

const ContactForm = () => {
  const { language } = useTranslation()
  const config = useConfig('contact', language)

  const handleSubmit = async (formData) => {
    // 1. Load template from Config Server (multi-language!)
    const subject = config.get('contact.email.subject', 'New Contact Form Submission')
    const bodyTemplate = config.get('contact.email.body',
      'From: {name} ({email})\n\nSubject: {subject}\n\nMessage:\n{message}'
    )

    // 2. Replace variables (YOUR logic!)
    const body = bodyTemplate
      .replace('{name}', formData.name)
      .replace('{email}', formData.email)
      .replace('{subject}', formData.subject)
      .replace('{message}', formData.message)

    // 3. Send via email utility (generic!)
    const result = await email.send('info@eckertpreisser.de', subject, body)

    if (result.success) {
      alert('Message sent!')
    }
  }
}
```

---

## 📊 Complete Examples

### Example 1: Contact Form (Current)

**Contact.tsx:**
```typescript
const result = await email.send(
  'info@eckertpreisser.de',
  `Contact Form: ${formData.subject}`,
  `From: ${formData.name} (${formData.email})\n\nMessage:\n${formData.message}`
)
```

**Super simpel!** ✅

---

### Example 2: Auth Service - Welcome Email

**AuthService.java:**
```java
@Service
@RequiredArgsConstructor
public class AuthService {

    private final EmailClient emailClient;
    private final ConfigClient configClient;

    public void register(RegisterRequest request) {
        // Create user...
        User user = userService.createUser(request);

        // Load welcome email template
        ServiceConfig config = configClient.load("email", user.getLanguage());
        String subject = config.get("email.welcome.subject", "Welcome to Eckert Preisser!");
        String body = config.get("email.welcome.body", "Hello {name}!");

        // Replace variables
        body = body.replace("{name}", user.getFirstName());

        // Send email - GENERIC!
        emailClient.sendEmail(user.getEmail(), subject, body);
    }
}
```

**Config Server auto-creates:**
```properties
# config/i18n/de/email.properties
email.welcome.subject=Willkommen bei Eckert Preisser!
email.welcome.body=Hallo {name}, vielen Dank für deine Registrierung!
```

---

### Example 3: Order Service - Order Confirmation

**OrderService.java:**
```java
@Service
@RequiredArgsConstructor
public class OrderService {

    private final EmailClient emailClient;
    private final ConfigClient configClient;

    public void confirmOrder(Order order) {
        // Save order...

        // Load template
        ServiceConfig config = configClient.load("email", order.getUser().getLanguage());
        String subject = config.get("email.order.subject", "Order #{id} confirmed");
        String body = config.get("email.order.body", "Your order #{id} for {amount} has been confirmed!");

        // Replace variables
        subject = subject.replace("{id}", order.getId().toString());
        body = body.replace("{id}", order.getId().toString());
        body = body.replace("{amount}", order.getTotalAmount().toString());

        // Send
        emailClient.sendEmail(order.getUser().getEmail(), subject, body);
    }
}
```

---

## 🔑 Key Principles

### ✅ DO's

1. **Use EmailClient/email utility for sending ONLY**
   ```java
   emailClient.sendEmail(to, subject, body);
   ```

2. **Load templates from ConfigClient/useConfig**
   ```java
   ServiceConfig config = configClient.load("email", language);
   String template = config.get("email.welcome.body", "Hello!");
   ```

3. **Replace variables in YOUR service**
   ```java
   body = body.replace("{name}", user.getName());
   ```

4. **Keep EmailClient/email pure and simple**

### ❌ DON'Ts

1. **Don't add business logic to EmailClient**
   ```java
   // ❌ WRONG - belongs in auth-service!
   emailClient.sendWelcomeEmail(user);
   ```

2. **Don't hardcode templates in EmailClient**
   ```java
   // ❌ WRONG - use Config Server!
   String body = "Welcome " + name;
   ```

3. **Don't add convenience methods**
   ```java
   // ❌ WRONG - this is business logic!
   emailClient.sendPasswordResetEmail(user, token);
   ```

---

## 📋 Comparison with Config Server

| Feature | Config Server | Email Service |
|---------|--------------|---------------|
| **Purpose** | Load configs | Send emails |
| **Generic?** | ✅ YES | ✅ YES |
| **Business Logic?** | ❌ NO | ❌ NO |
| **Client Library** | ConfigClient | EmailClient |
| **Frontend Utility** | useConfig Hook | email utility |
| **Usage** | config.get(key, default) | email.send(to, subject, body) |
| **Templates?** | Stores them | Sends them |

**Perfect symmetry!** 🎯

---

## 🚀 Complete Flow Example

### Backend - Auth Service Registration

```java
@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserService userService;
    private final EmailClient emailClient;
    private final ConfigClient configClient;

    public void register(RegisterRequest request) {
        // 1. Create user (YOUR business logic)
        User user = userService.createUser(request);

        // 2. Generate token (YOUR business logic)
        String token = UUID.randomUUID().toString();
        user.setVerificationToken(token);

        // 3. Load email template (Config Server)
        ServiceConfig emailConfig = configClient.load("email", request.getLanguage());
        String subject = emailConfig.get("email.verification.subject", "Verify your email");
        String bodyTemplate = emailConfig.get("email.verification.body", "Click: {link}");

        // 4. Build verification link (YOUR business logic)
        ServiceConfig appConfig = configClient.loadApp("auth");
        String frontendUrl = appConfig.get("frontend.url", "http://localhost:3000");
        String link = frontendUrl + "/verify-email?token=" + token;

        // 5. Replace variables (YOUR business logic)
        String body = bodyTemplate
            .replace("{name}", user.getFirstName())
            .replace("{link}", link);

        // 6. Send email (Generic utility!)
        emailClient.sendEmail(user.getEmail(), subject, body);
    }
}
```

---

## 📚 Summary

**Email Service = Pure SMTP Utility**
- Just like Config Server is a pure Config Utility
- NO business logic
- NO templates
- NO convenience methods

**Your Service = Business Logic**
- Load templates from Config Server
- Replace variables
- Call EmailClient.sendEmail()

**Clean Architecture!** 🎉

---

**Last Updated:** 2025-10-30
**Version:** 3.2.0
