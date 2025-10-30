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

### API Endpoints (BACKEND_API)

| Code | Description | HTTP Status | Solution |
|------|-------------|-------------|----------|
| BACKEND_API_001 | I18nController created for frontend translations | 200 | Success |

### Internationalization Backend (BACKEND_I18N)

| Code | Description | Type |
|------|-------------|------|
| BACKEND_I18N_001 | Extended MessageSource with frontend translations | Success |
| BACKEND_I18N_002 | MessageSource contains 60+ translation keys | Success |

### Config Server (CONFIG_SERVER)

#### Success Codes
| Code | Description | Log Level |
|------|-------------|-----------|
| CONFIG_SERVER_001 | Starting Config Server initialization | INFO |
| CONFIG_SERVER_002 | Config Server initialized successfully | INFO |
| CONFIG_SERVER_003 | Created config directory | INFO |
| CONFIG_SERVER_004 | Config directory already exists | INFO |
| CONFIG_SERVER_005 | Shared application config already exists, skipping | INFO |
| CONFIG_SERVER_006 | Created shared application config | INFO |
| CONFIG_SERVER_007 | Created database config | INFO |
| CONFIG_SERVER_008 | Created mail config | INFO |
| CONFIG_SERVER_009 | Created language config | INFO |
| CONFIG_SERVER_010 | Created API Gateway config | INFO |
| CONFIG_SERVER_011 | Service config already exists | INFO |
| CONFIG_SERVER_012 | Created service-specific config | INFO |
| CONFIG_SERVER_INIT_001 | Initializing Config Server | INFO |
| CONFIG_SERVER_INIT_002 | Config Server initialization completed successfully | INFO |
| CONFIG_SERVER_NATIVE_001 | Native File System backend configured | INFO |

#### Error Codes
| Code | Description | HTTP Status | Solution |
|------|-------------|-------------|----------|
| CONFIG_SERVER_ERR_001 | Failed to initialize Config Server | 500 | Check logs and config directory permissions |
| CONFIG_SERVER_ERR_INIT_001 | Failed to initialize Config Server | 500 | Check config directory and YAML syntax |

#### Warning Codes
| Code | Description | Action |
|------|-------------|--------|
| CONFIG_SERVER_WARN_001 | Config file not found | File will be created with defaults |

### Config Client v2.0 (CONFIG_CLIENT)

#### Success Codes
| Code | Description | Log Level |
|------|-------------|-----------|
| CONFIG_CLIENT_001 | Config loaded from cache | INFO |
| CONFIG_CLIENT_002 | Config loaded from server | INFO |
| CONFIG_CLIENT_003 | Cache cleared | INFO |

#### Warning Codes
| Code | Description | Action |
|------|-------------|--------|
| CONFIG_CLIENT_WARN_001 | Config Server unavailable, using defaults | Check Config Server connection |

### Config Service (CONFIG_SRV)

#### Success Codes
| Code | Description | Log Level |
|------|-------------|-----------|
| CONFIG_SRV_001 | Config loaded from cache | INFO |
| CONFIG_SRV_002 | Config loaded from file | INFO |
| CONFIG_SRV_003 | Config not modified, skipping save | INFO |
| CONFIG_SRV_004 | Config saved successfully | INFO |
| CONFIG_SRV_005 | Created new config with defaults | INFO |
| CONFIG_SRV_006 | Merged new defaults into existing config | INFO |
| CONFIG_SRV_007 | Config key updated | INFO |
| CONFIG_SRV_008 | Config key deleted | INFO |
| CONFIG_SRV_009 | Config deleted | INFO |
| CONFIG_SRV_010 | Cache cleared | INFO |

### Config Repository (CONFIG_REPO)

#### Success Codes
| Code | Description | Log Level |
|------|-------------|-----------|
| CONFIG_REPO_001 | Config file does not exist yet | INFO |
| CONFIG_REPO_002 | Config saved successfully | INFO |
| CONFIG_REPO_003 | Config deleted | INFO |

#### Error Codes
| Code | Description | HTTP Status | Solution |
|------|-------------|-------------|----------|
| CONFIG_REPO_ERR_001 | Failed to load config | 500 | Check file permissions and syntax |
| CONFIG_REPO_ERR_002 | Failed to save config | 500 | Check directory permissions |
| CONFIG_REPO_ERR_003 | Failed to list categories | 500 | Check directory exists |
| CONFIG_REPO_ERR_004 | Failed to delete config | 500 | Check file permissions |

### Config API (CONFIG_API)

#### Success Codes
| Code | Description | Log Level |
|------|-------------|-----------|
| CONFIG_API_001 | I18n config requested | INFO |
| CONFIG_API_002 | I18n config read request | INFO |
| CONFIG_API_003 | I18n key update request | INFO |
| CONFIG_API_004 | I18n key delete request | INFO |
| CONFIG_API_005 | I18n config delete request | INFO |
| CONFIG_API_006 | List i18n categories request | INFO |
| CONFIG_API_007 | App config requested | INFO |
| CONFIG_API_008 | App config read request | INFO |
| CONFIG_API_009 | App config key update request | INFO |
| CONFIG_API_010 | App config delete request | INFO |
| CONFIG_API_011 | List app categories request | INFO |
| CONFIG_API_012 | Cache clear request | INFO |

### Config Hook - Frontend (CONFIG_HOOK)

#### Success Codes
| Code | Description | Log Level |
|------|-------------|-----------|
| CONFIG_HOOK_001 | Config loaded successfully | INFO |
| CONFIG_HOOK_002 | Config cache cleared | INFO |

#### Error Codes
| Code | Description | Action |
|------|-------------|--------|
| CONFIG_HOOK_ERR_001 | Failed to load config | Check backend connection |

#### Warning Codes
| Code | Description | Action |
|------|-------------|--------|
| CONFIG_HOOK_WARN_001 | Config error - using defaults | Check error logs |

### API Gateway Startup (GATEWAY_STARTUP)

| Code | Description | Type |
|------|-------------|------|
| GATEWAY_STARTUP_001 | API Gateway starting - Configs from Config Server | INFO |
| GATEWAY_STARTUP_002 | i18n system initialized | INFO |
| GATEWAY_STARTUP_003 | API Gateway startup complete | INFO |
| GATEWAY_STARTUP_ERR_001 | Failed to initialize API Gateway | ERROR |

### Gateway Refactoring (GATEWAY_REFACTOR)

| Code | Description | Type |
|------|-------------|------|
| GATEWAY_REFACTOR_001 | Removed local ConfigManager calls from StartupConfig | Success |

### Configuration Deprecation (CONFIG_DEPRECATION)

| Code | Description | Type |
|------|-------------|------|
| CONFIG_DEPRECATION_001 | ConfigManager in common-utils marked as @Deprecated | Info |

### Configuration Cleanup (CONFIG_CLEANUP)

| Code | Description | Type |
|------|-------------|------|
| CONFIG_CLEANUP_001 | ConfigManager removed from common-utils (now only in config-server) | Success |

### Documentation Updates (DOC_UPDATE)

| Code | Description | Type |
|------|-------------|------|
| DOC_UPDATE_001 | Documentation updated for Config Server architecture and i18n rules | Success |

### Docker & DevOps (DOCKER)

| Code | Description | Type |
|------|-------------|------|
| DOCKER_001 | Production-ready Dockerfiles for all 7 microservices | Success |
| DOCKER_002 | Multi-stage Docker builds for optimized images | Success |
| DOCKER_003 | Security: Non-root users in all containers | Success |
| DOCKER_004 | Health check for Eureka service in Dockerfile | Success |
| DOCKER_005 | docker-compose.yml build context set to root | Success |
| DOCKER_006 | All Dockerfiles use correct relative paths | Success |
| DOCKER_VOL_001 | Docker Volume for Config Server persistent storage | Success |

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
| USER_001 | Creating new user | INFO |
| USER_002 | User created successfully | INFO |
| USER_003 | Getting user by ID | DEBUG |
| USER_004 | Getting user by email | DEBUG |
| USER_005 | Getting all users | INFO |
| USER_006 | Updating user | INFO |
| USER_007 | User updated successfully | INFO |
| USER_008 | Updating password | INFO |
| USER_009 | Password updated successfully | INFO |
| USER_010 | Setting email verified status | INFO |
| USER_011 | Email verified status updated | INFO |
| USER_012 | Updating last login | DEBUG |
| USER_013 | Deactivating user | INFO |
| USER_014 | User deactivated | INFO |
| USER_015 | Permanently deleting user | WARN |
| USER_016 | User deleted permanently | INFO |

#### API Codes
| Code | Description | Log Level |
|------|-------------|-----------|
| USER_API_001 | Create user request | INFO |
| USER_API_002 | Get user by ID request | DEBUG |
| USER_API_003 | Get user by email request | DEBUG |
| USER_API_004 | Get all users request | INFO |
| USER_API_005 | Update user request | INFO |
| USER_API_006 | Update password request | INFO |
| USER_API_007 | Set email verified request | INFO |
| USER_API_008 | Update last login request | DEBUG |
| USER_API_009 | Deactivate user request | INFO |
| USER_API_010 | Check email exists request | DEBUG |

#### Error Codes
| Code | Description | HTTP Status | Solution |
|------|-------------|-------------|----------|
| USER_ERR_404_001 | User not found | 404 | Check user ID |
| USER_ERR_404_002 | User not found with email | 404 | Check email address |
| USER_ERR_409_001 | Email already exists | 409 | Use different email |

### Auth Service (AUTH)

#### Success Codes
| Code | Description | Log Level |
|------|-------------|-----------|
| AUTH_001 | Creating user via user-service API | INFO |
| AUTH_002 | User created successfully | INFO |
| AUTH_003 | Finding user by email via user-service API | INFO |
| AUTH_004 | User found successfully | INFO |
| AUTH_005 | Finding user by ID via user-service API | INFO |
| AUTH_006 | User found successfully by ID | INFO |
| AUTH_007 | Verifying email via user-service API | INFO |
| AUTH_008 | Email verified successfully | INFO |
| AUTH_009 | Updating password via user-service API | INFO |
| AUTH_010 | Password updated successfully | INFO |
| AUTH_011 | Sending welcome email via email-service | INFO |
| AUTH_012 | Welcome email sent successfully | INFO |
| AUTH_013 | Sending verification email via email-service | INFO |
| AUTH_014 | Verification email sent successfully | INFO |
| AUTH_015 | Sending password reset email via email-service | INFO |
| AUTH_016 | Password reset email sent successfully | INFO |
| AUTH_017 | Registering new user | INFO |
| AUTH_018 | Password hashed successfully | DEBUG |
| AUTH_019 | User registered successfully | INFO |
| AUTH_020 | User login attempt | INFO |
| AUTH_021 | User logged in successfully | INFO |
| AUTH_022 | Refreshing JWT token | INFO |
| AUTH_023 | Token refreshed successfully | INFO |
| AUTH_024 | Verifying email | INFO |
| AUTH_025 | Email verified successfully | INFO |
| AUTH_026 | Password reset requested | INFO |
| AUTH_027 | Password reset email sent | INFO |
| AUTH_028 | Resetting password | INFO |
| AUTH_029 | Password reset successfully | INFO |
| AUTH_030 | Getting current user from token | INFO |
| AUTH_031 | Current user retrieved successfully | INFO |
| AUTH_032 | Logging out user | INFO |
| AUTH_033 | User logged out successfully | INFO |
| AUTH_034 | Register endpoint called | INFO |
| AUTH_035 | User registered successfully via endpoint | INFO |
| AUTH_036 | Login endpoint called | INFO |
| AUTH_037 | User logged in successfully via endpoint | INFO |
| AUTH_038 | Refresh token endpoint called | INFO |
| AUTH_039 | Token refreshed successfully via endpoint | INFO |
| AUTH_040 | Verify email endpoint called | INFO |
| AUTH_041 | Email verified successfully via endpoint | INFO |
| AUTH_042 | Forgot password endpoint called | INFO |
| AUTH_043 | Password reset email sent via endpoint | INFO |
| AUTH_044 | Reset password endpoint called | INFO |
| AUTH_045 | Password reset successfully via endpoint | INFO |
| AUTH_046 | Get current user endpoint called | INFO |
| AUTH_047 | Current user retrieved via endpoint | INFO |
| AUTH_048 | Logout endpoint called | INFO |
| AUTH_049 | User logged out successfully via endpoint | INFO |

#### API Codes
| Code | Description | Log Level |
|------|-------------|-----------|
| AUTH_API_001 | Register endpoint called | INFO |
| AUTH_API_002 | Login endpoint called | INFO |
| AUTH_API_003 | Refresh token endpoint called | DEBUG |
| AUTH_API_004 | Verify email endpoint called | INFO |
| AUTH_API_005 | Forgot password endpoint called | INFO |
| AUTH_API_006 | Reset password endpoint called | INFO |
| AUTH_API_007 | Get current user endpoint called | DEBUG |
| AUTH_API_008 | Logout endpoint called | DEBUG |

#### Warning Codes
| Code | Description | Action |
|------|-------------|--------|
| AUTH_WARN_001 | Failed to update last login | Non-critical - user still logged in |
| AUTH_WARN_002 | Failed to send welcome email | Non-critical - registration still successful |
| AUTH_WARN_003 | Failed to send verification email | Non-critical - can resend |
| AUTH_WARN_004 | Failed to send password reset email | Non-critical - can retry |

#### Error Codes
| Code | Description | HTTP Status | Solution |
|------|-------------|-------------|----------|
| AUTH_ERR_400_001 | Failed to create user | 400 | Check user data |
| AUTH_ERR_400_002 | Failed to create user (service error) | 400 | Check user-service logs |
| AUTH_ERR_400_003 | Failed to verify email | 400 | Check verification token |
| AUTH_ERR_400_004 | Failed to update password | 400 | Check password format |
| AUTH_ERR_400_005 | Invalid verification token | 400 | Request new verification email |
| AUTH_ERR_400_006 | Invalid reset token | 400 | Request new password reset |
| AUTH_ERR_401_001 | Invalid password | 401 | Check password |
| AUTH_ERR_401_002 | Token has been invalidated | 401 | Login again |
| AUTH_ERR_401_003 | Invalid token | 401 | Refresh or login again |
| AUTH_ERR_401_004 | Error refreshing token | 401 | Login again |
| AUTH_ERR_401_005 | Invalid token (getCurrentUser) | 401 | Login again |
| AUTH_ERR_401_006 | Error getting current user | 401 | Check authentication token |
| AUTH_ERR_403_001 | User account is inactive | 403 | Contact administrator |
| AUTH_ERR_404_001 | User not found with email | 404 | Check email address |
| AUTH_ERR_404_002 | User not found via user-service | 404 | Check user-service logs |
| AUTH_ERR_404_003 | User not found with email (final) | 404 | Register new account |
| AUTH_ERR_404_004 | User not found with ID | 404 | Check user ID |
| AUTH_ERR_404_005 | User not found via user-service (by ID) | 404 | Check user-service logs |
| AUTH_ERR_404_006 | User not found with ID (final) | 404 | Check user ID |
| AUTH_ERR_500_001 | Error creating user via user-service | 500 | Check user-service availability |
| AUTH_ERR_500_002 | Error verifying email via user-service | 500 | Check user-service availability |
| AUTH_ERR_500_003 | Error updating password via user-service | 500 | Check user-service availability |
| AUTH_ERR_500_004 | Error sending welcome email | 500 | Check email-service availability |
| AUTH_ERR_500_005 | Error sending verification email | 500 | Check email-service availability |
| AUTH_ERR_500_006 | Error sending password reset email | 500 | Check email-service availability |

#### Warning Codes
| Code | Description | Action |
|------|-------------|--------|
| AUTH_WARN_001 | Email service unavailable | Email not sent, user can still proceed |

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

### Email Service (EMAIL)

#### Success Codes
| Code | Description | Log Level |
|------|-------------|-----------|
| EMAIL_001 | Sending email | INFO |
| EMAIL_002 | Email sent successfully | INFO |
| EMAIL_CONFIG_001 | Initializing JavaMailSender via ConfigClient | INFO |
| EMAIL_CONFIG_002 | SMTP config loaded | INFO |
| EMAIL_CONFIG_003 | JavaMailSender initialized successfully | INFO |
| EMAIL_API_001 | Send email request received | INFO |
| EMAIL_API_002 | Verification email request received | INFO |
| EMAIL_API_003 | Password reset email request received | INFO |
| EMAIL_API_004 | Welcome email request received | INFO |
| EMAIL_API_005 | Health check requested | INFO |

#### Error Codes
| Code | Description | HTTP Status | Solution |
|------|-------------|-------------|----------|
| EMAIL_ERR_001 | Failed to send email (MessagingException) | 500 | Check SMTP config and recipient |
| EMAIL_ERR_002 | Unexpected error sending email | 500 | Check logs for details |
| EMAIL_CONFIG_ERR_001 | Failed to initialize JavaMailSender | 500 | Check Config Server and SMTP settings |
| EMAIL_API_ERR_001 | Failed to send email (API) | 500 | Retry or check request |
| EMAIL_API_ERR_002 | Failed to send verification email | 500 | Check recipient and config |
| EMAIL_API_ERR_003 | Failed to send password reset email | 500 | Check recipient and config |
| EMAIL_API_ERR_004 | Failed to send welcome email | 500 | Check recipient and config |

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

#### Navigation (FRONTEND_NAV)
| Code | Description | Type |
|------|-------------|------|
| FRONTEND_NAV_001 | Mobile menu with animations | Success |
| FRONTEND_NAV_002 | Porsche-style floating navbar | Success |
| FRONTEND_NAV_003 | Header redesign | Success |
| FRONTEND_NAV_004 | Dark background styling | Success |
| FRONTEND_NAV_005 | Navigation hover effects | Success |
| FRONTEND_NAV_006 | Mobile menu positioning | Success |
| FRONTEND_NAV_007 | 3-part navbar layout (logo left, nav center, lang right) | Success |
| FRONTEND_NAV_008 | Logo positioned top-left corner | Success |
| FRONTEND_NAV_009 | Language switcher positioned top-right corner | Success |
| FRONTEND_NAV_010 | Center navbar with rounded-full pill shape | Success |
| FRONTEND_NAV_011 | Separated logo and language from navbar | Success |
| FRONTEND_NAV_012 | Fixed positioning bugs | Success |
| FRONTEND_NAV_013 | Mobile menu centered below navbar | Success |
| FRONTEND_NAV_014 | Navbar Porsche Motorsport style with rounded-md and UPPERCASE text | Success |
| FRONTEND_NAV_015 | Mobile menu with rounded-md corners | Success |
| FRONTEND_NAV_016 | Complete navbar redesign based on old EckertPreisser project | Success |
| FRONTEND_NAV_017 | Header rewritten to match old project design | Success |
| FRONTEND_NAV_018 | Full-screen mobile menu overlay | Success |
| FRONTEND_NAV_019 | Mobile menu with language selector and account section | Success |
| FRONTEND_NAV_020 | Proper navbar centering with flexbox spacers | Success |
| FRONTEND_NAV_023 | Routes added for /solutions and /contact | Success |
| FRONTEND_NAV_024 | Navigation updated: Solutions + Contact (removed Products from main nav) | Success |

#### UI Components (FRONTEND_UI)
| Code | Description | Type |
|------|-------------|------|
| FRONTEND_UI_001 | Dark mode toggle component | Success |
| FRONTEND_UI_002 | Input component with error states | Success |
| FRONTEND_UI_003 | Container component with size variants | Success |
| FRONTEND_UI_004 | Section component with variants | Success |
| FRONTEND_UI_005 | GlassCard component | Success |
| FRONTEND_UI_006 | Hero components | Success |
| FRONTEND_UI_007 | CTA button styling updated | Success |
| FRONTEND_UI_008 | Logo changed to black text | Success |
| FRONTEND_UI_009 | Account menu dropdown with Profile, Settings, Logout | Success |
| FRONTEND_UI_010 | Logo text uppercase | Success |
| FRONTEND_UI_011 | CTA button rounded-md with uppercase text | Success |
| FRONTEND_UI_012 | Fixed vertical alignment of language & account buttons | Success |
| FRONTEND_UI_013 | Improved button sizing consistency (h-10) | Success |
| FRONTEND_UI_014 | Dropdown menu width increased for flag display | Success |
| FRONTEND_UI_015 | All buttons and dropdowns same height and properly aligned | Success |

#### Styling (FRONTEND_STYLE)
| Code | Description | Type |
|------|-------------|------|
| FRONTEND_STYLE_001 | Extended Tailwind config | Success |
| FRONTEND_STYLE_002 | Porsche-style backdrop blur | Success |
| FRONTEND_STYLE_003 | Gradient underline on nav links | Success |
| FRONTEND_STYLE_004 | Navbar rounded-full pill shape | Success |
| FRONTEND_STYLE_005 | Gray-200 text with white hover (old project style) | Success |

#### Animations (FRONTEND_ANIM)
| Code | Description | Type |
|------|-------------|------|
| FRONTEND_ANIM_001 | Framer Motion animations | Success |
| FRONTEND_ANIM_002 | Enhanced animations with viewport | Success |
| FRONTEND_ANIM_003 | Logo hover animation | Success |
| FRONTEND_ANIM_004 | Independent element animations | Success |
| FRONTEND_ANIM_005 | Scroll detection to hide/show logo with fade animation | Success |
| FRONTEND_ANIM_006 | Scroll detection threshold changed to 10px | Success |

#### Pages (FRONTEND_PAGE)
| Code | Description | Type |
|------|-------------|------|
| FRONTEND_PAGE_001 | Home page updated | Success |
| FRONTEND_PAGE_002 | Clean empty homepage | Success |
| FRONTEND_PAGE_003 | Simplified Home page | Success |
| FRONTEND_PAGE_004 | Home page padding adjusted | Success |
| FRONTEND_PAGE_005 | Home page padding for new layout | Success |
| FRONTEND_PAGE_006 | Solutions page created with 6 solution cards | Success |
| FRONTEND_PAGE_007 | Contact page created with form and contact info | Success |

#### Layout & Structure (FRONTEND_LAYOUT)
| Code | Description | Type |
|------|-------------|------|
| FRONTEND_LAYOUT_001 | Documentation-style layout with sticky sidebar and bottom nav | Success |

#### Concept Page (FRONTEND_CONCEPT)
| Code | Description | Type |
|------|-------------|------|
| FRONTEND_CONCEPT_001 | Chapter 1 with Stats boxes and Assumptions cards | Success |

#### Redesign (FRONTEND_REDESIGN)
| Code | Description | Type |
|------|-------------|------|
| FRONTEND_REDESIGN_001 | Concept page redesigned from cards to documentation layout | Success |

#### Bug Fixes (FRONTEND_FIX)
| Code | Description | Type |
|------|-------------|------|
| FRONTEND_FIX_001 | Fixed Sidebar/Footer overlap on Concept page | Bug Fix |
| FRONTEND_FIX_002 | Fixed Sidebar sticky behavior and Content positioning | Bug Fix |

#### Configuration (FRONTEND_CONFIG)
| Code | Description | Type |
|------|-------------|------|
| FRONTEND_CONFIG_001 | packageManager field added | Success |
| FRONTEND_CONFIG_002 | turbo.json pipeline renamed to tasks | Success |

#### i18n (FRONTEND_I18N)
| Code | Description | Type |
|------|-------------|------|
| FRONTEND_I18N_001 | i18n support in Header | Success |
| FRONTEND_I18N_002 | LanguageSwitcher integrated | Success |
| FRONTEND_I18N_003 | All text uses i18n t() | Success |
| FRONTEND_I18N_004 | Custom language dropdown with flag icons and codes (GER/ENG) | Success |
| FRONTEND_I18N_005 | Custom language switcher replaces old component | Success |
| FRONTEND_I18N_006 | Old LanguageSwitcher component removed from Header | Success |
| FRONTEND_I18N_007 | SVG flag icons replace emoji flags (German & British) | Success |
| FRONTEND_I18N_008 | Language dropdown shows "GER" + flag (not "GER" + "DE") | Success |
| FRONTEND_I18N_009 | Added "nav.account" translation (DE: "Konto", EN: "Account") | Success |
| FRONTEND_I18N_010 | Language switcher shows flag BEFORE code | Success |
| FRONTEND_I18N_011 | Language dropdown shows Flag + CODE + Label | Success |
| FRONTEND_I18N_012 | Language codes changed to DE/EN (from GER/ENG) | Success |
| FRONTEND_I18N_013 | i18n system loads ALL translations from backend | Success |
| FRONTEND_I18N_014 | changeLanguage() uses logger instead of console.log | Success |
| FRONTEND_I18N_015 | Frontend i18n properly integrated with backend config | Success |
| FRONTEND_I18N_016 | Translation loading errors logged with error codes | Success |
| FRONTEND_I18N_017 | React Context Provider for i18n created | Success |
| FRONTEND_I18N_018 | useTranslation hook created for reactive i18n | Success |
| FRONTEND_I18N_019 | Components re-render when translations load | Success |
| FRONTEND_I18N_020 | Header component uses useTranslation hook | Success |
| FRONTEND_I18N_021 | Footer component uses useTranslation hook | Success |
| FRONTEND_I18N_025 | 25+ i18n keys added for Concept Chapter 1 (intro, stats, assumptions) | Success |

#### i18n Context (I18N_CTX)
| Code | Description | Action |
|------|-------------|--------|
| I18N_CTX_001 | Initializing i18n context from backend | Info |
| I18N_CTX_002 | Language config loaded from backend | Info |
| I18N_CTX_003 | i18n context initialized successfully | Info |
| I18N_CTX_004 | Language changed | Info |
| I18N_CTX_ERR_001 | Failed to initialize i18n context | Check backend connection |
| I18N_CTX_WARN_001 | Using fallback translations - Backend unavailable | Check backend |
| I18N_CTX_WARN_002 | Unsupported language requested | Use supported language |

#### Status Page (STATUS)
| Code | Description | Action |
|------|-------------|--------|
| STATUS_001 | Checking service health | Info |
| STATUS_002 | Service health check complete | Info |
| STATUS_WARN_001 | Service unreachable | Check service logs |
| STATUS_ERR_001 | Failed to fetch service status | Retry or check network |

### Contact Form (CONTACT)
| Code | Description | Action |
|------|-------------|--------|
| CONTACT_001 | Submitting contact form | Info |
| CONTACT_002 | Contact form submitted successfully | Success |
| CONTACT_ERR_001 | Failed to submit contact form | Check network or try again |

#### Legal Pages (FRONTEND_LEGAL)
| Code | Description | Type |
|------|-------------|------|
| FRONTEND_LEGAL_001 | Impressum page created | Success |
| FRONTEND_LEGAL_002 | Datenschutz (Privacy Policy) page created | Success |
| FRONTEND_LEGAL_003 | Cookie Policy page created | Success |
| FRONTEND_LEGAL_004 | All legal pages use new design system | Success |
| FRONTEND_LEGAL_005 | Legal routes added to App.tsx | Success |
| FRONTEND_LEGAL_006 | Footer legal links updated with translations | Success |
| FRONTEND_LEGAL_007 | Impressum page fully translated with i18n (24 keys) | Success |
| FRONTEND_LEGAL_008 | Datenschutz page main sections translated (20 keys) | Success |
| FRONTEND_LEGAL_009 | Cookie Policy page main sections translated (14 keys) | Success |
| FRONTEND_LEGAL_010 | All legal pages use useTranslation hook | Success |

#### Internationalization Backend (BACKEND_I18N)
| Code | Description | Type |
|------|-------------|------|
| BACKEND_I18N_003 | Added footer translations (legal.*, footer.*) | Success |
| BACKEND_I18N_004 | 13 new translation keys added (7 footer, 4 legal, 2 contact) | Success |
| BACKEND_I18N_005 | Added 60+ legal page translations (impressum.*, datenschutz.*, cookies.*) | Success |
| BACKEND_I18N_006 | MessageSource now always regenerates properties files | Success |
| BACKEND_I18N_007 | Added getAllMessages() method for dynamic key loading | Success |
| BACKEND_I18N_008 | I18nController uses dynamic key loading (no hardcoded array) | Success |

#### Cleanup (FRONTEND_CLEAN)
| Code | Description | Type |
|------|-------------|------|
| FRONTEND_CLEAN_001 | Removed placeholder content | Success |
| FRONTEND_CLEAN_002 | Removed placeholder hero | Success |
| FRONTEND_CLEAN_003 | Removed placeholder cards | Success |
| FRONTEND_CLEAN_004 | Removed placeholder CTA | Success |
| FRONTEND_CLEAN_005 | Removed hardcoded features | Success |

#### Responsive (FRONTEND_RESPONSIVE)
| Code | Description | Type |
|------|-------------|------|
| FRONTEND_RESPONSIVE_001 | Mobile-first responsive design | Success |

#### Footer (FRONTEND_FOOTER)
| Code | Description | Type |
|------|-------------|------|
| FRONTEND_FOOTER_001 | Footer component with navigation | Success |

#### Documentation (FRONTEND_DOC)
| Code | Description | Type |
|------|-------------|------|
| FRONTEND_DOC_001 | Comprehensive agent briefing document created | Success |

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

**Last Updated**: 2025-10-21
**Version**: 2.0.0 - Enterprise Config API
