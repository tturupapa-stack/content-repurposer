export interface ConversionResult {
  blog: string;
  twitter: string[];
  linkedin: string;
}

export interface TranscriptData {
  text: string;
  language: "ko" | "en" | "auto";
}

export interface UsageData {
  date: string;
  count: number;
}

export type ContentFormat = "blog" | "twitter" | "linkedin";
export type Language = "ko" | "en" | "auto";

export interface TranscribeResponse {
  transcript: string;
  language: Language;
}

export interface TranscribeErrorResponse {
  error: string;
  code: "INVALID_URL" | "DOWNLOAD_FAILED" | "TRANSCRIPTION_FAILED" | "RATE_LIMIT";
}

export interface ConvertResponse {
  blog: string;
  twitter: string[];
  linkedin: string;
}

export interface ConvertErrorResponse {
  error: string;
  code: "CONVERSION_FAILED" | "RATE_LIMIT";
}
