# API Contracts - ContentMorph

## External APIs

### 1. OpenAI Whisper API
**Endpoint:** `https://api.openai.com/v1/audio/transcriptions`
**Method:** POST (multipart/form-data)
**Headers:**
- `Authorization: Bearer ${OPENAI_API_KEY}`

**Request Body:**
```typescript
{
  file: File,           // Audio file (mp3, mp4, wav, etc.)
  model: "whisper-1",
  language?: string     // Optional: "ko" | "en"
}
```

**Response:**
```typescript
{
  text: string          // Transcribed text
}
```

**Error Handling:**
- 401: Invalid API key
- 413: File too large (max 25MB)
- 400: Invalid file format

---

### 2. OpenAI Chat Completion API (GPT-4o-mini)
**Endpoint:** `https://api.openai.com/v1/chat/completions`
**Method:** POST
**Headers:**
- `Authorization: Bearer ${OPENAI_API_KEY}`
- `Content-Type: application/json`

**Request Body:**
```typescript
{
  model: "gpt-4o-mini",
  messages: Array<{
    role: "system" | "user" | "assistant",
    content: string
  }>,
  temperature?: number,
  max_tokens?: number
}
```

**Response:**
```typescript
{
  id: string,
  choices: Array<{
    message: {
      role: "assistant",
      content: string
    },
    finish_reason: "stop" | "length"
  }>,
  usage: {
    prompt_tokens: number,
    completion_tokens: number,
    total_tokens: number
  }
}
```

---

## Internal API Routes

### POST `/api/transcribe`
**Description:** YouTube URL → Transcript extraction
**Request Body:**
```typescript
{
  url: string           // YouTube URL
}
```

**Response (Success):**
```typescript
{
  transcript: string,
  language: "ko" | "en" | "auto"
}
```

**Response (Error):**
```typescript
{
  error: string,
  code: "INVALID_URL" | "DOWNLOAD_FAILED" | "TRANSCRIPTION_FAILED" | "RATE_LIMIT"
}
```

---

### POST `/api/convert`
**Description:** Transcript → Multiple formats (blog, twitter, linkedin)
**Request Body:**
```typescript
{
  transcript: string,
  language: "ko" | "en"
}
```

**Response (Success):**
```typescript
{
  blog: string,         // 1500-word blog post
  twitter: string[],    // Array of 5-7 tweets
  linkedin: string      // 300-word LinkedIn post
}
```

**Response (Error):**
```typescript
{
  error: string,
  code: "CONVERSION_FAILED" | "RATE_LIMIT"
}
```

---

## Rate Limiting Contract

**Storage:** localStorage
**Key:** `contentmorph_usage`

**Structure:**
```typescript
{
  date: string,         // YYYY-MM-DD
  count: number         // Number of conversions today
}
```

**Rules:**
- Free tier: 3 conversions per day
- Reset at midnight (local time)
- Check before allowing conversion
