import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function transcribeAudio(audioBuffer: Buffer): Promise<string> {
  const uint8Array = new Uint8Array(audioBuffer);
  const blob = new Blob([uint8Array], { type: 'audio/mpeg' });
  const file = new File([blob], 'audio.mp3', { type: 'audio/mpeg' });
  
  const transcription = await openai.audio.transcriptions.create({
    file,
    model: 'whisper-1',
  });

  return transcription.text;
}

export async function convertContent(transcript: string, language: string): Promise<{
  blog: string;
  twitter: string[];
  linkedin: string;
}> {
  const systemPrompt = language === 'ko' 
    ? '당신은 콘텐츠 리퍼포징 전문가입니다. 주어진 트랜스크립트를 블로그 글, 트위터 스레드, 링크드인 포스트로 변환하세요.'
    : 'You are a content repurposing expert. Convert the given transcript into a blog post, Twitter thread, and LinkedIn post.';

  const userPrompt = language === 'ko'
    ? `다음 트랜스크립트를 바탕으로:

1. 블로그 포스트 (1500자 내외): 제목과 본문을 포함한 완전한 블로그 글
2. 트위터 스레드 (5-7개 트윗): 각 트윗은 280자 이하, 번호 매기기
3. 링크드인 포스트 (300자 내외): 전문적인 톤의 요약

트랜스크립트:
${transcript}

응답은 다음 JSON 형식으로:
{
  "blog": "블로그 내용",
  "twitter": ["트윗1", "트윗2", ...],
  "linkedin": "링크드인 내용"
}`
    : `Based on the following transcript:

1. Blog post (1500 words): Full blog post with title and body
2. Twitter thread (5-7 tweets): Each tweet under 280 characters, numbered
3. LinkedIn post (300 words): Professional summary

Transcript:
${transcript}

Respond in JSON format:
{
  "blog": "blog content",
  "twitter": ["tweet1", "tweet2", ...],
  "linkedin": "linkedin content"
}`;

  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt }
    ],
    temperature: 0.7,
    response_format: { type: 'json_object' }
  });

  const content = response.choices[0].message.content;
  if (!content) throw new Error('No content generated');

  return JSON.parse(content);
}
