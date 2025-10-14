# Frontend - Micro Frontend Architecture

## Overview

Dieses Frontend ist als Monorepo mit Turborepo organisiert und implementiert eine Micro-Frontend-Architektur.

## Structure

```
frontend/
├── packages/
│   ├── shell/              # Main Shell Application
│   ├── shared/             # Shared Components & Utilities
│   ├── home/               # Home Micro Frontend (TODO)
│   ├── products/           # Products Micro Frontend (TODO)
│   └── dashboard/          # Dashboard Micro Frontend (TODO)
├── package.json            # Root Configuration
└── turbo.json             # Turborepo Configuration
```

## Getting Started

### Installation

```bash
# Install all dependencies
npm install
```

### Development

```bash
# Start all apps in development mode
npm run dev

# Start specific package
npm run dev --filter=@eckert-preisser/shell
```

### Build

```bash
# Build all packages
npm run build

# Build specific package
npm run build --filter=@eckert-preisser/shell
```

### Lint

```bash
# Lint all packages
npm run lint
```

### Clean

```bash
# Remove all node_modules and build artifacts
npm run clean
```

## Packages

### Shell App

Main application container that hosts all micro frontends.

**Tech Stack:**
- React 18.3.1
- Vite 6
- React Router v6
- Tailwind CSS 3.4
- Framer Motion 11

**Port:** 3000

**Start:**
```bash
cd packages/shell
npm run dev
```

### Shared Package

Reusable components, hooks, and utilities used across all micro frontends.

**Exports:**
- `@eckert-preisser/shared/ui` - UI Components
- `@eckert-preisser/shared/hooks` - Custom React Hooks
- `@eckert-preisser/shared/utils` - Utility Functions
- `@eckert-preisser/shared/animations` - Framer Motion Configs

**Usage:**
```tsx
import { Button, Card } from '@eckert-preisser/shared/ui';
import { useScrollAnimation } from '@eckert-preisser/shared/hooks';
import { api } from '@eckert-preisser/shared/utils';
import { fadeInUp } from '@eckert-preisser/shared/animations';
```

## UI Components

### Button

```tsx
import { Button } from '@eckert-preisser/shared/ui';

<Button variant="gradient" size="lg">
  Click Me
</Button>
```

**Variants:**
- `primary` - White background
- `secondary` - Black background with border
- `gradient` - Apple gradient (default for CTAs)

**Sizes:**
- `sm` - Small
- `md` - Medium (default)
- `lg` - Large

### Card

```tsx
import { Card } from '@eckert-preisser/shared/ui';

<Card hover={true}>
  <h3>Card Title</h3>
  <p>Card content...</p>
</Card>
```

## Custom Hooks

### useScrollAnimation

Trigger animations when element enters viewport.

```tsx
import { useScrollAnimation } from '@eckert-preisser/shared/hooks';

const Component = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

  return (
    <div ref={ref}>
      {isVisible && <p>I'm visible!</p>}
    </div>
  );
};
```

## Animations

Pre-configured Framer Motion animation objects.

```tsx
import { motion } from 'framer-motion';
import { fadeInUp, slideInFromLeft } from '@eckert-preisser/shared/animations';

<motion.div
  initial={fadeInUp.initial}
  animate={fadeInUp.animate}
  transition={fadeInUp.transition}
>
  Content
</motion.div>
```

**Available Animations:**
- `fadeIn` - Simple fade in
- `fadeInUp` - Fade in with slide up
- `slideInFromLeft` - Slide from left
- `slideInFromRight` - Slide from right
- `scaleIn` - Scale animation

## API Client

Centralized API client for backend communication.

```tsx
import { api } from '@eckert-preisser/shared/utils';

// GET Request
const response = await api.get<User[]>('/users');

// POST Request
const response = await api.post<User>('/users', {
  email: 'test@example.com',
  firstName: 'John',
  lastName: 'Doe'
});

// PUT Request
const response = await api.put<User>('/users/1', userData);

// DELETE Request
await api.delete('/users/1');
```

## Styling

### Tailwind CSS

Alle Komponenten verwenden Tailwind CSS.

**Custom Classes:**
```css
/* Gradient Text */
.text-gradient {
  @apply bg-apple-gradient bg-clip-text text-transparent;
}

/* Gradient Border */
.border-gradient {
  border-image: linear-gradient(to right, #ec4899, #a855f7, #eab308) 1;
}
```

**Theme Colors:**
```javascript
// Apple Gradient Colors
'apple-pink': '#ec4899'
'apple-purple': '#a855f7'
'apple-yellow': '#eab308'

// Gradients
'bg-apple-gradient'
'bg-apple-gradient-hover'

// Shadows
'shadow-apple-glow'
'shadow-apple-glow-lg'
```

### Custom Animations

```javascript
// In tailwind.config.js
animation: {
  'fade-in': 'fadeIn 0.5s ease-in-out',
  'slide-in': 'slideIn 0.6s ease-out',
  'glow': 'glow 2s ease-in-out infinite alternate',
}
```

## Environment Variables

Create `.env` file in shell package:

```env
VITE_API_URL=http://localhost:8080/api
VITE_APP_TITLE=Eckert Preisser
```

**Usage:**
```typescript
const apiUrl = import.meta.env.VITE_API_URL;
```

## Routing

React Router v6 is used for routing.

```tsx
import { Routes, Route } from 'react-router-dom';

<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/products" element={<Products />} />
  <Route path="/dashboard" element={<Dashboard />} />
</Routes>
```

## Adding a New Micro Frontend

1. **Create Package:**
```bash
cd packages
mkdir my-feature
cd my-feature
npm init -y
```

2. **Add Dependencies:**
```json
{
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "@eckert-preisser/shared": "workspace:*"
  }
}
```

3. **Update Root Package.json:**
```json
{
  "workspaces": [
    "packages/*"
  ]
}
```

4. **Add to Turborepo:**
Already configured to include all `packages/*`

## Performance Optimization

### Code Splitting

```tsx
import { lazy, Suspense } from 'react';

const Products = lazy(() => import('./pages/Products'));

<Suspense fallback={<LoadingSpinner />}>
  <Products />
</Suspense>
```

### Image Optimization

```tsx
<img
  src="/image.jpg"
  loading="lazy"
  alt="Description"
/>
```

### Memo for Heavy Components

```tsx
import { memo } from 'react';

const HeavyComponent = memo(({ data }) => {
  // Component logic
});
```

## Testing

### Unit Tests

```bash
npm run test
```

### E2E Tests (Cypress)

```bash
npm run e2e
```

## Build for Production

```bash
# Build all packages
npm run build

# Preview production build
cd packages/shell
npm run preview
```

## Deployment

### Build Docker Image

```dockerfile
FROM node:20-alpine as builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/packages/shell/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### Build and Run

```bash
docker build -t eckert-frontend .
docker run -p 80:80 eckert-frontend
```

## Troubleshooting

### Module Not Found

```bash
# Clear node_modules and reinstall
npm run clean
npm install
```

### TypeScript Errors

```bash
# Clear TypeScript cache
rm -rf **/*.tsbuildinfo
```

### Vite HMR Issues

```bash
# Clear Vite cache
rm -rf packages/shell/.vite
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

See [DEVELOPMENT_GUIDELINES.md](../DEVELOPMENT_GUIDELINES.md) for coding standards.
