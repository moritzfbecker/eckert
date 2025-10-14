# Error Code Documentation

## Error Code Convention

### Pattern
```
{SERVICE}_{TYPE}_{HTTP_CODE}_{NUMBER}
```

**Components:**
- `SERVICE`: Microservice name (USER, PRODUCT, ORDER, NOTIFICATION, etc.)
- `TYPE`: Error type (ERR, INFO, WARN)
- `HTTP_CODE`: HTTP status code equivalent (400, 404, 500, etc.) or category (BUS for business)
- `NUMBER`: Sequential number (001, 002, 003, etc.)

### Examples
- `USER_ERR_404_001` - User not found
- `PRODUCT_ERR_400_001` - Invalid product data
- `ORDER_ERR_BUS_001` - Insufficient stock
- `SYS_ERR_500` - Internal server error

---

## Backend Error Codes

### System Errors (SYS)

| Code | Description | HTTP Status | Solution |
|------|-------------|-------------|----------|
| SYS_ERR_500 | Internal server error | 500 | Contact system administrator |
| SYS_ERR_503 | Service unavailable | 503 | Retry after some time |

### Validation Errors (VALIDATION)

| Code | Description | HTTP Status | Solution |
|------|-------------|-------------|----------|
| VALIDATION_ERR_001 | General validation error | 400 | Check request body |
| VALIDATION_ERR_002 | Missing required field | 400 | Provide all required fields |
| VALIDATION_ERR_003 | Invalid format | 400 | Check field format |

### User Service (USER)

#### Success Codes
| Code | Description | Log Level |
|------|-------------|-----------|
| USER_001 | User created successfully | INFO |
| USER_002 | User updated successfully | INFO |
| USER_003 | User deleted successfully | INFO |
| USER_004 | User authenticated successfully | INFO |

#### Error Codes
| Code | Description | HTTP Status | Solution |
|------|-------------|-------------|----------|
| USER_ERR_404_001 | User not found | 404 | Check user ID |
| USER_ERR_400_001 | Invalid email format | 400 | Provide valid email |
| USER_ERR_400_002 | Password too weak | 400 | Use stronger password |
| USER_ERR_409_001 | Email already exists | 409 | Use different email |
| USER_ERR_401_001 | Invalid credentials | 401 | Check email and password |
| USER_ERR_403_001 | Insufficient permissions | 403 | Contact administrator |
| USER_ERR_BUS_001 | User account locked | 422 | Contact support |
| USER_ERR_BUS_002 | Email verification required | 422 | Check your email |

### Product Service (PRODUCT)

#### Success Codes
| Code | Description | Log Level |
|------|-------------|-----------|
| PRODUCT_001 | Product created successfully | INFO |
| PRODUCT_002 | Product updated successfully | INFO |
| PRODUCT_003 | Product deleted successfully | INFO |

#### Error Codes
| Code | Description | HTTP Status | Solution |
|------|-------------|-------------|----------|
| PRODUCT_ERR_404_001 | Product not found | 404 | Check product ID |
| PRODUCT_ERR_400_001 | Invalid price | 400 | Price must be positive |
| PRODUCT_ERR_400_002 | Invalid SKU format | 400 | Check SKU format |
| PRODUCT_ERR_409_001 | SKU already exists | 409 | Use unique SKU |
| PRODUCT_ERR_BUS_001 | Product out of stock | 422 | Restock required |
| PRODUCT_ERR_BUS_002 | Product discontinued | 422 | Product no longer available |

### Order Service (ORDER)

#### Success Codes
| Code | Description | Log Level |
|------|-------------|-----------|
| ORDER_001 | Order created successfully | INFO |
| ORDER_002 | Order updated successfully | INFO |
| ORDER_003 | Order cancelled successfully | INFO |
| ORDER_004 | Order shipped successfully | INFO |

#### Error Codes
| Code | Description | HTTP Status | Solution |
|------|-------------|-------------|----------|
| ORDER_ERR_404_001 | Order not found | 404 | Check order ID |
| ORDER_ERR_400_001 | Invalid order data | 400 | Check order details |
| ORDER_ERR_BUS_001 | Insufficient stock | 422 | Reduce quantity |
| ORDER_ERR_BUS_002 | Payment failed | 422 | Check payment details |
| ORDER_ERR_BUS_003 | Order already shipped | 422 | Cannot modify shipped order |
| ORDER_ERR_BUS_004 | Invalid shipping address | 422 | Update shipping address |

### Notification Service (NOTIFICATION)

#### Success Codes
| Code | Description | Log Level |
|------|-------------|-----------|
| NOTIFICATION_001 | Email sent successfully | INFO |
| NOTIFICATION_002 | SMS sent successfully | INFO |
| NOTIFICATION_003 | Push notification sent | INFO |

#### Error Codes
| Code | Description | HTTP Status | Solution |
|------|-------------|-------------|----------|
| NOTIFICATION_ERR_400_001 | Invalid email address | 400 | Check email format |
| NOTIFICATION_ERR_400_002 | Invalid phone number | 400 | Check phone format |
| NOTIFICATION_ERR_BUS_001 | Email service unavailable | 422 | Retry later |
| NOTIFICATION_ERR_BUS_002 | SMS quota exceeded | 422 | Contact administrator |

---

## Frontend Error Codes

### Global Errors (GLOBAL)

| Code | Description | Action |
|------|-------------|--------|
| GLOBAL_ERR_001 | Uncaught JavaScript error | Report to developers |
| GLOBAL_ERR_002 | Unhandled promise rejection | Report to developers |
| GLOBAL_ERR_003 | Network error | Check internet connection |

### API Errors (API)

| Code | Description | Action |
|------|-------------|--------|
| API_ERR_UNKNOWN | Unknown API error | Retry or contact support |
| API_ERR_NETWORK | Network connection failed | Check internet |
| API_ERR_TIMEOUT | Request timeout | Retry request |
| API_ERR_UNAUTHORIZED | Not authenticated | Login again |
| API_ERR_FORBIDDEN | Access denied | Contact administrator |

### Validation Errors (VALIDATION)

| Code | Description | Action |
|------|-------------|--------|
| VALIDATION_ERR_001 | Form validation failed | Check highlighted fields |
| VALIDATION_ERR_002 | Required field missing | Fill all required fields |
| VALIDATION_ERR_003 | Invalid email format | Enter valid email |
| VALIDATION_ERR_004 | Password too short | Use longer password |

### Application Errors (APP)

| Code | Description | Action |
|------|-------------|--------|
| APP_ERR_UNKNOWN | Unknown application error | Refresh page |
| APP_ERR_STATE | Invalid application state | Refresh page |
| APP_ERR_STORAGE | LocalStorage error | Clear browser data |
| APP_ERR_RENDER | Component render error | Report to developers |

### Feature-Specific Errors

#### Authentication (AUTH)
| Code | Description | Action |
|------|-------------|--------|
| AUTH_ERR_001 | Login failed | Check credentials |
| AUTH_ERR_002 | Session expired | Login again |
| AUTH_ERR_003 | Token invalid | Login again |

#### User Management (USER_FE)
| Code | Description | Action |
|------|-------------|--------|
| USER_FE_ERR_001 | Failed to load user data | Refresh page |
| USER_FE_ERR_002 | Failed to update profile | Retry |
| USER_FE_ERR_003 | Avatar upload failed | Check file size |

#### Product Management (PRODUCT_FE)
| Code | Description | Action |
|------|-------------|--------|
| PRODUCT_FE_ERR_001 | Failed to load products | Refresh page |
| PRODUCT_FE_ERR_002 | Failed to add to cart | Retry |
| PRODUCT_FE_ERR_003 | Invalid product quantity | Enter valid quantity |

---

## Adding New Error Codes

### Backend

1. **Update this documentation** with new error code
2. **Create/Update exception class** in `common-models/exception/`
3. **Use in code:**
```java
throw new NotFoundException("USER_ERR_404_001", "User not found");
```

4. **Log the error:**
```java
LoggerUtil.error(logger, "USER_ERR_404_001", "User not found", Map.of("userId", id));
```

### Frontend

1. **Update this documentation** with new error code
2. **Use in code:**
```typescript
logger.error('USER_FE_ERR_001', 'Failed to load user data', error, { userId });
```

3. **Throw custom error:**
```typescript
throw new ApiError('API_ERR_TIMEOUT', 'Request timeout', 408);
```

---

## Error Code Ranges

### Reserved Ranges

- **001-099**: General/Common errors
- **100-199**: Authentication/Authorization errors
- **200-299**: Validation errors
- **300-399**: Business logic errors
- **400-499**: Data access errors
- **500-599**: Integration errors
- **600-699**: Configuration errors
- **700-799**: Performance/Resource errors
- **800-899**: Security errors
- **900-999**: Custom service-specific errors

---

## Best Practices

### DO's ✅
- Use descriptive error codes
- Include context in logs
- Keep error messages user-friendly
- Document all error codes
- Use appropriate HTTP status codes
- Log errors with proper severity

### DON'Ts ❌
- Don't expose internal details to users
- Don't use generic error codes for specific errors
- Don't forget to log errors
- Don't use same error code for different errors
- Don't skip error handling
- Don't ignore promise rejections

---

## Monitoring

### Error Metrics to Track

1. **Error Rate**: Errors per minute/hour
2. **Error Types**: Distribution of error codes
3. **Affected Users**: Number of users experiencing errors
4. **Response Times**: When errors occur
5. **Error Trends**: Patterns over time

### Alert Thresholds

- **Critical (P1)**: System errors (5xx), >10% error rate
- **High (P2)**: Business errors, >5% error rate
- **Medium (P3)**: Validation errors, >2% error rate
- **Low (P4)**: Info/Debug logs

---

**Last Updated**: 2025-10-14
**Version**: 1.0.0
