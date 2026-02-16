const MAX_DAILY_USAGE = 3;

export function checkRateLimit(): { allowed: boolean; remaining: number } {
  if (typeof window === 'undefined') {
    return { allowed: true, remaining: MAX_DAILY_USAGE };
  }

  const today = new Date().toISOString().split('T')[0];
  const stored = localStorage.getItem('contentmorph_usage');
  
  if (!stored) {
    return { allowed: true, remaining: MAX_DAILY_USAGE };
  }

  const usage = JSON.parse(stored);
  
  if (usage.date !== today) {
    return { allowed: true, remaining: MAX_DAILY_USAGE };
  }

  const remaining = MAX_DAILY_USAGE - usage.count;
  return { allowed: remaining > 0, remaining: Math.max(0, remaining) };
}

export function incrementUsage(): void {
  if (typeof window === 'undefined') return;

  const today = new Date().toISOString().split('T')[0];
  const stored = localStorage.getItem('contentmorph_usage');
  
  if (!stored) {
    localStorage.setItem('contentmorph_usage', JSON.stringify({ date: today, count: 1 }));
    return;
  }

  const usage = JSON.parse(stored);
  
  if (usage.date !== today) {
    localStorage.setItem('contentmorph_usage', JSON.stringify({ date: today, count: 1 }));
  } else {
    localStorage.setItem('contentmorph_usage', JSON.stringify({ date: today, count: usage.count + 1 }));
  }
}
