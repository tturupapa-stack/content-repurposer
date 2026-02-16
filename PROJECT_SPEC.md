# AI 콘텐츠 리퍼포징 툴 — ContentMorph

## 개요
유튜브/팟캐스트 URL 입력 → 블로그글 + SNS 포스트(트위터, 링크드인) 자동 변환

## 기술 스택
- Next.js 14 (App Router)
- Tailwind CSS + shadcn/ui
- OpenAI Whisper API (음성→텍스트)
- GPT-4o-mini (요약/변환)
- Vercel 배포
- localStorage 기반 사용량 제한 (MVP)

## 핵심 기능 (MVP)
1. **URL 입력** — YouTube URL 붙여넣기
2. **트랜스크립트 추출** — Whisper API로 음성→텍스트
3. **콘텐츠 변환** — 3가지 포맷 동시 생성:
   - 블로그 포스트 (1500자 내외)
   - 트위터 스레드 (5-7개 트윗)
   - 링크드인 포스트 (300자 내외)
4. **복사/다운로드** — 각 포맷별 클립보드 복사
5. **한국어/영어 지원** — 입력 언어 자동 감지

## 페이지 구조
- `/` — 랜딩 + URL 입력 폼
- `/result` — 변환 결과 (탭으로 포맷 전환)

## 수익 모델
- 무료: 일 3회
- Pro: $9.9/월 (무제한) — Stripe 또는 Lemon Squeezy (MVP에선 제한만 구현)

## 환경변수
```
OPENAI_API_KEY=sk-proj-GqMC99... (기존 키 사용)
```

## 디자인
- 깔끔한 원페이지, 다크모드 지원
- 변환 중 로딩 애니메이션 (스켈레톤)
- 모바일 반응형

## YouTube 오디오 추출
- youtube-dl 대신 `ytdl-core` 또는 YouTube Transcript API 사용
- 먼저 자막이 있으면 자막 활용 (Whisper 비용 절약)
- 자막 없으면 오디오 다운로드 → Whisper

## 참고
- 빌드 반드시 통과해야 함 (`npm run build`)
- TypeScript strict mode
- 에러 핸들링 꼼꼼하게 (API 실패, URL 잘못됨 등)
