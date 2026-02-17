# ContentMorph Component Specifications

## Core Components

### 1. URL Input Form

**Purpose:** Primary input for YouTube/podcast URLs

```tsx
<div className="w-full max-w-2xl mx-auto">
  <label className="block text-sm font-medium mb-2 text-text-secondary">
    YouTube or Podcast URL
  </label>
  <div className="flex gap-2">
    <input
      type="url"
      placeholder="https://youtube.com/watch?v=..."
      className="flex-1 border border-border focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 rounded-lg px-4 py-3 text-base bg-bg-primary transition-all"
    />
    <button className="bg-brand-primary hover:bg-brand-primary-hover text-white px-6 py-3 rounded-lg font-medium transition-all whitespace-nowrap">
      Convert
    </button>
  </div>
  <p className="text-xs text-text-muted mt-2">
    Supports YouTube, Spotify, Apple Podcasts
  </p>
</div>
```

**States:**
- Default
- Focus (blue ring)
- Error (red border)
- Loading (disabled with spinner)

---

### 2. Format Tab Selector

**Purpose:** Switch between blog/Twitter/LinkedIn outputs

```tsx
<div className="flex gap-2 border-b border-border mb-6">
  <button className="px-4 py-3 font-medium border-b-2 border-brand-primary text-brand-primary">
    📝 Blog Post
  </button>
  <button className="px-4 py-3 font-medium border-b-2 border-transparent text-text-secondary hover:text-text-primary transition-colors">
    🐦 Twitter Thread
  </button>
  <button className="px-4 py-3 font-medium border-b-2 border-transparent text-text-secondary hover:text-primary transition-colors">
    💼 LinkedIn
  </button>
</div>
```

**Behavior:**
- Active tab: Brand color border + text
- Hover: Text color transition
- Click: Smooth content transition

---

### 3. Result Card

**Purpose:** Display converted content with copy functionality

```tsx
<div className="bg-bg-secondary border border-border rounded-xl p-6 shadow-sm">
  <div className="flex justify-between items-center mb-4">
    <h3 className="text-xl font-semibold text-text-primary">Blog Post</h3>
    <button className="flex items-center gap-2 px-4 py-2 border border-border hover:border-brand-primary hover:text-brand-primary rounded-lg transition-all">
      <ClipboardIcon className="w-4 h-4" />
      Copy
    </button>
  </div>
  <div className="prose dark:prose-invert max-w-none">
    {/* Converted content */}
  </div>
  <div className="mt-4 text-sm text-text-muted">
    1,247 characters
  </div>
</div>
```

**Features:**
- Copy button with success feedback
- Character count
- Formatted markdown preview

---

### 4. Loading Skeleton

**Purpose:** Show progress during conversion

```tsx
<div className="space-y-4 animate-pulse">
  <div className="h-8 bg-bg-tertiary rounded-lg w-3/4"></div>
  <div className="h-4 bg-bg-tertiary rounded w-full"></div>
  <div className="h-4 bg-bg-tertiary rounded w-5/6"></div>
  <div className="h-4 bg-bg-tertiary rounded w-4/6"></div>
</div>
```

**Usage:** Display while API processes content

---

### 5. Usage Limit Badge

**Purpose:** Show remaining free conversions

```tsx
<div className="flex items-center gap-2 px-3 py-2 bg-bg-tertiary border border-border rounded-lg text-sm">
  <span className="text-text-secondary">Daily limit:</span>
  <span className="font-semibold text-brand-primary">2/3 used</span>
  <button className="ml-2 text-xs text-brand-primary hover:underline">
    Upgrade
  </button>
</div>
```

**States:**
- Normal: 0-2 used (green/neutral)
- Warning: 3/3 used (yellow)
- Blocked: Limit reached (red)

---

### 6. Error Alert

**Purpose:** Display API errors or validation messages

```tsx
<div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
  <div className="flex gap-3">
    <AlertIcon className="w-5 h-5 text-red-500 flex-shrink-0" />
    <div>
      <h4 className="font-medium text-red-900 dark:text-red-200">
        Invalid URL
      </h4>
      <p className="text-sm text-red-700 dark:text-red-300 mt-1">
        Please enter a valid YouTube or podcast URL
      </p>
    </div>
  </div>
</div>
```

**Variants:**
- Error (red)
- Warning (yellow)
- Info (blue)
- Success (green)

---

### 7. CTA Button (Primary)

**Purpose:** Main conversion action

```tsx
<button className="w-full bg-brand-primary hover:bg-brand-primary-hover text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed">
  Convert to Content
</button>
```

**States:**
- Default
- Hover (darker + larger shadow)
- Disabled (opacity 50%)
- Loading (spinner icon)

---

## Layout Components

### Hero Section

```tsx
<section className="max-w-4xl mx-auto text-center py-16 px-6">
  <h1 className="text-4xl md:text-5xl font-bold mb-4 text-text-primary">
    Transform Videos into <span className="text-brand-primary">Engaging Content</span>
  </h1>
  <p className="text-lg text-text-secondary mb-8">
    Convert YouTube videos and podcasts into blog posts, tweets, and LinkedIn content in seconds
  </p>
  {/* URL Input Form */}
</section>
```

### Result Grid

```tsx
<div className="grid md:grid-cols-3 gap-6 mt-12">
  {/* Result Card × 3 */}
</div>
```

## Shadcn/ui Components to Use

Install these shadcn components:

```bash
npx shadcn-ui@latest add button
npx shadcn-ui@latest add input
npx shadcn-ui@latest add card
npx shadcn-ui@latest add tabs
npx shadcn-ui@latest add alert
npx shadcn-ui@latest add skeleton
npx shadcn-ui@latest add badge
```

Customize with design tokens from `tokens.css`.
