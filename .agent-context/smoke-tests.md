# Smoke Tests - ContentMorph

## Build & Type Safety
- ✅ `npm run build` succeeds without errors
- ✅ `npm run type-check` (or tsc) passes
- ✅ No console warnings during build

---

## Critical Path Tests

### 1. Landing Page Load
**Test:** Navigate to `/`
- ✅ Page loads without errors
- ✅ URL input form is visible
- ✅ Submit button is present
- ✅ Dark mode toggle works

### 2. YouTube URL Validation
**Test:** Enter invalid URL
- ✅ Error message displays: "Please enter a valid YouTube URL"
- ✅ Submit button disabled or shows error

**Test:** Enter valid URL (e.g., `https://www.youtube.com/watch?v=dQw4w9WgXcQ`)
- ✅ No validation error
- ✅ Submit button enabled

### 3. Transcript Extraction (Happy Path)
**Test:** Submit valid YouTube URL with subtitles
- ✅ Loading state displays (spinner or skeleton)
- ✅ API call to `/api/transcribe` succeeds
- ✅ Response contains `transcript` and `language`
- ✅ Redirect to `/result` page

**Test:** Submit valid YouTube URL without subtitles
- ✅ Falls back to audio download + Whisper
- ✅ Transcript extracted successfully
- ✅ Redirect to `/result` page

### 4. Content Conversion
**Test:** On `/result` page after transcription
- ✅ API call to `/api/convert` triggers automatically
- ✅ Loading state for conversion
- ✅ All 3 formats generated:
  - Blog post (1500+ chars)
  - Twitter thread (5-7 tweets)
  - LinkedIn post (300+ chars)

### 5. Result Display & Tabs
**Test:** View converted content
- ✅ Tabs for Blog, Twitter, LinkedIn visible
- ✅ Clicking each tab shows correct content
- ✅ Active tab highlighted

### 6. Copy to Clipboard
**Test:** Click "Copy" button on each format
- ✅ Blog content copied to clipboard
- ✅ Twitter thread copied (newlines preserved)
- ✅ LinkedIn post copied
- ✅ Toast/feedback message: "Copied!"

### 7. Rate Limiting
**Test:** Exceed daily limit (4th conversion in same day)
- ✅ Error message: "Daily limit reached (3/day)"
- ✅ HTTP 429 status from API
- ✅ Suggest upgrade to Pro (future)

**Test:** Next day (localStorage date changes)
- ✅ Counter resets to 0
- ✅ Conversions allowed again

---

## Error Handling Tests

### 8. Invalid API Key
**Test:** Remove or corrupt `OPENAI_API_KEY`
- ✅ API returns 500 with user-friendly error
- ✅ Error message: "Service temporarily unavailable"

### 9. Network Failure
**Test:** Disable internet during API call
- ✅ Error message: "Network error. Please try again."
- ✅ Retry option available

### 10. YouTube URL Inaccessible
**Test:** Submit URL of private/deleted video
- ✅ Error message: "Video not accessible"
- ✅ User can try different URL

---

## UI/UX Tests

### 11. Mobile Responsiveness
**Test:** Open on mobile viewport (375px width)
- ✅ Layout adjusts properly
- ✅ No horizontal scroll
- ✅ Buttons tappable (min 44px touch target)

### 12. Dark Mode
**Test:** Toggle dark mode
- ✅ All components switch to dark theme
- ✅ No unreadable text (contrast check)
- ✅ Preference persists on reload

---

## Performance Checks

### 13. Load Time
- ✅ Initial page load < 2 seconds (localhost)
- ✅ API response < 10 seconds for typical YouTube video

### 14. Large Transcript Handling
**Test:** Submit 2-hour podcast URL
- ✅ Whisper API handles (or chunks if needed)
- ✅ Conversion completes without timeout
- ✅ UI doesn't freeze

---

## Acceptance Criteria

**All tests must pass before moving to next project.**

**Critical blockers (must fix):**
- Build failures
- API route crashes
- Unable to complete conversion flow
- Rate limit not enforced

**Minor issues (can defer):**
- Styling tweaks
- Loading animation polish
- Better error messages

---

## Test Execution

Run tests manually in order:
1. Fresh `npm run build`
2. `npm run dev` and open browser
3. Execute each test case
4. Document results in `.agent-context/test-results.md`

**Pass criteria:** All ✅ checks green.
