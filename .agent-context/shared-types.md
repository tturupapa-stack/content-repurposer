# Shared Types - ContentMorph

## Core Types

### ConversionResult
```typescript
interface ConversionResult {
  blog: string;
  twitter: string[];
  linkedin: string;
}
```

### TranscriptData
```typescript
interface TranscriptData {
  text: string;
  language: "ko" | "en" | "auto";
}
```

### UsageData
```typescript
interface UsageData {
  date: string;          // YYYY-MM-DD format
  count: number;
}
```

### ContentFormat
```typescript
type ContentFormat = "blog" | "twitter" | "linkedin";
```

### Language
```typescript
type Language = "ko" | "en" | "auto";
```

---

## API Response Types

### TranscribeResponse
```typescript
interface TranscribeResponse {
  transcript: string;
  language: Language;
}
```

### TranscribeErrorResponse
```typescript
interface TranscribeErrorResponse {
  error: string;
  code: "INVALID_URL" | "DOWNLOAD_FAILED" | "TRANSCRIPTION_FAILED" | "RATE_LIMIT";
}
```

### ConvertResponse
```typescript
interface ConvertResponse {
  blog: string;
  twitter: string[];
  linkedin: string;
}
```

### ConvertErrorResponse
```typescript
interface ConvertErrorResponse {
  error: string;
  code: "CONVERSION_FAILED" | "RATE_LIMIT";
}
```

---

## State Types

### FormState
```typescript
interface FormState {
  url: string;
  isLoading: boolean;
  error: string | null;
}
```

### ResultState
```typescript
interface ResultState {
  transcript: string;
  conversion: ConversionResult | null;
  isLoading: boolean;
  error: string | null;
  activeTab: ContentFormat;
}
```

---

## Validation Types

### YouTubeUrlValidator
```typescript
type YouTubeUrlValidator = (url: string) => boolean;
```

### RateLimitChecker
```typescript
type RateLimitChecker = () => {
  allowed: boolean;
  remaining: number;
};
```
