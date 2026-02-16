import { NextRequest, NextResponse } from 'next/server';
import { convertContent } from '@/lib/openai';

export async function POST(req: NextRequest) {
  try {
    const { transcript, language } = await req.json();

    if (!transcript) {
      return NextResponse.json(
        { error: 'Transcript is required', code: 'CONVERSION_FAILED' },
        { status: 400 }
      );
    }

    const result = await convertContent(transcript, language || 'en');

    return NextResponse.json(result);

  } catch (error) {
    console.error('Convert error:', error);
    return NextResponse.json(
      { error: 'Conversion failed', code: 'CONVERSION_FAILED' },
      { status: 500 }
    );
  }
}
