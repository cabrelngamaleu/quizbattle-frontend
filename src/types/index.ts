export interface User {
  id: number;
  name: string;
  email: string;
  avatar: string | null;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  icon: string | null;
  questions_count: number;
}

export interface PublicQuestion {
  id: number;
  question_text: string;
  options: string[];
  difficulty: 'facile' | 'moyen' | 'difficile';
}

export interface QuizSession {
  code: string;
  status: 'open' | 'closed';
  questions_count: number;
  category?: Category;
}

export interface JoinSessionResponse {
  session: QuizSession;
  participation_id: number;
  already_finished: boolean;
  questions: PublicQuestion[];
}

export interface AnswerResponse {
  is_correct: boolean;
  points_earned: number;
  correct_option: number;
  total_score: number;
}

export interface LeaderboardEntry {
  rank: number;
  user: { id: number; name: string; avatar: string | null };
  score?: number;
  total_score?: number;
  quizzes_played?: number;
  finished?: boolean;
}
