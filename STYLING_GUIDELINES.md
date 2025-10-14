# Styling Guidelines - Eckert Preisser Enterprise

## 🎨 Design Philosophy

Inspiriert von **Porsche Motorsport** und **Apple** - Minimalistisch, Premium, Professionell.

### Kernprinzipien
1. **Weniger ist mehr** - Minimalistisch, kein visueller Lärm
2. **Schwarz-Weiß Dominanz** - Farben nur für Akzente
3. **Smooth Animations** - Alles fühlt sich flüssig und premium an
4. **Mobile First** - Perfekt auf allen Geräten
5. **Konsistenz** - Einheitliches Design durchgehend

---

## 🎨 Farbsystem

### Hauptfarben

```javascript
// tailwind.config.js
colors: {
  // Primary Colors
  'eckert-black': '#010205',      // Porsche-inspired deep black
  'eckert-white': '#FFFFFF',      // Pure white
  'eckert-gray': {
    50: '#fafafa',
    100: '#f5f5f5',
    200: '#e5e5e5',
    300: '#d4d4d4',
    400: '#a3a3a3',
    500: '#737373',
    600: '#525252',
    700: '#404040',
    800: '#262626',
    900: '#171717',
    950: '#0a0a0a',
  },

  // Accent Colors (Apple Gradient)
  'apple-pink': '#ec4899',
  'apple-purple': '#a855f7',
  'apple-yellow': '#eab308',
}
```

### Verwendungsregeln

**Background:**
```tsx
// Primary Backgrounds
bg-eckert-black         // Haupt-Background
bg-eckert-white         // Cards, Modals (nur selten)
bg-gray-900             // Secondary sections
bg-gray-950             // Darker sections

// Translucent (wie Porsche)
bg-black/80             // 80% opacity
bg-black/60             // 60% opacity
bg-white/10             // Subtle white overlay
```

**Text:**
```tsx
// Text Colors
text-eckert-white       // Primary text
text-gray-300           // Secondary text
text-gray-400           // Tertiary text
text-gray-500           // Disabled text

// Gradient Text (nur für Highlights!)
text-gradient           // Apple gradient
```

**Borders:**
```tsx
border-gray-800         // Standard borders
border-gray-700         // Lighter borders
border-white/20         // Subtle white borders
```

**Farbverwendung:**
- **80% der Seite**: Schwarz (#010205)
- **15% der Seite**: Weiß und Grautöne
- **5% der Seite**: Apple Gradient (nur für CTAs, Highlights, Hover)

---

## 📐 Spacing & Layout

### Spacing Scale (wie Porsche)

```tsx
// Padding/Margin Scale
p-1   → 4px    // Minimal spacing
p-2   → 8px    // Tight spacing
p-4   → 16px   // Standard spacing
p-6   → 24px   // Medium spacing
p-8   → 32px   // Large spacing
p-12  → 48px   // Extra large spacing
p-16  → 64px   // Section spacing
p-24  → 96px   // Hero spacing
```

### Container Widths

```tsx
// Max-Width Container
container mx-auto px-6          // Mobile: 24px padding
container mx-auto px-8          // Tablet: 32px padding
container mx-auto px-12         // Desktop: 48px padding

// Max Width
max-w-7xl                       // 1280px - Standard content
max-w-6xl                       // 1152px - Narrow content
max-w-4xl                       // 896px - Reading width
```

### Grid System

```tsx
// 12-Column Grid (Desktop)
grid grid-cols-12 gap-6

// 6-Column Grid (Tablet)
md:grid-cols-6

// 4-Column Grid (Mobile)
grid-cols-4

// Common Layouts
grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8
```

---

## 🔤 Typography

### Font Family

```javascript
// tailwind.config.js
fontFamily: {
  sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
  display: ['Inter', 'sans-serif'],
}
```

**Verwendung:**
```tsx
font-sans           // Body text
font-display        // Headlines
```

### Font Sizes (Mobile First!)

```tsx
// Headlines
text-4xl md:text-5xl lg:text-6xl    // H1 (36px → 48px → 60px)
text-3xl md:text-4xl lg:text-5xl    // H2 (30px → 36px → 48px)
text-2xl md:text-3xl lg:text-4xl    // H3 (24px → 30px → 36px)
text-xl md:text-2xl                 // H4 (20px → 24px)
text-lg md:text-xl                  // H5 (18px → 20px)

// Body Text
text-base md:text-lg                // Body (16px → 18px)
text-sm md:text-base                // Small (14px → 16px)
text-xs                             // Caption (12px)
```

### Font Weights

```tsx
font-light    → 300   // Selten verwenden
font-normal   → 400   // Body text
font-medium   → 500   // Emphasized text
font-semibold → 600   // Subheadings
font-bold     → 700   // Headlines
```

### Line Heights

```tsx
leading-tight      → 1.25   // Headlines
leading-snug       → 1.375  // Subheadings
leading-normal     → 1.5    // Body text
leading-relaxed    → 1.625  // Reading text
```

### Text Styles

```tsx
// Headline (wie Porsche)
<h1 className="text-6xl font-bold leading-tight tracking-tight">
  Headline
</h1>

// Subheading
<h2 className="text-4xl font-semibold leading-snug">
  Subheading
</h2>

// Body
<p className="text-base font-normal leading-relaxed text-gray-300">
  Body text with comfortable reading.
</p>

// Caption
<span className="text-xs font-medium uppercase tracking-wider text-gray-500">
  Caption
</span>
```

---

## 🔲 Rounded Corners (wie Porsche)

### Border Radius Scale

```javascript
// tailwind.config.js
borderRadius: {
  'none': '0',
  'sm': '4px',       // Small elements
  'DEFAULT': '8px',  // Standard (Porsche style!)
  'md': '8px',       // Medium (same as default)
  'lg': '12px',      // Large cards
  'xl': '16px',      // Extra large
  '2xl': '24px',     // Hero sections
  'full': '9999px',  // Circles, pills
}
```

### Verwendung

```tsx
// Standard Cards (8px wie Porsche)
rounded-md          oder    rounded

// Buttons (8px)
rounded-md

// Large Cards
rounded-lg

// Hero Sections
rounded-2xl

// Avatar/Icons
rounded-full

// Input Fields
rounded-md
```

---

## 🧩 Component Styles

### 1. Buttons

**Primary Button** (Gradient - nur für CTAs!):
```tsx
<button className="
  px-6 py-3
  bg-apple-gradient
  text-white font-semibold
  rounded-md
  hover:shadow-apple-glow
  hover:scale-105
  transition-all duration-300
  focus:outline-none focus:ring-2 focus:ring-pink-500
">
  Get Started
</button>
```

**Secondary Button** (Porsche Style):
```tsx
<button className="
  px-6 py-3
  bg-white/10
  backdrop-blur-sm
  text-white font-semibold
  rounded-md
  border border-white/20
  hover:bg-white/20
  hover:border-white/40
  transition-all duration-300
">
  Learn More
</button>
```

**Ghost Button**:
```tsx
<button className="
  px-6 py-3
  text-white font-semibold
  rounded-md
  hover:bg-white/5
  transition-all duration-300
">
  Cancel
</button>
```

### 2. Cards (Porsche Inspired)

**Standard Card**:
```tsx
<div className="
  bg-white/5
  backdrop-blur-md
  border border-white/10
  rounded-lg
  p-8
  hover:bg-white/10
  hover:border-white/20
  hover:scale-[1.02]
  transition-all duration-300
">
  Content
</div>
```

**Featured Card** (mit Gradient):
```tsx
<div className="
  bg-gradient-to-br from-white/10 to-transparent
  backdrop-blur-md
  border border-white/20
  rounded-lg
  p-8
  hover:shadow-apple-glow
  hover:scale-[1.02]
  transition-all duration-300
">
  Featured Content
</div>
```

### 3. Navigation (Porsche Style)

```tsx
<nav className="
  fixed top-0 left-0 right-0 z-50
  bg-black/80
  backdrop-blur-[32px]
  border-b border-white/10
  h-16 md:h-20
">
  <div className="container mx-auto px-6 h-full flex items-center justify-between">
    {/* Logo */}
    <div className="text-2xl font-bold text-gradient">
      Eckert Preisser
    </div>

    {/* Navigation Links */}
    <div className="hidden md:flex items-center gap-8">
      <a className="text-gray-300 hover:text-white transition-colors duration-300">
        Home
      </a>
      {/* More links */}
    </div>

    {/* CTA */}
    <button className="px-6 py-2 bg-apple-gradient rounded-md">
      Get Started
    </button>
  </div>
</nav>
```

### 4. Input Fields

```tsx
<input className="
  w-full
  px-4 py-3
  bg-white/5
  backdrop-blur-sm
  border border-white/20
  rounded-md
  text-white placeholder-gray-500
  focus:bg-white/10
  focus:border-white/40
  focus:outline-none
  focus:ring-2 focus:ring-pink-500/50
  transition-all duration-300
" />
```

### 5. Images

```tsx
// Standard Image
<img className="
  w-full h-auto
  rounded-lg
  object-cover
" />

// Avatar
<img className="
  w-12 h-12
  rounded-full
  object-cover
  border-2 border-white/20
" />

// Hero Image
<img className="
  w-full h-auto
  rounded-2xl
  object-cover
  shadow-2xl
" />
```

---

## ✨ Animations

### Hover Animations

```tsx
// Subtle Scale (wie Porsche)
hover:scale-[1.02]          // Cards
hover:scale-105             // Buttons
hover:scale-110             // Icons

// Opacity
hover:opacity-80            // Images
hover:opacity-60            // Overlays

// Glow (nur für Highlights!)
hover:shadow-apple-glow
hover:shadow-apple-glow-lg
```

### Scroll Animations (mit Framer Motion)

```tsx
import { motion } from 'framer-motion'

// Fade In Up
<motion.div
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, ease: 'easeOut' }}
  viewport={{ once: true, amount: 0.3 }}
>
  Content
</motion.div>

// Staggered Children
<motion.div
  initial="hidden"
  whileInView="visible"
  variants={{
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } }
  }}
>
  {items.map((item, i) => (
    <motion.div
      key={i}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
      }}
    >
      {item}
    </motion.div>
  ))}
</motion.div>

// Scale In
<motion.div
  initial={{ opacity: 0, scale: 0.9 }}
  whileInView={{ opacity: 1, scale: 1 }}
  transition={{ duration: 0.5 }}
>
  Content
</motion.div>
```

### Transition Duration

```tsx
duration-200    // Fast (Hover effects)
duration-300    // Standard (Most interactions)
duration-500    // Slow (Page transitions)
duration-700    // Very slow (Hero animations)
```

### Easing

```tsx
ease-linear         // Linear
ease-in-out         // Standard (verwende dies meistens!)
ease-out            // Scroll animations
ease-in             // Selten verwenden
```

---

## 📱 Responsive Design (Mobile First!)

### Breakpoints

```javascript
// tailwind.config.js (default)
sm:   640px   // Small tablets
md:   768px   // Tablets
lg:   1024px  // Desktop
xl:   1280px  // Large desktop
2xl:  1536px  // Extra large
```

### Mobile First Approach

**IMMER von klein nach groß:**

```tsx
// ✅ RICHTIG - Mobile First
<div className="
  text-2xl md:text-4xl lg:text-6xl
  p-4 md:p-8 lg:p-12
  grid-cols-1 md:grid-cols-2 lg:grid-cols-3
">

// ❌ FALSCH - Desktop First
<div className="
  lg:text-6xl md:text-4xl text-2xl
">
```

### Responsive Patterns

**Hero Section:**
```tsx
<section className="
  min-h-screen
  px-4 md:px-8 lg:px-12
  py-16 md:py-24 lg:py-32
">
  <h1 className="
    text-4xl md:text-5xl lg:text-6xl xl:text-7xl
    font-bold leading-tight
  ">
    Hero Title
  </h1>
</section>
```

**Grid Layouts:**
```tsx
// 1 → 2 → 3 Columns
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

// 1 → 2 → 4 Columns
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

// Sidebar Layout
<div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
  <aside className="lg:col-span-3">Sidebar</aside>
  <main className="lg:col-span-9">Content</main>
</div>
```

**Hide/Show on Breakpoints:**
```tsx
hidden md:block              // Hide mobile, show tablet+
block md:hidden              // Show mobile, hide tablet+
hidden lg:flex               // Hide until desktop
```

### Touch Targets (Mobile)

```tsx
// Minimum 44x44px for touch targets
min-h-[44px] min-w-[44px]

// Better spacing on mobile
space-y-4 md:space-y-2       // More spacing on mobile
gap-4 md:gap-3               // Larger gaps on mobile
```

---

## 🎭 Backdrop Effects (Porsche Style!)

### Blur Effects

```tsx
// Navigation
backdrop-blur-[32px]        // Strong blur (Porsche style)

// Cards
backdrop-blur-md            // 12px blur

// Modals
backdrop-blur-xl            // 24px blur

// Overlays
backdrop-blur-sm            // 4px blur
```

### Glassmorphism

```tsx
// Perfect Glassmorphism Card
<div className="
  bg-white/5
  backdrop-blur-md
  border border-white/10
  rounded-lg
  p-8
  shadow-2xl
">
  Content
</div>
```

---

## 🎬 Animation Library

### Preset Animations (in Tailwind Config)

```javascript
// tailwind.config.js
animation: {
  'fade-in': 'fadeIn 0.5s ease-in-out',
  'slide-up': 'slideUp 0.6s ease-out',
  'slide-down': 'slideDown 0.6s ease-out',
  'slide-left': 'slideLeft 0.6s ease-out',
  'slide-right': 'slideRight 0.6s ease-out',
  'scale-in': 'scaleIn 0.5s ease-out',
  'glow': 'glow 2s ease-in-out infinite alternate',
  'float': 'float 3s ease-in-out infinite',
},
keyframes: {
  fadeIn: {
    '0%': { opacity: '0' },
    '100%': { opacity: '1' },
  },
  slideUp: {
    '0%': { transform: 'translateY(30px)', opacity: '0' },
    '100%': { transform: 'translateY(0)', opacity: '1' },
  },
  slideDown: {
    '0%': { transform: 'translateY(-30px)', opacity: '0' },
    '100%': { transform: 'translateY(0)', opacity: '1' },
  },
  slideLeft: {
    '0%': { transform: 'translateX(30px)', opacity: '0' },
    '100%': { transform: 'translateX(0)', opacity: '1' },
  },
  slideRight: {
    '0%': { transform: 'translateX(-30px)', opacity: '0' },
    '100%': { transform: 'translateX(0)', opacity: '1' },
  },
  scaleIn: {
    '0%': { transform: 'scale(0.9)', opacity: '0' },
    '100%': { transform: 'scale(1)', opacity: '1' },
  },
  glow: {
    '0%': { boxShadow: '0 0 5px rgba(236, 72, 153, 0.5)' },
    '100%': { boxShadow: '0 0 25px rgba(236, 72, 153, 0.8)' },
  },
  float: {
    '0%, 100%': { transform: 'translateY(0)' },
    '50%': { transform: 'translateY(-10px)' },
  },
}
```

### Verwendung

```tsx
// CSS Animations
animate-fade-in
animate-slide-up
animate-glow
animate-float

// Mit Delay
animate-fade-in animation-delay-100
animate-fade-in animation-delay-200
```

---

## 🎨 Visual Effects

### Shadows

```tsx
// Subtle shadows (Porsche style)
shadow-sm               // Minimal
shadow-md               // Standard
shadow-lg               // Elevated
shadow-2xl              // Hero elements

// Colored shadows (nur für Highlights!)
shadow-apple-glow       // Pink glow
shadow-apple-glow-lg    // Stronger glow

// No shadow
shadow-none
```

### Gradients

```tsx
// Apple Gradient (nur für Highlights!)
bg-apple-gradient                              // Background
bg-gradient-to-r from-pink-500 via-purple-500 to-yellow-500

// Text Gradient
bg-apple-gradient bg-clip-text text-transparent

// Gradient Borders (advanced)
<div className="relative p-[1px] rounded-lg bg-apple-gradient">
  <div className="bg-black rounded-lg p-8">
    Content with gradient border
  </div>
</div>
```

### Opacity

```tsx
// Backgrounds
bg-black/80             // 80% black
bg-white/10             // 10% white overlay

// Text
text-white/90           // 90% white text

// Borders
border-white/20         // 20% white border
```

---

## 📦 Layout Patterns

### Hero Section

```tsx
<section className="
  relative
  min-h-screen
  flex items-center
  px-6 md:px-12 lg:px-24
  py-20 md:py-32
  overflow-hidden
">
  {/* Background Gradient */}
  <div className="
    absolute inset-0
    bg-gradient-to-br from-pink-500/10 via-purple-500/10 to-yellow-500/10
    opacity-20
  " />

  {/* Content */}
  <div className="relative z-10 container mx-auto">
    <motion.h1
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-6xl md:text-7xl lg:text-8xl font-bold mb-6"
    >
      Hero <span className="text-gradient">Title</span>
    </motion.h1>

    <motion.p
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="text-xl md:text-2xl text-gray-300 mb-12 max-w-2xl"
    >
      Subtitle text
    </motion.p>

    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="flex gap-4"
    >
      <Button variant="gradient">Get Started</Button>
      <Button variant="secondary">Learn More</Button>
    </motion.div>
  </div>
</section>
```

### Feature Grid

```tsx
<section className="container mx-auto px-6 py-20">
  <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
    Features
  </h2>

  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    {features.map((feature, i) => (
      <motion.div
        key={i}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: i * 0.1 }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <Card>
          <div className="text-4xl mb-4">{feature.icon}</div>
          <h3 className="text-2xl font-semibold mb-3">{feature.title}</h3>
          <p className="text-gray-400">{feature.description}</p>
        </Card>
      </motion.div>
    ))}
  </div>
</section>
```

### Full-Width Section

```tsx
<section className="
  w-full
  py-20 md:py-32
  bg-gray-950
">
  <div className="container mx-auto px-6">
    <h2 className="text-5xl font-bold mb-12">Section Title</h2>
    {/* Content */}
  </div>
</section>
```

---

## 🎯 Spacing Guidelines

### Section Spacing

```tsx
// Small sections
py-12 md:py-16

// Medium sections
py-16 md:py-24

// Large sections
py-20 md:py-32

// Hero sections
py-24 md:py-40 lg:py-48
```

### Content Spacing

```tsx
// Headlines → Text
mb-4 md:mb-6

// Text → Button
mb-8 md:mb-12

// Sections
space-y-12 md:space-y-16 lg:space-y-24
```

### Grid Gaps

```tsx
gap-4           // Tight
gap-6           // Standard
gap-8           // Comfortable
gap-12          // Loose
```

---

## 🎨 Design Patterns

### Pattern 1: Alternating Sections

```tsx
{/* Section 1 - Dark */}
<section className="bg-eckert-black py-24">
  ...
</section>

{/* Section 2 - Darker */}
<section className="bg-gray-950 py-24">
  ...
</section>

{/* Section 3 - Dark */}
<section className="bg-eckert-black py-24">
  ...
</section>
```

### Pattern 2: Image + Text

```tsx
<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
  {/* Image */}
  <motion.div
    initial={{ opacity: 0, x: -50 }}
    whileInView={{ opacity: 1, x: 0 }}
  >
    <img src="..." className="rounded-2xl" />
  </motion.div>

  {/* Text */}
  <motion.div
    initial={{ opacity: 0, x: 50 }}
    whileInView={{ opacity: 1, x: 0 }}
  >
    <h2 className="text-4xl font-bold mb-6">Title</h2>
    <p className="text-gray-300 mb-8">Description</p>
    <Button variant="gradient">Learn More</Button>
  </motion.div>
</div>
```

### Pattern 3: CTA Section

```tsx
<section className="
  relative py-32
  bg-gradient-to-br from-pink-500/20 via-purple-500/20 to-yellow-500/20
">
  <div className="container mx-auto px-6 text-center">
    <h2 className="text-5xl md:text-6xl font-bold mb-6">
      Ready to <span className="text-gradient">Get Started?</span>
    </h2>
    <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
      Join thousands of companies using our platform
    </p>
    <Button variant="gradient" size="lg">
      Start Free Trial
    </Button>
  </div>
</section>
```

---

## 🎯 DO's and DON'Ts

### ✅ DO's

**Colors:**
- ✅ Verwende hauptsächlich Schwarz/Weiß
- ✅ Apple Gradient nur für CTAs und Highlights
- ✅ Grautöne für Text-Hierarchie
- ✅ Translucent backgrounds (bg-white/10)

**Layout:**
- ✅ Mobile First denken
- ✅ Konsistente Spacing (4, 8, 12, 16, 24)
- ✅ Container für Content Width
- ✅ Generous whitespace

**Typography:**
- ✅ Klare Hierarchie
- ✅ Responsive Font Sizes
- ✅ Readable Line Heights
- ✅ Limited Font Weights

**Animations:**
- ✅ Subtle und smooth
- ✅ Purpose-driven (nicht nur "cool")
- ✅ Performance im Blick (transform statt top/left)
- ✅ Reduced motion respektieren

**Components:**
- ✅ Rounded Corners (8px default)
- ✅ Backdrop blur für Glassmorphism
- ✅ Subtle hover effects
- ✅ Konsistent across app

### ❌ DON'Ts

**Colors:**
- ❌ Zu viele Farben verwenden
- ❌ Apple Gradient überall (nur Highlights!)
- ❌ Grelle Farben
- ❌ Inkonsistente Grautöne

**Layout:**
- ❌ Desktop First entwickeln
- ❌ Inkonsistente Spacing
- ❌ Zu enge Layouts
- ❌ Zu volle Seiten

**Typography:**
- ❌ Zu viele Font Weights
- ❌ Zu kleine Font Sizes auf Mobile
- ❌ Schlechte Line Heights
- ❌ ALL CAPS Text (selten verwenden)

**Animations:**
- ❌ Zu viele Animationen
- ❌ Zu schnelle/langsame Animationen
- ❌ Animationen ohne Purpose
- ❌ Schwere Animationen (Performance!)

**Components:**
- ❌ Scharfe Ecken (immer rounded!)
- ❌ Harte Borders (verwende translucent)
- ❌ Aggressive hover effects
- ❌ Inkonsistente Styles

---

## 📋 Component Checklist

Jede Component muss haben:

- [ ] TypeScript Props Interface
- [ ] Responsive Design (Mobile First)
- [ ] Hover States
- [ ] Focus States (Accessibility!)
- [ ] Loading States (wenn async)
- [ ] Error States
- [ ] Disabled States
- [ ] Dark Background Optimierung
- [ ] Framer Motion Animation
- [ ] Tailwind CSS (kein custom CSS!)

---

## 🎨 Example: Complete Page

```tsx
import { motion } from 'framer-motion'
import { Button, Card, LanguageSwitcher } from '@eckert-preisser/shared/ui'
import { t } from '@eckert-preisser/shared/utils'

const ProductPage = () => {
  return (
    <div className="min-h-screen bg-eckert-black">
      {/* Header with backdrop blur (Porsche style) */}
      <header className="
        fixed top-0 left-0 right-0 z-50
        bg-black/80 backdrop-blur-[32px]
        border-b border-white/10
      ">
        <nav className="container mx-auto px-6 h-20 flex items-center justify-between">
          <div className="text-2xl font-bold text-gradient">
            Eckert Preisser
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a className="text-gray-300 hover:text-white transition-colors">
              {t('nav.home')}
            </a>
            <a className="text-gray-300 hover:text-white transition-colors">
              {t('nav.products')}
            </a>
            <LanguageSwitcher />
            <Button variant="gradient" size="sm">
              {t('button.get.started')}
            </Button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="
        relative pt-32 pb-20 px-6
        min-h-[80vh] flex items-center
      ">
        {/* Background gradient (subtle) */}
        <div className="
          absolute inset-0
          bg-gradient-to-br from-pink-500/5 via-purple-500/5 to-yellow-500/5
        " />

        <div className="relative z-10 container mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="
              text-5xl md:text-6xl lg:text-7xl
              font-bold leading-tight mb-6
            "
          >
            {t('products.hero.title')}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-300 mb-12 max-w-2xl"
          >
            {t('products.hero.subtitle')}
          </motion.p>
        </div>
      </section>

      {/* Products Grid */}
      <section className="container mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <Card hover>
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
                <h3 className="text-2xl font-semibold mb-2">
                  {product.name}
                </h3>
                <p className="text-gray-400 mb-4">
                  {product.description}
                </p>
                <Button variant="secondary" className="w-full">
                  {t('button.learn.more')}
                </Button>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  )
}
```

---

## 🔍 Accessibility

### Focus States

```tsx
// Alle interaktive Elemente MÜSSEN Focus haben
focus:outline-none
focus:ring-2
focus:ring-pink-500
focus:ring-offset-2
focus:ring-offset-black
```

### ARIA Labels

```tsx
<button aria-label={t('button.close')}>
  <X />
</button>

<nav aria-label="Main navigation">
  ...
</nav>
```

### Keyboard Navigation

```tsx
// Tab-Index für custom interactive elements
tabIndex={0}

// Skip to content link
<a href="#main" className="sr-only focus:not-sr-only">
  Skip to content
</a>
```

---

## 📏 Measurements

### Standard Sizes

```tsx
// Heights
h-10            // Small buttons (40px)
h-12            // Standard buttons (48px)
h-14            // Large buttons (56px)
h-16            // Header height mobile (64px)
h-20            // Header height desktop (80px)

// Widths
w-full          // Full width
w-auto          // Auto width
max-w-7xl       // Content max-width

// Icons
w-5 h-5         // Small icons (20px)
w-6 h-6         // Medium icons (24px)
w-8 h-8         // Large icons (32px)
```

---

## 🎬 Performance

### Optimize Animations

```tsx
// ✅ GOOD - GPU accelerated
transform: translate3d(0, 0, 0)
will-change: transform

// ❌ BAD - CPU intensive
top: 0
left: 0
```

### Lazy Load Images

```tsx
<img
  src={image}
  loading="lazy"
  decoding="async"
  alt="..."
/>
```

### Reduce Motion

```tsx
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 🎨 Quick Reference

### Standard Component Template

```tsx
import React from 'react'
import { motion } from 'framer-motion'
import clsx from 'clsx'

interface ComponentProps {
  className?: string
  children: React.ReactNode
  variant?: 'default' | 'gradient'
}

export const Component: React.FC<ComponentProps> = ({
  className,
  children,
  variant = 'default',
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={clsx(
        'bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-8',
        'hover:bg-white/10 hover:border-white/20 hover:scale-[1.02]',
        'transition-all duration-300',
        variant === 'gradient' && 'hover:shadow-apple-glow',
        className
      )}
    >
      {children}
    </motion.div>
  )
}
```

---

**Last Updated**: 2025-10-14
**Version**: 1.0.0
