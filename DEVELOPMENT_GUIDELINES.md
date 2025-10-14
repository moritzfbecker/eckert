# Development Guidelines - Eckert Preisser Enterprise

## 📋 Inhaltsverzeichnis

- [Allgemeine Prinzipien](#allgemeine-prinzipien)
- [Backend Development](#backend-development)
- [Frontend Development](#frontend-development)
- [Code Review Process](#code-review-process)
- [Testing Guidelines](#testing-guidelines)
- [Deployment Process](#deployment-process)

## 🎯 Allgemeine Prinzipien

### 1. Clean Code
- **Lesbarkeit vor Cleverness**: Code sollte selbsterklärend sein
- **Single Responsibility**: Jede Klasse/Funktion hat genau eine Aufgabe
- **DRY (Don't Repeat Yourself)**: Vermeide Code-Duplikation
- **KISS (Keep It Simple, Stupid)**: Halte Lösungen einfach

### 2. Dokumentation
- Jede öffentliche API muss dokumentiert sein
- Komplexe Algorithmen benötigen Erklärungen
- README-Dateien für alle Module
- Inline-Kommentare nur für komplexe Logik

### 3. Version Control
- **Commit Messages**: Folge der Conventional Commits Spezifikation
- **Branch Strategy**: Feature Branches von `develop`
- **Pull Requests**: Mindestens ein Review vor Merge
- **Keine direkten Commits** auf `main` oder `develop`

## 🔧 Backend Development

### Project Structure

Jeder Microservice folgt dieser Struktur:

```
service-name/
├── src/main/java/com/eckertpreisser/{service}/
│   ├── controller/          # REST Controllers
│   ├── service/             # Business Logic
│   ├── repository/          # Data Access
│   ├── entity/              # JPA Entities
│   ├── dto/                 # Data Transfer Objects
│   ├── config/              # Configuration Classes
│   ├── exception/           # Custom Exceptions
│   └── {ServiceName}Application.java
├── src/main/resources/
│   ├── application.yml      # Configuration
│   └── application-{env}.yml
└── pom.xml
```

### Naming Conventions

#### Classes
```java
// Controllers
@RestController
@RequestMapping("/users")
public class UserController { }

// Services
@Service
public class UserService { }

// Repositories
@Repository
public interface UserRepository extends JpaRepository<User, Long> { }

// DTOs
public class UserDTO { }
public class CreateUserRequest { }
public class UpdateUserRequest { }

// Entities
@Entity
@Table(name = "users")
public class User { }
```

#### Methods
```java
// CRUD Operations
public UserDTO createUser(CreateUserRequest request)
public UserDTO getUserById(Long id)
public List<UserDTO> getAllUsers()
public UserDTO updateUser(Long id, UpdateUserRequest request)
public void deleteUser(Long id)

// Business Logic
public void sendWelcomeEmail(User user)
public boolean isUserActive(Long userId)
```

### Best Practices

#### 1. Controller Layer
```java
@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/{id}")
    public ResponseEntity<UserDTO> getUserById(@PathVariable Long id) {
        return ResponseEntity.ok(userService.getUserById(id));
    }

    @PostMapping
    public ResponseEntity<UserDTO> createUser(
            @Valid @RequestBody CreateUserRequest request) {
        UserDTO user = userService.createUser(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(user);
    }
}
```

**Regeln:**
- Verwende `@RequiredArgsConstructor` statt `@Autowired`
- Validiere Input mit `@Valid`
- Verwende passende HTTP Status Codes
- Keine Business Logic im Controller
- Werfe keine checked Exceptions

#### 2. Service Layer
```java
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class UserService {

    private final UserRepository userRepository;

    public List<UserDTO> getAllUsers() {
        return userRepository.findAll()
            .stream()
            .map(this::convertToDTO)
            .collect(Collectors.toList());
    }

    @Transactional
    public UserDTO createUser(CreateUserRequest request) {
        // Validation
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new UserAlreadyExistsException(request.getEmail());
        }

        // Business Logic
        User user = User.builder()
            .email(request.getEmail())
            .firstName(request.getFirstName())
            .lastName(request.getLastName())
            .build();

        User savedUser = userRepository.save(user);
        return convertToDTO(savedUser);
    }

    private UserDTO convertToDTO(User user) {
        return UserDTO.builder()
            .id(user.getId())
            .email(user.getEmail())
            .firstName(user.getFirstName())
            .lastName(user.getLastName())
            .build();
    }
}
```

**Regeln:**
- Service-Klasse ist `@Transactional(readOnly = true)` by default
- Write-Operations haben explizit `@Transactional`
- Verwende Builder Pattern für Entity-Erstellung
- Entities nie direkt zurückgeben, immer DTOs
- Custom Exceptions für Business Errors

#### 3. Repository Layer
```java
@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);

    boolean existsByEmail(String email);

    @Query("SELECT u FROM User u WHERE u.active = true")
    List<User> findAllActiveUsers();
}
```

**Regeln:**
- Extend `JpaRepository`
- Verwende Method Name Conventions
- Custom Queries mit `@Query` wenn nötig
- Keine Business Logic im Repository

#### 4. Exception Handling
```java
@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<ApiResponse<?>> handleUserNotFound(
            UserNotFoundException ex) {
        return ResponseEntity
            .status(HttpStatus.NOT_FOUND)
            .body(ApiResponse.error(ex.getMessage(), "USER_NOT_FOUND"));
    }

    @ExceptionHandler(ValidationException.class)
    public ResponseEntity<ApiResponse<?>> handleValidation(
            ValidationException ex) {
        return ResponseEntity
            .status(HttpStatus.BAD_REQUEST)
            .body(ApiResponse.error(ex.getMessage(), "VALIDATION_ERROR"));
    }
}
```

### Configuration

#### application.yml Structure
```yaml
server:
  port: ${PORT:8081}

spring:
  application:
    name: user-service
  datasource:
    url: ${DB_URL:jdbc:postgresql://localhost:5432/userdb}
    username: ${DB_USER:postgres}
    password: ${DB_PASSWORD:postgres}
  jpa:
    hibernate:
      ddl-auto: ${DDL_AUTO:validate}
    show-sql: ${SHOW_SQL:false}

eureka:
  client:
    service-url:
      defaultZone: ${EUREKA_URL:http://localhost:8761/eureka/}

# Custom Properties
app:
  security:
    jwt:
      secret: ${JWT_SECRET}
      expiration: ${JWT_EXPIRATION:86400000}
```

**Regeln:**
- Alle Werte über Environment Variables konfigurierbar
- Default-Werte für lokale Entwicklung
- Secrets nie committed
- Profile für verschiedene Environments

## 💻 Frontend Development

### Project Structure

```
packages/
├── shell/                   # Main Application
│   ├── src/
│   │   ├── components/     # Shell-specific Components
│   │   ├── pages/          # Page Components
│   │   ├── App.tsx         # Main App Component
│   │   └── main.tsx        # Entry Point
│   ├── public/             # Static Assets
│   └── package.json
│
├── shared/                  # Shared Package
│   ├── ui-components/      # Reusable UI Components
│   ├── hooks/              # Custom Hooks
│   ├── utils/              # Utility Functions
│   ├── animations/         # Animation Configs
│   └── package.json
│
└── [micro-frontend]/        # Other Micro Frontends
```

### Component Guidelines

#### 1. Component Structure
```tsx
// Button.tsx
import React from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'gradient';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  loading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  className,
  children,
  loading = false,
  disabled,
  ...props
}) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={clsx(
        'font-medium rounded-lg transition-all',
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? <Spinner /> : children}
    </motion.button>
  );
};
```

**Regeln:**
- TypeScript für alle Components
- Props Interface exportieren
- Extend native HTML Props wenn möglich
- Default Props definieren
- Verwende `clsx` für conditional Classes
- Framer Motion für Animations

#### 2. Custom Hooks
```tsx
// useApi.ts
import { useState, useEffect } from 'react';
import { api } from '@eckert-preisser/shared/utils';

interface UseApiResult<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

export const useApi = <T,>(endpoint: string): UseApiResult<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await api.get<T>(endpoint);
      setData(response.data || null);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [endpoint]);

  return { data, loading, error, refetch: fetchData };
};
```

**Regeln:**
- Prefix mit `use`
- TypeScript Generics für Flexibilität
- Return Object statt Array (bessere Lesbarkeit)
- Cleanup in `useEffect` wenn nötig

#### 3. Pages
```tsx
// Home.tsx
import { motion } from 'framer-motion';
import { Button, Card } from '@eckert-preisser/shared/ui';
import { fadeInUp } from '@eckert-preisser/shared/animations';

const Home = () => {
  return (
    <div className="pt-20">
      <section className="container mx-auto px-6 py-20">
        <motion.h1
          initial={fadeInUp.initial}
          animate={fadeInUp.animate}
          transition={fadeInUp.transition}
          className="text-6xl font-bold mb-6"
        >
          Welcome to <span className="text-gradient">Eckert Preisser</span>
        </motion.h1>

        <Button variant="gradient" size="lg">
          Get Started
        </Button>
      </section>
    </div>
  );
};

export default Home;
```

**Regeln:**
- Page Components im `pages/` Ordner
- Verwende Shared Components
- Scroll Animations mit Framer Motion
- Responsive Design mit Tailwind
- SEO-friendly (Title, Meta-Tags)

### Styling Guidelines

#### Tailwind CSS
```tsx
// ✅ GOOD
<div className="flex items-center justify-between p-6 bg-black border border-gray-800 rounded-lg hover:border-gradient">

// ❌ BAD - Custom CSS vermeiden
<div style={{ display: 'flex', padding: '24px' }}>
```

**Custom Classes nur für:**
- Gradient Effects
- Complex Animations
- Wiederverwendbare Patterns

#### Theme Colors
```javascript
// tailwind.config.js
theme: {
  extend: {
    colors: {
      'apple-pink': '#ec4899',
      'apple-purple': '#a855f7',
      'apple-yellow': '#eab308',
    }
  }
}
```

### State Management

```tsx
// Simple State mit useState
const [count, setCount] = useState(0);

// Complex State mit useReducer
const [state, dispatch] = useReducer(reducer, initialState);

// Global State mit Context
const { user, setUser } = useContext(UserContext);
```

**Regeln:**
- `useState` für lokalen State
- `useReducer` für komplexen State
- Context für Global State
- Kein Redux (zu komplex für Micro Frontends)

## 📊 Logging & Error Handling

### Backend Logging

#### Using LoggerUtil

```java
import com.eckertpreisser.common.utils.LoggerUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
public class UserService {
    private static final Logger logger = LoggerFactory.getLogger(UserService.class);

    public UserDTO createUser(CreateUserRequest request) {
        // Info log with context
        LoggerUtil.info(logger, "USER_001", "Creating new user",
            Map.of("email", request.getEmail()));

        try {
            User user = userRepository.save(userEntity);

            LoggerUtil.info(logger, "USER_001", "User created successfully",
                Map.of("userId", user.getId(), "email", user.getEmail()));

            return convertToDTO(user);
        } catch (Exception e) {
            LoggerUtil.error(logger, "USER_ERR_500", "Failed to create user", e,
                Map.of("email", request.getEmail()));
            throw new BusinessException("USER_ERR_500", "Failed to create user", e);
        }
    }
}
```

#### Exception Handling

**Use custom exceptions with error codes:**

```java
// Not Found
throw new NotFoundException("USER_ERR_404_001", "User not found");

// Validation Error
throw new ValidationException("USER_ERR_400_001", "Invalid email format");

// Business Error
throw new BusinessException("USER_ERR_BUS_001", "User account locked");
```

**All exceptions are caught by GlobalExceptionHandler automatically.**

#### Logback Configuration

Log files are automatically created in `logs/` directory:
- `application.log` - All logs
- `error.log` - Error logs only
- `application.json` - JSON format for ELK Stack

**Log Levels:**
- `DEBUG`: Detailed information for debugging
- `INFO`: General information about application flow
- `WARN`: Warning messages
- `ERROR`: Error messages with exceptions

### Frontend Logging

#### Using Logger

```typescript
import { logger } from '@eckert-preisser/shared/utils';

// Info log
logger.info('USER_001', 'User logged in successfully', { userId: 123 });

// Error log
logger.error('USER_ERR_001', 'Failed to fetch user data', error, { userId: 123 });

// Warning log
logger.warn('USER_WARN_001', 'User session expiring soon', { expiresIn: 300 });

// Debug log
logger.debug('USER_DEBUG_001', 'Fetching user profile', { userId: 123 });
```

#### Error Handling

```typescript
import { errorHandler, ApiError } from '@eckert-preisser/shared/utils';

// Handle API errors
try {
  const response = await api.get('/users/123');
} catch (error) {
  const apiError = errorHandler.handleApiError(error, '/users/123');
  // Show error to user
  toast.error(apiError.userMessage);
}

// Handle validation errors
const errors = validateForm(formData);
if (Object.keys(errors).length > 0) {
  const validationError = errorHandler.handleValidationError(errors);
  // Show validation errors
}

// Throw custom errors
throw new ApiError('USER_ERR_404', 'User not found', 404);
```

#### View Stored Errors

```typescript
import { logger } from '@eckert-preisser/shared/utils';

// Get all stored errors (last 50)
const errors = logger.getStoredErrors();
console.log(errors);

// Clear stored errors
logger.clearStoredErrors();
```

### Error Code Guidelines

**See ERROR_CODES.md for complete reference.**

#### Error Code Format
```
{SERVICE}_{TYPE}_{HTTP_CODE}_{NUMBER}
```

#### Examples
- `USER_001` - Success: User created
- `USER_ERR_404_001` - Error: User not found
- `USER_ERR_400_001` - Error: Invalid email
- `USER_ERR_BUS_001` - Business Error: Account locked

#### Adding New Error Codes

1. Add to ERROR_CODES.md
2. Use in code with error code
3. Log with context

```java
// Backend
LoggerUtil.error(logger, "NEW_CODE_001", "Description", exception, context);
throw new BusinessException("NEW_CODE_001", "User message");
```

```typescript
// Frontend
logger.error('NEW_CODE_001', 'Description', error, context);
throw new ApiError('NEW_CODE_001', 'User message', 400);
```

---

## 🔄 Version Management

### EVERY CHANGE REQUIRES A VERSION BUMP!

See VERSION_MANAGEMENT.md for complete guide.

### Version Format: MAJOR.MINOR.PATCH

- **MAJOR**: Breaking changes
- **MINOR**: New features
- **PATCH**: Bug fixes

### When to Bump

**PATCH (x.x.1)**
- Bug fixes
- Performance improvements
- Documentation updates

**MINOR (x.1.0)**
- New features
- New endpoints
- New components

**MAJOR (1.x.x)**
- Breaking API changes
- Removed features
- Major architecture changes

### How to Bump

#### Backend
```bash
cd backend
mvn versions:set -DnewVersion=1.0.1
mvn versions:commit
```

#### Frontend
```bash
cd frontend
npm version patch  # or minor/major
```

### After Version Bump

**REQUIRED STEPS:**

1. Update CHANGELOG.md (backend or frontend specific)
2. Update root CHANGELOG.md
3. Commit changes
4. Tag release
5. Push with tags

```bash
git add .
git commit -m "chore: bump version to 1.0.1"
git tag backend-v1.0.1
git push --tags
```

### Changelog Entry Template

```markdown
## [1.0.1] - 2024-10-15

### Fixed
- Fixed user validation error [USER_ERR_400_001]
- Fixed button hover animation [FRONTEND_ERR_001]

**Author**: Your Name
**Type**: Bug Fix
```

### Version Tracking

Check current versions:
```bash
# Backend
cat backend/pom.xml | grep "<version>"

# Frontend
cat frontend/package.json | grep "version"
```

---

## 🔍 Code Review Process

### Pull Request Requirements

1. **Beschreibung:**
   - Was wurde geändert?
   - Warum wurde es geändert?
   - Wie wurde es getestet?

2. **Checklist:**
   ```markdown
   - [ ] Code folgt Style Guidelines
   - [ ] Tests wurden hinzugefügt/aktualisiert
   - [ ] Dokumentation wurde aktualisiert
   - [ ] Keine Console Logs im Code (verwende Logger stattdessen)
   - [ ] Build läuft ohne Errors/Warnings
   - [ ] Error Codes dokumentiert in ERROR_CODES.md
   - [ ] Version wurde erhöht
   - [ ] CHANGELOG.md wurde aktualisiert
   - [ ] Logging mit korrekten Error Codes implementiert
   ```

3. **Review Kriterien:**
   - Code Qualität
   - Performance
   - Security
   - Test Coverage
   - Documentation

### Review Comments

```
✅ Approval: "LGTM" (Looks Good To Me)
💭 Comment: "Könnte man hier nicht X verwenden?"
🔄 Change Request: "Bitte Y anpassen"
❓ Question: "Warum wurde Z so gelöst?"
```

## 🧪 Testing Guidelines

### Backend Testing

```java
@SpringBootTest
@AutoConfigureMockMvc
class UserControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private UserService userService;

    @Test
    void shouldCreateUser() throws Exception {
        // Given
        CreateUserRequest request = CreateUserRequest.builder()
            .email("test@example.com")
            .firstName("John")
            .lastName("Doe")
            .build();

        UserDTO expected = UserDTO.builder()
            .id(1L)
            .email(request.getEmail())
            .build();

        when(userService.createUser(any())).thenReturn(expected);

        // When & Then
        mockMvc.perform(post("/users")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
            .andExpect(status().isCreated())
            .andExpect(jsonPath("$.id").value(1))
            .andExpect(jsonPath("$.email").value("test@example.com"));
    }
}
```

### Frontend Testing

```tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('should render children', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('should call onClick handler', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);

    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

## 🚀 Deployment Process

### Development
```bash
git checkout develop
git pull origin develop
```

### Staging
```bash
git checkout staging
git merge develop
git push origin staging
```

### Production
```bash
git checkout main
git merge staging
git tag v1.0.0
git push origin main --tags
```

---

**Diese Guidelines sind ein Living Document und werden kontinuierlich aktualisiert.**
