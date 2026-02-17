# ContentMorph Design System - Style Guide

## Brand Identity

**Personality:** Modern, Efficient, Creator-Friendly  
**Tone:** Clean, Professional, Approachable  
**Target:** Content creators, podcasters, YouTubers

## Color Usage

### Primary Colors
- **Purple (`--brand-primary`):** Primary actions, CTA buttons, links
- **Indigo (`--brand-secondary`):** Secondary elements, hover states
- **Sky (`--brand-accent`):** Accents, highlights, progress indicators

### Semantic Colors
- ✅ **Success (Green):** Successful conversions, completion states
- ⚠️ **Warning (Yellow):** Usage limits, warnings
- ❌ **Error (Red):** Errors, failed states
- ℹ️ **Info (Blue):** Tips, informational messages

### Color Contrast
All color combinations meet **WCAG AA** standards (4.5:1 for normal text, 3:1 for large text).

## Typography

### Font Family
- **Primary:** System font stack (optimized for readability)
- **Monospace:** Code/URL display

### Scale
- **4xl (36px):** Hero headings
- **3xl (30px):** Page titles
- **2xl (24px):** Section headings
- **xl (20px):** Card titles
- **lg (18px):** Subheadings
- **base (16px):** Body text (default)
- **sm (14px):** Helper text
- **xs (12px):** Labels, badges

### Font Weight
- **400:** Regular body text
- **500:** Medium (emphasis)
- **600:** Semibold (headings)
- **700:** Bold (strong emphasis)

## Spacing

Use the `--space-*` tokens for consistent spacing:
- **Stack (vertical):** 4, 6, 8, 12 for element spacing
- **Inline (horizontal):** 2, 3, 4 for inline elements
- **Container padding:** 6 (mobile), 8 (tablet), 12 (desktop)

## Components

### Buttons
```tsx
// Primary action
<button className="bg-brand-primary hover:bg-brand-primary-hover text-white rounded-lg px-6 py-3 font-medium transition-all">
  Convert Content
</button>

// Secondary action
<button className="border border-border hover:border-border-hover rounded-lg px-6 py-3 font-medium transition-all">
  Cancel
</button>
```

### Cards
```tsx
<div className="bg-bg-secondary border border-border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
  {/* Card content */}
</div>
```

### Input Fields
```tsx
<input 
  className="w-full border border-border focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 rounded-lg px-4 py-3 text-base transition-all"
  type="text"
  placeholder="Paste YouTube URL..."
/>
```

## Dark Mode

- Always provide dark mode variants
- Use `dark:` prefix for Tailwind classes
- Test all colors in both modes
- Dark mode toggle should be accessible and prominent

## Accessibility

- All interactive elements must have focus states
- Minimum touch target: 44x44px
- Alt text for all images
- Semantic HTML (`<button>`, `<nav>`, etc.)
- Keyboard navigation support

## Animation

- Use `transition-all` or specific transitions
- Duration: `--transition-fast` (150ms) for micro-interactions
- Duration: `--transition-base` (200ms) for standard transitions
- Avoid animations longer than 300ms for UI feedback

## Layout

### Grid System
- Mobile: Single column
- Tablet: 2 columns (768px+)
- Desktop: 12 column grid (1024px+)

### Max Width
- Content: 1280px (container max-width)
- Text: 65ch (optimal reading length)

## Integration

Add this to your `app/layout.tsx`:

```tsx
import './.design-system/tokens.css'

export default function RootLayout({ children }) {
  return (
    <html lang="ko" className="dark"> {/* or light */}
      <body className="bg-bg-primary text-text-primary">
        {children}
      </body>
    </html>
  )
}
```

## Do's and Don'ts

### ✅ Do
- Use design tokens instead of hardcoded values
- Maintain consistent spacing throughout
- Test in both light and dark modes
- Use semantic color names (success, error, etc.)

### ❌ Don't
- Use arbitrary colors outside the design system
- Mix spacing scales inconsistently
- Forget focus states on interactive elements
- Use pure black (#000) or pure white (#fff) for backgrounds
