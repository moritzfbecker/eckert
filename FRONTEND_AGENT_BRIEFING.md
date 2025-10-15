# Frontend Development Agent Briefing

**Version**: 1.0.0
**Date**: 2025-10-15
**Current Frontend Version**: 1.4.1
**Project**: Eckert Preisser Enterprise Web Application

---

## 🎯 Mission Overview

You are an AI agent responsible for developing the **frontend** of the Eckert Preisser Enterprise Web Application. This is a **full-stack enterprise application** with a **React 18 Micro Frontend architecture** using **Vite, TypeScript, and Turborepo**.

Your primary responsibilities:
1. Develop new frontend features following strict guidelines
2. Maintain code quality and consistency
3. Follow the established design system (Porsche Motorsport + Apple style)
4. Ensure proper versioning and documentation
5. Write clean, maintainable, and scalable code

---

## 📋 Critical Rules (MUST FOLLOW!)

### 1. Version Management
**EVERY SINGLE CHANGE REQUIRES VERSION BUMP!**

```bash
# Update version in frontend/package.json
# PATCH (1.4.1 → 1.4.2): Bug fixes
# MINOR (1.4.1 → 1.5.0): New features
# MAJOR (1.4.1 → 2.0.0): Breaking changes

# After EVERY change:
1. Edit frontend/package.json version
2. Update frontend/CHANGELOG.md
3. Update root CHANGELOG.md
4. Git commit with detailed message
5. Git tag: frontend-vX.Y.Z
6. Push with tags: git push --tags
```

**NEVER skip version bumping!**

### 2. Logging with Error Codes
**ALWAYS use logger with error codes:**

```typescript
import { logger } from '@eckert-preisser/shared/utils'

// Correct
logger.info('FEATURE_001', 'Message', { userId: 123 })
logger.error('FEATURE_ERR_001', 'Message', error, context)

// Wrong - NEVER do this
console.log('Message')  // ❌ FORBIDDEN
```

### 3. Multi-Language Support
**ALL user-facing text MUST support German and English:**

```typescript
import { t } from '@eckert-preisser/shared/utils'

// Correct
<button>{t('button.submit')}</button>

// Wrong - NEVER hardcode text
<button>Submit</button>  // ❌ FORBIDDEN
```

### 4. Changelog Requirements
**Update BOTH changelogs with EVERY change:**

```markdown
## [1.4.2] - 2025-10-15

### Added
- Feature description [ERROR_CODE]

### Changed
- Change description [ERROR_CODE]

### Fixed
- Bug fix description [ERROR_CODE]

**Author**: Your Name/Claude AI
**Type**: Feature/Bug Fix/Refactor
```

### 5. Error Code Documentation
**ALL new error codes MUST be documented in ERROR_CODES.md**

Format: `{FEATURE}_{TYPE}_{NUMBER}`
- `FEATURE_001` - Success
- `FEATURE_ERR_001` - Error

---

## 🎨 Design System (CRITICAL!)

### Color Scheme
**ONLY use Black & White - NO gray tones!**

```tsx
// Page background
bg-eckert-white (#FFFFFF)
text-black

// Cards/Buttons/Navbar
bg-black (#000000)
text-white

// ❌ NEVER use gray
text-gray-300  // FORBIDDEN
bg-gray-50     // FORBIDDEN
```

### Apple Gradient
**ONLY for hover effects - NEVER as standard color!**

```tsx
// ✅ Correct - Hover only
hover:shadow-apple-glow
hover:bg-apple-gradient

// ❌ Wrong - Never as standard
bg-apple-gradient  // FORBIDDEN
text-gradient      // FORBIDDEN (except hover)
```

Official Apple Colors:
- Pink: #FF2D55
- Purple: #AF52DE
- Blue: #007AFF

### Typography
```tsx
// ✅ Correct
text-black          // On white background
text-white          // In black boxes
uppercase           // Navigation text is UPPERCASE

// ❌ Wrong
text-gray-400       // FORBIDDEN
```

### Rounded Corners
```tsx
rounded-md          // Standard (8px) - Porsche style
rounded-lg          // Large cards (12px)
rounded-full        // Pills, avatars
```

---

## 🏗 Frontend Architecture

### Project Structure
```
frontend/
├── packages/
│   ├── shell/              # Main app (Vite + React 18)
│   │   ├── src/
│   │   │   ├── components/  # Header, Footer
│   │   │   ├── pages/       # Home, Products, Dashboard
│   │   │   └── App.tsx
│   │   └── package.json
│   │
│   └── shared/             # Shared across all packages
│       ├── ui-components/   # Button, Card, Input, etc.
│       ├── hooks/           # useScrollAnimation, etc.
│       ├── utils/           # logger, api, i18n, errorHandler
│       ├── animations/      # Framer Motion configs
│       └── package.json
│
├── package.json            # Root (Turborepo)
└── turbo.json              # Turborepo config
```

### Tech Stack
- **React**: 18.3.1
- **TypeScript**: 5.6.3
- **Build Tool**: Vite 6
- **Monorepo**: Turborepo
- **Styling**: Tailwind CSS 3.4
- **Animations**: Framer Motion 11
- **Routing**: React Router v6

### Shared Components
**ALWAYS prefer shared components over creating new ones:**

```typescript
import { Button, Card, GlassCard } from '@eckert-preisser/shared/ui'
import { useScrollAnimation } from '@eckert-preisser/shared/hooks'
import { api, logger, t } from '@eckert-preisser/shared/utils'
```

Available components:
- Button (primary, secondary)
- Card
- GlassCard
- Input
- Container
- Section
- Hero + Sub-components

---

## 🎯 Current Implementation Status

### ✅ Implemented Features

**Navigation:**
- Porsche Motorsport-style navbar (centered, rounded-md, black glassmorphism)
- Logo (top-left, hides on scroll)
- Language Switcher dropdown (GER/ENG with SVG flags)
- Account menu dropdown (Profile, Settings, Logout)
- Mobile responsive menu
- All navigation text in UPPERCASE

**Styling:**
- Minimalist Black/White theme
- Apple Gradient (hover effects only)
- Glassmorphism with 32px backdrop blur
- Smooth animations with Framer Motion
- Mobile-first responsive design

**Infrastructure:**
- Logging system with error codes
- i18n system (German/English)
- Error handling framework
- API client
- Shared component library

### 🚧 Pending Features

**Pages:**
- Home page content (currently empty)
- Products page
- Product detail page
- Dashboard page
- User profile page
- Settings page

**Features:**
- Authentication (Login/Register)
- Product catalog
- Shopping cart
- User management
- Forms with validation

---

## 📝 Development Workflow

### Standard Workflow for ANY Change

```bash
# 1. Create feature branch (optional)
git checkout -b feature/user-profile

# 2. Make code changes
# - Add logging with error codes
# - Use shared components
# - Follow styling guidelines
# - Support both DE/EN languages

# 3. Document new error codes
# Update ERROR_CODES.md

# 4. Bump version
# Edit frontend/package.json

# 5. Update changelogs
# Edit frontend/CHANGELOG.md
# Edit root CHANGELOG.md

# 6. Test
npm run dev  # Check on http://localhost:3000

# 7. Commit
git add .
git commit -m "feat: description

[ERROR_CODE_001] Description
[ERROR_CODE_002] Description

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>"

# 8. Tag
git tag frontend-v1.4.2

# 9. Push
git push --tags
```

---

## 🎨 Component Development Guidelines

### React Component Template

```typescript
import { motion } from 'framer-motion'
import { t } from '@eckert-preisser/shared/utils'

interface MyComponentProps {
  title: string
  onSubmit?: () => void
}

export const MyComponent: React.FC<MyComponentProps> = ({ title, onSubmit }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-black text-white p-8 rounded-md"
    >
      <h2 className="text-2xl font-bold uppercase">
        {t('component.title')}
      </h2>

      <button
        onClick={onSubmit}
        className="
          px-6 py-3
          bg-white text-black
          rounded-md
          font-semibold uppercase
          hover:shadow-apple-glow
          transition-all duration-300
        "
      >
        {t('button.submit')}
      </button>
    </motion.div>
  )
}
```

### DO's ✅

**Colors:**
- ✅ Use ONLY Black & White
- ✅ White page background (bg-eckert-white)
- ✅ Black boxes/buttons (bg-black)
- ✅ Apple Gradient only for hover

**Components:**
- ✅ Functional components with hooks
- ✅ TypeScript for all components
- ✅ Props interface extends HTML props when applicable
- ✅ Use Framer Motion for animations
- ✅ Tailwind CSS for ALL styling

**Code Quality:**
- ✅ ALWAYS use logger (never console.log)
- ✅ ALWAYS use t() for text (never hardcode)
- ✅ Mobile-first responsive design
- ✅ Accessibility (ARIA labels)

### DON'Ts ❌

**Colors:**
- ❌ NO gray tones (text-gray-300, bg-gray-50)
- ❌ NO gradient as standard color
- ❌ NO colorful backgrounds

**Code:**
- ❌ NO console.log (use logger)
- ❌ NO hardcoded text (use t())
- ❌ NO inline styles (use Tailwind)
- ❌ NO .env files (config in YAML)

---

## 🌐 Multi-Language (i18n)

### Adding Translations

**1. Add to backend translation files:**
```properties
# config/i18n/messages_de.properties
button.submit=Absenden
error.invalid.email=Ungültige E-Mail-Adresse

# config/i18n/messages_en.properties
button.submit=Submit
error.invalid.email=Invalid email address
```

**2. Use in frontend:**
```typescript
import { t } from '@eckert-preisser/shared/utils'

<button>{t('button.submit')}</button>
<p>{t('error.invalid.email')}</p>
```

**3. Change language:**
```typescript
import { changeLanguage } from '@eckert-preisser/shared/utils'

changeLanguage('de')  // Switch to German
changeLanguage('en')  // Switch to English
```

---

## 📊 Error Codes Reference

### Frontend Error Code Format
`{FEATURE}_{TYPE}_{NUMBER}`

### Categories
- **FRONTEND_NAV_XXX**: Navigation components
- **FRONTEND_UI_XXX**: UI components
- **FRONTEND_PAGE_XXX**: Pages
- **FRONTEND_ANIM_XXX**: Animations
- **FRONTEND_STYLE_XXX**: Styling
- **FRONTEND_I18N_XXX**: Internationalization
- **FRONTEND_CONFIG_XXX**: Configuration

### Examples
```typescript
// Success
logger.info('PROFILE_001', 'User profile loaded', { userId })

// Error
logger.error('PROFILE_ERR_001', 'Failed to load profile', error, { userId })
```

**ALWAYS document new codes in ERROR_CODES.md!**

---

## 🎯 Quick Reference

### Tailwind Classes - Most Used

```tsx
// Layout
flex items-center justify-between gap-4
grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3

// Colors (ONLY Black & White)
bg-black text-white
bg-white text-black
border-white/10

// Spacing
p-4 px-6 py-3
m-4 mx-auto
gap-4 gap-6 gap-8

// Rounded Corners
rounded-md      // Standard
rounded-lg      // Large
rounded-full    // Pills

// Hover Effects
hover:shadow-apple-glow
hover:scale-105
hover:bg-white/10

// Responsive
md:text-2xl     // Medium screens
lg:text-4xl     // Large screens
hidden md:block // Hide on mobile

// Glassmorphism
bg-black/80 backdrop-blur-[32px]
border border-white/10
```

### Common Patterns

**Button:**
```tsx
<button className="
  px-6 py-3
  bg-black text-white
  rounded-md
  font-semibold uppercase
  hover:shadow-apple-glow
  transition-all duration-300
">
  {t('button.text')}
</button>
```

**Card:**
```tsx
<div className="
  bg-black text-white
  rounded-md p-8
  border border-white/10
  hover:shadow-elevated
  transition-all duration-300
">
  Content
</div>
```

**Scroll Animation:**
```tsx
<motion.div
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
  viewport={{ once: true, amount: 0.3 }}
>
  Content
</motion.div>
```

---

## 📚 Essential Documentation Files

**MUST READ before starting:**

1. **CLAUDE.md** - Complete project memory/guidelines
2. **STYLING_GUIDELINES.md** - Complete design system
3. **ERROR_CODES.md** - All error codes
4. **VERSION_MANAGEMENT.md** - Versioning workflow
5. **DEVELOPMENT_GUIDELINES.md** - Coding standards
6. **CONFIG_SYSTEM.md** - Configuration system
7. **frontend/CHANGELOG.md** - Frontend changelog
8. **CHANGELOG.md** - Root changelog

**Quick Start Guides:**
- docs/QUICK_START_LOGGING.md
- docs/QUICK_START_VERSIONING.md
- docs/QUICK_START_I18N.md

---

## 🔧 Running the Frontend

```bash
# Install dependencies
cd frontend
npm install

# Start dev server
npm run dev
# → Runs on http://localhost:3000

# Build for production
npm run build

# Run tests
npm run test

# Lint code
npm run lint
```

---

## ⚠️ Common Pitfalls to Avoid

### 1. Forgetting Version Bump
```bash
# ❌ Wrong - No version bump
git commit -m "feat: add feature"

# ✅ Correct
# 1. Edit frontend/package.json version
# 2. Update CHANGELOGs
# 3. Commit with error codes
# 4. Git tag frontend-vX.Y.Z
```

### 2. Using console.log
```typescript
// ❌ Wrong
console.log('User data:', data)

// ✅ Correct
import { logger } from '@eckert-preisser/shared/utils'
logger.info('USER_DATA_001', 'User data loaded', { userId: data.id })
```

### 3. Hardcoding Text
```typescript
// ❌ Wrong
<button>Submit</button>

// ✅ Correct
<button>{t('button.submit')}</button>
```

### 4. Using Gray Colors
```tsx
// ❌ Wrong
<p className="text-gray-400">Text</p>

// ✅ Correct
<p className="text-white">Text</p>  // In black box
<p className="text-black">Text</p>  // On white background
```

### 5. Gradient as Standard
```tsx
// ❌ Wrong
<button className="bg-apple-gradient">Button</button>

// ✅ Correct
<button className="bg-black hover:shadow-apple-glow">Button</button>
```

---

## 🎯 Your First Task Checklist

Before you start coding:

- [ ] Read CLAUDE.md completely
- [ ] Read STYLING_GUIDELINES.md
- [ ] Understand the error code system (ERROR_CODES.md)
- [ ] Review current Header.tsx implementation
- [ ] Check frontend/CHANGELOG.md for recent changes
- [ ] Run `npm run dev` to see current state
- [ ] Understand the versioning workflow

When implementing a new feature:

- [ ] Plan the feature (use TodoWrite tool)
- [ ] Use shared components when possible
- [ ] Add logging with error codes
- [ ] Support both DE/EN languages
- [ ] Follow Black/White color scheme
- [ ] Test on different screen sizes
- [ ] Document new error codes
- [ ] Bump version (PATCH/MINOR/MAJOR)
- [ ] Update frontend/CHANGELOG.md
- [ ] Update root CHANGELOG.md
- [ ] Commit with detailed message
- [ ] Create git tag frontend-vX.Y.Z
- [ ] Push with tags

---

## 📞 Getting Help

**Documentation Locations:**
```
Eckert Enterprise/
├── CLAUDE.md                      # Main guidelines
├── STYLING_GUIDELINES.md          # Design system
├── ERROR_CODES.md                 # Error codes
├── VERSION_MANAGEMENT.md          # Versioning
├── DEVELOPMENT_GUIDELINES.md      # Coding standards
├── CHANGELOG.md                   # Root changelog
├── frontend/
│   ├── CHANGELOG.md               # Frontend changelog
│   ├── README.md                  # Frontend docs
│   └── packages/
│       ├── shell/src/             # Main app code
│       └── shared/                # Shared code
└── docs/
    ├── QUICK_START_LOGGING.md
    ├── QUICK_START_VERSIONING.md
    └── QUICK_START_I18N.md
```

**Key Contacts:**
- Project Lead: TBD
- Backend Team: TBD
- Frontend Team: You!

---

## 🎉 Summary

**Remember these 5 golden rules:**

1. **ALWAYS bump version** on every change
2. **ALWAYS use logger** (never console.log)
3. **ALWAYS use t()** for text (support DE/EN)
4. **ONLY Black & White** colors (no gray)
5. **ALWAYS update changelogs** and document error codes

**You're ready to start developing!** 🚀

Good luck, and build something amazing!

---

**Document Version**: 1.0.0
**Last Updated**: 2025-10-15
**Frontend Version**: 1.4.1
**Author**: Claude AI
