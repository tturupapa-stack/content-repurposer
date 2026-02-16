# Code Conventions - ContentMorph

## Project Structure
```
content-repurposer/
├── app/
│   ├── page.tsx                 # Landing + URL input form
│   ├── result/
│   │   └── page.tsx             # Conversion results with tabs
│   ├── api/
│   │   ├── transcribe/
│   │   │   └── route.ts         # POST /api/transcribe
│   │   └── convert/
│   │       └── route.ts         # POST /api/convert
│   ├── layout.tsx
│   └── globals.css
├── components/
│   ├── ui/                      # shadcn/ui components
│   ├── url-input-form.tsx
│   ├── conversion-tabs.tsx
│   ├── copy-button.tsx
│   └── loading-skeleton.tsx
├── lib/
│   ├── youtube.ts               # YouTube transcript/audio extraction
│   ├── openai.ts                # OpenAI API helpers
│   ├── rate-limit.ts            # localStorage-based rate limiting
│   ├── validators.ts            # URL validation, etc.
│   └── utils.ts                 # shadcn cn() utility
├── types/
│   └── index.ts                 # Shared TypeScript types
├── .env.local
└── .agent-context/              # This directory
```

---

## Naming Conventions

### Files
- **Components:** kebab-case (e.g., `url-input-form.tsx`)
- **API Routes:** `route.ts` (Next.js 14 convention)
- **Utilities:** kebab-case (e.g., `rate-limit.ts`)
- **Types:** `index.ts` in `types/` folder

### Functions
- **React Components:** PascalCase (e.g., `UrlInputForm`)
- **Utility Functions:** camelCase (e.g., `validateYouTubeUrl`)
- **API Handlers:** `POST`, `GET` (Next.js route handler exports)

### Variables
- **React State:** camelCase (e.g., `isLoading`, `errorMessage`)
- **Constants:** UPPER_SNAKE_CASE (e.g., `MAX_DAILY_USAGE`)
- **Props:** camelCase interface names with `Props` suffix (e.g., `CopyButtonProps`)

---

## TypeScript

### Strict Mode
- `strict: true` in `tsconfig.json`
- No implicit `any`
- Explicit return types for functions

### Type Locations
- Shared types → `types/index.ts`
- Component-specific types → Same file as component
- API types → Same file as route handler

### Import Order
```typescript
// 1. React/Next.js
import { useState } from 'react';
import { useRouter } from 'next/navigation';

// 2. External libraries
import { Button } from '@/components/ui/button';

// 3. Internal utilities
import { validateYouTubeUrl } from '@/lib/validators';

// 4. Types
import type { ConversionResult } from '@/types';

// 5. Styles (if any)
import styles from './component.module.css';
```

---

## Component Patterns

### Server Components (Default)
```typescript
// app/page.tsx
export default function HomePage() {
  return <div>...</div>;
}
```

### Client Components
```typescript
'use client';

import { useState } from 'react';

export default function UrlInputForm() {
  const [url, setUrl] = useState('');
  // ...
}
```

### API Routes
```typescript
// app/api/transcribe/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json();
    // ...
    return NextResponse.json({ transcript, language });
  } catch (error) {
    return NextResponse.json({ error: '...' }, { status: 500 });
  }
}
```

---

## Error Handling

### Try-Catch Pattern
```typescript
try {
  // Operation
} catch (error) {
  console.error('Context:', error);
  return { error: 'User-friendly message', code: 'ERROR_CODE' };
}
```

### API Error Responses
- **400:** Bad request (invalid input)
- **429:** Rate limit exceeded
- **500:** Server error
- **503:** External API failure

---

## Styling

### Tailwind Classes
- Use `cn()` utility from `lib/utils.ts` for conditional classes
- Prefer Tailwind over custom CSS
- shadcn/ui components for UI primitives

### Dark Mode
- Use `dark:` prefix for dark mode variants
- Set default theme in `layout.tsx`

---

## Testing Requirements

### Pre-Deployment Checks
1. `npm run build` must succeed
2. No TypeScript errors
3. No console errors in browser
4. All API routes return proper error codes

### Manual Testing Checklist
- [ ] YouTube URL validation works
- [ ] Transcription succeeds (with/without subtitles)
- [ ] Conversion generates all 3 formats
- [ ] Copy button works for each format
- [ ] Rate limit enforces 3/day
- [ ] Error messages display correctly
- [ ] Mobile responsive
- [ ] Dark mode toggles properly

---

## Environment Variables

### Required
```bash
OPENAI_API_KEY=sk-proj-...
```

### Optional (Future)
```bash
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
```

---

## Git Workflow

### Commit Messages
- `feat: Add YouTube transcript extraction`
- `fix: Handle rate limit edge case`
- `style: Update landing page design`
- `refactor: Split API helpers into modules`

### Branches
- `main` → Production-ready code
- Feature branches optional for solo development
