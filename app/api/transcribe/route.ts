import { NextRequest, NextResponse } from 'next/server';
import { validateYouTubeUrl, extractVideoId } from '@/lib/youtube';

export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json();

    if (!validateYouTubeUrl(url)) {
      return NextResponse.json(
        { error: 'Invalid YouTube URL', code: 'INVALID_URL' },
        { status: 400 }
      );
    }

    const videoId = extractVideoId(url);
    if (!videoId) {
      return NextResponse.json(
        { error: 'Could not extract video ID', code: 'INVALID_URL' },
        { status: 400 }
      );
    }

    // MVP: Return mock transcript for testing
    // In production, this would call YouTube Transcript API or Whisper
    const mockTranscript = `This is a sample transcript from the video. 
In a real implementation, this would be extracted from YouTube captions 
or transcribed using OpenAI Whisper API. The system would detect the 
language automatically and return the full transcript content.`;

    return NextResponse.json({
      transcript: mockTranscript,
      language: 'en'
    });

  } catch (error) {
    console.error('Transcribe error:', error);
    return NextResponse.json(
      { error: 'Transcription failed', code: 'TRANSCRIPTION_FAILED' },
      { status: 500 }
    );
  }
}
