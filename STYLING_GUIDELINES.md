# Styling Guidelines - Eckert Preisser Enterprise

## 🎨 Design Philosophy

Inspiriert von **Porsche Motorsport** und **Apple** - Minimalistisch, Premium, Professionell.

### Kernprinzipien
1. **Nur Schwarz & Weiß** - KEINE Grautöne! Klare Kontraste
2. **Apple Gradient nur für Hover** - Nie als Standard-Farbe
3. **Smooth Animations** - Alles fühlt sich flüssig und premium an
4. **Mobile First** - Perfekt auf allen Geräten
5. **Konsistenz** - Einheitliches Design durchgehend

---

## 🎨 Farbsystem

### Hauptfarben (NUR diese 2!)

```javascript
// tailwind.config.js
colors: {
  'eckert-black': '#000000',      // Schwarz
  'eckert-white': '#FFFFFF',      // Weiß
}
```

### Verwendungsregeln

**Seiten-Background:**
```tsx
bg-eckert-white         // IMMER weißer Hintergrund
```

**Text auf weißem Hintergrund:**
```tsx
text-black              // IMMER schwarz
text-eckert-black       // IMMER schwarz
```

**Boxen/Cards/Buttons:**
```tsx
bg-black                // IMMER schwarzer Hintergrund
bg-eckert-black         // IMMER schwarzer Hintergrund
```

**Text in schwarzen Boxen:**
```tsx
text-white              // IMMER weiß
text-eckert-white       // IMMER weiß
```

**Borders:**
```tsx
border-black/10         // 10% schwarzer Border
border-black/20         // 20% schwarzer Border
```

**WICHTIG:**
- ✅ **NUR Schwarz & Weiß verwenden!**
- ❌ **KEINE Grautöne** (text-gray-300, text-gray-400, etc.)
- ✅ **Weißer Seitenhintergrund** mit schwarzem Text
- ✅ **Schwarze Boxen** mit weißem Text
- ✅ **Apple Gradient NUR für Hover!**

---

## 🌈 Apple Gradients (NUR für Hover-Effekte!)

### Official Apple Gradient Colors

```javascript
// Official Apple System Colors
'apple-pink': '#FF2D55',      // Apple Pink
'apple-purple': '#AF52DE',    // Apple Purple
'apple-blue': '#007AFF',      // Apple Blue
'apple-orange': '#FF9500',    // Apple Orange
'apple-yellow': '#FFCC00',    // Apple Yellow
'apple-green': '#34C759',     // Apple Green
'apple-red': '#FF3B30',       // Apple Red
```

### Gradient Varianten

**1. Primary Gradient (Pink → Purple → Blue)**
```javascript
'apple-gradient': 'linear-gradient(135deg, #FF2D55 0%, #AF52DE 50%, #007AFF 100%)'
```
**Verwendung:** Standard für alle Hover-Effekte

**2. Warm Gradient (Orange → Pink → Red)**
```javascript
'apple-gradient-warm': 'linear-gradient(135deg, #FF9500 0%, #FF2D55 50%, #FF3B30 100%)'
```
**Verwendung:** Energetische CTAs

**3. Cool Gradient (Green → Blue → Purple)**
```javascript
'apple-gradient-cool': 'linear-gradient(135deg, #34C759 0%, #007AFF 50%, #AF52DE 100%)'
```
**Verwendung:** Success States

**4. Sunset Gradient (Yellow → Orange → Pink)**
```javascript
'apple-gradient-sunset': 'linear-gradient(135deg, #FFCC00 0%, #FF9500 50%, #FF2D55 100%)'
```
**Verwendung:** Subtle Backgrounds

**5. Purple Dream (Purple → Pink)**
```javascript
'apple-gradient-purple': 'linear-gradient(135deg, #AF52DE 0%, #FF2D55 100%)'
```

**6. Ocean (Blue → Purple)**
```javascript
'apple-gradient-ocean': 'linear-gradient(135deg, #007AFF 0%, #AF52DE 100%)'
```

### Gradient Usage (KRITISCH!)

**✅ NUR für:**
- Hover Glow auf Buttons
- Navigation Underlines beim Hover
- Logo Hover (Text wird Gradient)
- Link Hover States
- Language Switcher Hover

**❌ NIEMALS für:**
- Button Backgrounds (Buttons sind schwarz/weiß!)
- Standard Text
- Large areas
- Card Backgrounds
- Navigation Background

---

## 🧩 Component Styles

### 1. Buttons (IMMER Schwarz oder Weiß!)

**Primary Button (Schwarz mit Hover Glow):**
```tsx
<button className="
  px-6 py-3
  bg-black text-white
  font-semibold rounded-md
  hover:shadow-apple-glow
  hover:scale-105
  transition-all duration-300
  focus:outline-none focus:ring-2 focus:ring-black
">
  Get Started
</button>
```

**Secondary Button (Weiß mit Border):**
```tsx
<button className="
  px-6 py-3
  bg-white text-black
  font-semibold rounded-md
  border border-black/20
  hover:shadow-apple-glow
  hover:scale-105
  transition-all duration-300
">
  Learn More
</button>
```

**NIEMALS:**
```tsx
// ❌ FALSCH - Kein Gradient Background!
<button className="bg-apple-gradient">Button</button>
```

---

### 2. Cards (Schwarz mit weißem Text)

**Standard Card:**
```tsx
<div className="
  bg-black text-white
  rounded-lg p-8
  shadow-subtle
  hover:shadow-elevated
  hover:scale-[1.02]
  transition-all duration-300
">
  <h3 className="text-2xl font-semibold text-white">Title</h3>
  <p className="text-white">Description</p>
</div>
```

---

### 3. Navigation (Weiß mit Glassmorphism)

```tsx
<nav className="
  fixed top-0 left-0 right-0 z-50
  bg-white/80
  backdrop-blur-[32px]
  border-b border-black/10
  h-16 md:h-20
">
  <div className="container mx-auto px-6 h-full flex items-center justify-between">
    {/* Logo - schwarz, hover gradient */}
    <a className="text-2xl font-bold text-black hover:bg-apple-gradient hover:bg-clip-text hover:text-transparent">
      Eckert Preisser
    </a>

    {/* Navigation Links - schwarz mit gradient underline */}
    <a className="
      text-black
      relative
      after:absolute after:bottom-0 after:left-0 after:right-0
      after:h-[2px] after:bg-apple-gradient
      after:scale-x-0 hover:after:scale-x-100
      after:transition-transform after:duration-300
    ">
      Home
    </a>

    {/* CTA Button - schwarz mit glow */}
    <button className="
      px-6 py-2
      bg-black text-white
      rounded-md font-semibold
      hover:shadow-apple-glow
    ">
      Get Started
    </button>
  </div>
</nav>
```

---

### 4. Input Fields (Weiß mit schwarzem Text)

```tsx
<input className="
  w-full px-4 py-3
  bg-white
  border border-black/20
  rounded-md
  text-black placeholder-black/40
  focus:border-black/40
  focus:outline-none
  focus:ring-2 focus:ring-pink-500/50
  transition-all duration-300
" />
```

---

## ✨ Hover Effects (Apple Gradient!)

### 1. Button Hover Glow

```tsx
<button className="
  bg-black text-white
  hover:shadow-apple-glow
  hover:scale-105
  transition-all duration-300
">
  Button
</button>
```

**Was passiert:** Rosa/Lila Glow erscheint um den Button

---

### 2. Text Gradient on Hover (Logo)

```tsx
<span className="
  text-black
  hover:bg-apple-gradient
  hover:bg-clip-text
  hover:text-transparent
  transition-all duration-300
">
  Eckert Preisser
</span>
```

**Was passiert:** Text wird zum Gradient

---

### 3. Gradient Underline (Nav Links)

```tsx
<a className="
  text-black
  relative
  after:absolute after:bottom-0 after:left-0 after:right-0
  after:h-[2px] after:bg-apple-gradient
  after:scale-x-0
  hover:after:scale-x-100
  after:transition-transform after:duration-300
">
  Link
</a>
```

**Was passiert:** Gradient Linie erscheint unten

---

### 4. Card Hover

```tsx
<div className="
  bg-black text-white
  hover:shadow-apple-glow
  hover:scale-[1.02]
  transition-all duration-300
">
  Card
</div>
```

**Was passiert:** Subtle scale + Apple Glow

---

## 📱 Responsive Design (Mobile First!)

### Breakpoints

```javascript
sm:   640px   // Small tablets
md:   768px   // Tablets
lg:   1024px  // Desktop
xl:   1280px  // Large desktop
2xl:  1536px  // Extra large
```

### Mobile First Approach

**IMMER von klein nach groß:**

```tsx
// ✅ RICHTIG
<div className="text-2xl md:text-4xl lg:text-6xl">

// ❌ FALSCH
<div className="lg:text-6xl md:text-4xl text-2xl">
```

### Responsive Grid

```tsx
// 1 Spalte mobile → 2 tablet → 3 desktop
grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8

// 1 Spalte mobile → 2 small tablet → 4 desktop
grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6
```

---

## 🔤 Typography

### Font Family

```javascript
fontFamily: {
  sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
  display: ['Inter', 'sans-serif'],
}
```

### Font Sizes (Responsive!)

```tsx
// Headlines auf weißem Hintergrund (schwarz)
text-5xl md:text-6xl lg:text-7xl font-bold text-black

// Body Text auf weißem Hintergrund (schwarz)
text-base md:text-lg text-black

// Text in schwarzen Boxen (weiß!)
text-white

// NIEMALS Grautöne!
```

### Font Weights

```tsx
font-normal   → 400   // Body text
font-medium   → 500   // Emphasized
font-semibold → 600   // Subheadings
font-bold     → 700   // Headlines
```

---

## 🔲 Rounded Corners

```javascript
borderRadius: {
  'DEFAULT': '8px',   // Standard (Porsche!)
  'lg': '12px',       // Large cards
  '2xl': '24px',      // Hero sections
  'full': '9999px',   // Circles
}
```

**Verwendung:**
```tsx
rounded         // 8px - Standard für alles
rounded-lg      // 12px - Große Cards
rounded-2xl     // 24px - Hero Sections
rounded-full    // Pills, Avatars
```

---

## 📦 Layout Components

### Container

```tsx
<Container size="lg">
  Content mit auto margins und responsive padding
</Container>
```

### Section

```tsx
<Section spacing="lg">
  Section mit auto spacing
</Section>
```

### Hero

```tsx
<Hero>
  <HeroTitle>Title (auto schwarz)</HeroTitle>
  <HeroSubtitle>Subtitle (auto schwarz)</HeroSubtitle>
  <HeroActions>
    <Button variant="primary">CTA</Button>
  </HeroActions>
</Hero>
```

---

## 🎬 Animations

### Framer Motion Scroll Animations

```tsx
<motion.div
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
  viewport={{ once: true, amount: 0.3 }}
>
  Content erscheint beim Scrollen
</motion.div>
```

### Staggered Animations

```tsx
{items.map((item, i) => (
  <motion.div
    key={i}
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: i * 0.1 }}
    viewport={{ once: true, amount: 0.3 }}
  >
    {item}
  </motion.div>
))}
```

---

## 🎯 Complete Examples

### Button Example

```tsx
import { Button } from '@eckert-preisser/shared/ui'

// Primary (schwarz mit glow)
<Button variant="primary">Get Started</Button>

// Secondary (weiß mit glow)
<Button variant="secondary">Learn More</Button>
```

### Card Example

```tsx
import { GlassCard } from '@eckert-preisser/shared/ui'

<GlassCard>
  <h3 className="text-2xl font-semibold text-white">Title</h3>
  <p className="text-white">Description in white</p>
</GlassCard>
```

### Page Example

```tsx
import { Hero, HeroTitle, HeroSubtitle, HeroActions, Section, Container, Button, GlassCard } from '@eckert-preisser/shared/ui'

const Page = () => (
  <div className="min-h-screen bg-eckert-white">
    {/* Hero - weißer Background, schwarzer Text */}
    <Hero>
      <Container>
        <HeroTitle>
          Welcome to <span className="text-black">Eckert Preisser</span>
        </HeroTitle>
        <HeroSubtitle>Subtitle text in black</HeroSubtitle>
        <HeroActions>
          <Button variant="primary">Get Started</Button>
          <Button variant="secondary">Learn More</Button>
        </HeroActions>
      </Container>
    </Hero>

    {/* Features - schwarze Cards, weißer Text */}
    <Section spacing="lg">
      <Container>
        <h2 className="text-5xl font-bold text-center mb-16 text-black">
          Features
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <GlassCard>
            <h3 className="text-2xl font-semibold text-white">Feature</h3>
            <p className="text-white">Description</p>
          </GlassCard>
        </div>
      </Container>
    </Section>
  </div>
)
```

---

## 🎨 DO's and DON'Ts

### ✅ DO's

**Farben:**
- ✅ Verwende NUR Schwarz & Weiß
- ✅ Weißer Seitenhintergrund
- ✅ Schwarze Boxen/Buttons
- ✅ Apple Gradient nur für Hover-Effekte
- ✅ Klare Kontraste

**Buttons:**
- ✅ bg-black text-white (Primary)
- ✅ bg-white text-black (Secondary)
- ✅ hover:shadow-apple-glow (Hover Effect)
- ✅ hover:scale-105 (Subtle scale)

**Text:**
- ✅ text-black auf weißem Hintergrund
- ✅ text-white in schwarzen Boxen
- ✅ Keine Grautöne

**Cards:**
- ✅ bg-black text-white
- ✅ rounded-lg (8px)
- ✅ shadow-subtle
- ✅ hover:shadow-elevated

**Hover:**
- ✅ Gradient Glow
- ✅ Gradient Underlines
- ✅ Text → Gradient
- ✅ Subtle scale (1.02 - 1.05)

### ❌ DON'Ts

**Farben:**
- ❌ Grautöne (text-gray-300, bg-gray-50, etc.)
- ❌ Gradient als Standard-Farbe
- ❌ Bunte Backgrounds
- ❌ Gradient Buttons (bg-apple-gradient)

**Text:**
- ❌ text-gray-300 auf weißem Hintergrund
- ❌ text-gradient als Standard
- ❌ Farbiger Text

**Buttons:**
- ❌ bg-apple-gradient (nur schwarz/weiß!)
- ❌ Grelle Farben
- ❌ Zu viele Varianten

**Layout:**
- ❌ Desktop First
- ❌ Inkonsistente Spacing
- ❌ Zu viele Farben

---

## 🎨 Shadows (für Apple Glow)

```javascript
boxShadow: {
  // Normal Shadows
  'subtle': '0 2px 8px rgba(0, 0, 0, 0.08)',
  'elevated': '0 8px 24px rgba(0, 0, 0, 0.12)',

  // Apple Glow (Hover Effects!)
  'apple-glow': '0 0 30px rgba(255, 45, 85, 0.4), 0 0 60px rgba(175, 82, 222, 0.3)',
  'apple-glow-lg': '0 0 40px rgba(255, 45, 85, 0.5), 0 0 80px rgba(175, 82, 222, 0.4)',
}
```

---

## 📏 Spacing

```tsx
p-4   → 16px   // Standard
p-6   → 24px   // Medium
p-8   → 32px   // Large
p-12  → 48px   // XL
p-16  → 64px   // Sections
p-24  → 96px   // Hero

gap-4  // Tight grid
gap-6  // Standard grid
gap-8  // Comfortable grid
```

---

## 📋 Component Checklist

Jede Component MUSS:

- [ ] NUR Schwarz & Weiß verwenden
- [ ] Gradient NUR für Hover
- [ ] Mobile First Responsive
- [ ] Hover States mit Apple Glow
- [ ] Focus States
- [ ] TypeScript Props
- [ ] Framer Motion Animations
- [ ] 8px Rounded Corners
- [ ] Tailwind CSS (kein custom CSS!)

---

## 🎨 Quick Reference Card

```
FARBEN:
✅ Seite: bg-white, text-black
✅ Boxen: bg-black, text-white
✅ Buttons: bg-black (primary), bg-white (secondary)
❌ KEINE Grautöne!

GRADIENT:
✅ NUR für Hover (Glow, Underline, Text-Hover)
❌ NIEMALS als Standard

SPACING:
✅ 8px Rounded Corners
✅ 16px, 24px, 32px, 48px Padding
✅ gap-6 oder gap-8 für Grids

HOVER:
✅ hover:shadow-apple-glow
✅ hover:scale-105 (Buttons)
✅ hover:scale-[1.02] (Cards)
```

---

**Last Updated**: 2025-10-14
**Version**: 2.0.0 (Komplett überarbeitet mit korrektem Farbschema)
