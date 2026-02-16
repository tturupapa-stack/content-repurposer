'use client';

import { useState } from 'react';
import { validateYouTubeUrl } from '@/lib/youtube';
import { checkRateLimit, incrementUsage } from '@/lib/rate-limit';
import type { ConversionResult } from '@/types';

export default function Home() {
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ConversionResult | null>(null);
  const [activeTab, setActiveTab] = useState<'blog' | 'twitter' | 'linkedin'>('blog');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setResult(null);

    if (!validateYouTubeUrl(url)) {
      setError('Please enter a valid YouTube URL');
      return;
    }

    const { allowed, remaining } = checkRateLimit();
    if (!allowed) {
      setError(`Daily limit reached (${remaining}/3). Try again tomorrow!`);
      return;
    }

    setIsLoading(true);

    try {
      // Step 1: Get transcript
      const transcribeRes = await fetch('/api/transcribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url })
      });

      if (!transcribeRes.ok) {
        const err = await transcribeRes.json();
        throw new Error(err.error || 'Transcription failed');
      }

      const { transcript, language } = await transcribeRes.json();

      // Step 2: Convert content
      const convertRes = await fetch('/api/convert', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ transcript, language })
      });

      if (!convertRes.ok) {
        const err = await convertRes.json();
        throw new Error(err.error || 'Conversion failed');
      }

      const conversionResult = await convertRes.json();
      setResult(conversionResult);
      incrementUsage();

    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-2">
            ContentMorph
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Turn YouTube videos into blog posts, tweets, and LinkedIn posts
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 mb-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="url" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                YouTube URL
              </label>
              <input
                id="url"
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://www.youtube.com/watch?v=..."
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                disabled={isLoading}
              />
            </div>

            {error && (
              <div className="p-4 bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-400 rounded-md">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-md transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Converting...' : 'Convert Content'}
            </button>
          </form>
        </div>

        {result && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden">
            <div className="flex border-b border-gray-200 dark:border-gray-700">
              {(['blog', 'twitter', 'linkedin'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 px-4 py-3 font-medium capitalize ${
                    activeTab === tab
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="p-6">
              {activeTab === 'blog' && (
                <div>
                  <pre className="whitespace-pre-wrap text-gray-900 dark:text-gray-100 mb-4">
                    {result.blog}
                  </pre>
                  <button
                    onClick={() => copyToClipboard(result.blog)}
                    className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-md"
                  >
                    Copy Blog Post
                  </button>
                </div>
              )}

              {activeTab === 'twitter' && (
                <div>
                  {result.twitter.map((tweet, idx) => (
                    <div key={idx} className="mb-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-md">
                      <p className="text-gray-900 dark:text-gray-100">{tweet}</p>
                    </div>
                  ))}
                  <button
                    onClick={() => copyToClipboard(result.twitter.join('\n\n'))}
                    className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-md"
                  >
                    Copy Twitter Thread
                  </button>
                </div>
              )}

              {activeTab === 'linkedin' && (
                <div>
                  <pre className="whitespace-pre-wrap text-gray-900 dark:text-gray-100 mb-4">
                    {result.linkedin}
                  </pre>
                  <button
                    onClick={() => copyToClipboard(result.linkedin)}
                    className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-md"
                  >
                    Copy LinkedIn Post
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
