const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

function getToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('quizbattle_token');
}

export function setToken(token: string) {
  localStorage.setItem('quizbattle_token', token);
}

export function clearToken() {
  localStorage.removeItem('quizbattle_token');
}

async function request<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getToken();

  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.message || `Erreur API (${res.status})`);
  }

  return res.json();
}

export const api = {
  register: (data: { name: string; email: string; password: string; avatar?: string }) =>
    request<{ user: any; token: string }>('/register', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  login: (data: { email: string; password: string }) =>
    request<{ user: any; token: string }>('/login', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  me: () => request<any>('/me'),

  categories: () => request<any[]>('/categories'),

  createSession: (data: { category_id: number; questions_count?: number }) =>
    request<{ session: any; share_code: string }>('/quiz-sessions', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  joinSession: (code: string) =>
    request<import('@/types').JoinSessionResponse>(`/quiz-sessions/${code}/join`, {
      method: 'POST',
    }),

  submitAnswer: (
    code: string,
    data: { question_id: number; selected_option: number | null; time_taken_seconds: number }
  ) =>
    request<import('@/types').AnswerResponse>(`/quiz-sessions/${code}/answer`, {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  finishSession: (code: string) =>
    request<{ final_score: number; rank: number }>(`/quiz-sessions/${code}/finish`, {
      method: 'POST',
    }),

  sessionLeaderboard: (code: string) =>
    request<{ session: any; leaderboard: import('@/types').LeaderboardEntry[] }>(
      `/quiz-sessions/${code}/leaderboard`
    ),

  globalLeaderboard: () =>
    request<{ leaderboard: import('@/types').LeaderboardEntry[] }>('/leaderboard/global'),
};
