# Quick Start: Logging & Error Handling

## 5-Minute Guide

### Backend

#### 1. Import Logger
```java
import com.eckertpreisser.common.utils.LoggerUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

private static final Logger logger = LoggerFactory.getLogger(YourClass.class);
```

#### 2. Log Messages
```java
// Success
LoggerUtil.info(logger, "USER_001", "User created", Map.of("userId", 123));

// Error
LoggerUtil.error(logger, "USER_ERR_404", "User not found", exception,
    Map.of("userId", userId));
```

#### 3. Throw Exceptions
```java
throw new NotFoundException("USER_ERR_404_001", "User not found");
throw new ValidationException("USER_ERR_400_001", "Invalid email");
throw new BusinessException("USER_ERR_BUS_001", "Account locked");
```

### Frontend

#### 1. Import Logger
```typescript
import { logger } from '@eckert-preisser/shared/utils';
```

#### 2. Log Messages
```typescript
// Success
logger.info('USER_001', 'User logged in', { userId: 123 });

// Error
logger.error('USER_ERR_001', 'Login failed', error, { email });
```

#### 3. Handle Errors
```typescript
import { errorHandler } from '@eckert-preisser/shared/utils';

try {
  await api.get('/users/123');
} catch (error) {
  const apiError = errorHandler.handleApiError(error, '/users/123');
  toast.error(apiError.userMessage);
}
```

---

## Common Error Codes

### Backend
- `{SERVICE}_001` - Success
- `{SERVICE}_ERR_404_001` - Not found
- `{SERVICE}_ERR_400_001` - Validation error
- `{SERVICE}_ERR_BUS_001` - Business error
- `SYS_ERR_500` - System error

### Frontend
- `{FEATURE}_001` - Success
- `API_ERR_UNKNOWN` - API error
- `VALIDATION_ERR_001` - Form validation
- `APP_ERR_UNKNOWN` - Generic error

---

## Quick Reference

### Log Levels

| Level | Use Case | Example |
|-------|----------|---------|
| DEBUG | Development debugging | `LoggerUtil.debug(...)` |
| INFO  | Normal operations | `LoggerUtil.info(...)` |
| WARN  | Potential issues | `LoggerUtil.warn(...)` |
| ERROR | Errors & exceptions | `LoggerUtil.error(...)` |

### DO's ✅
- Use error codes for all logs
- Include context (userId, email, etc.)
- Log before throwing exceptions
- Use meaningful error messages

### DON'Ts ❌
- Don't use `console.log()` (frontend)
- Don't use `System.out.println()` (backend)
- Don't log sensitive data (passwords, tokens)
- Don't use generic error codes

---

## Examples

### Backend Example
```java
@Service
@RequiredArgsConstructor
public class UserService {
    private static final Logger logger = LoggerFactory.getLogger(UserService.class);
    private final UserRepository userRepository;

    public UserDTO getUserById(Long id) {
        LoggerUtil.info(logger, "USER_002", "Fetching user", Map.of("userId", id));

        User user = userRepository.findById(id)
            .orElseThrow(() -> {
                LoggerUtil.error(logger, "USER_ERR_404_001", "User not found",
                    Map.of("userId", id));
                return new NotFoundException("USER_ERR_404_001", "User not found");
            });

        LoggerUtil.info(logger, "USER_002", "User fetched successfully",
            Map.of("userId", id, "email", user.getEmail()));

        return convertToDTO(user);
    }
}
```

### Frontend Example
```typescript
const UserProfile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      logger.info('USER_FE_001', 'Fetching user profile', { userId: 123 });

      try {
        const response = await api.get('/users/123');
        setUser(response.data);
        logger.info('USER_FE_001', 'User profile loaded', { userId: 123 });
      } catch (error) {
        logger.error('USER_FE_ERR_001', 'Failed to load user', error,
          { userId: 123 });
        const apiError = errorHandler.handleApiError(error, '/users/123');
        toast.error(apiError.userMessage);
      }
    };

    fetchUser();
  }, []);

  return <div>{user ? <UserInfo user={user} /> : <Loading />}</div>;
};
```

---

## Need More Help?

- Full Documentation: ERROR_CODES.md
- Version Management: VERSION_MANAGEMENT.md
- Development Guidelines: DEVELOPMENT_GUIDELINES.md
