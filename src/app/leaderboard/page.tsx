'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { api } from '@/lib/api';
import type { LeaderboardEntry } from '@/types';

export default function GlobalLeaderboardPage() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    api
      .globalLeaderboard()
      .then((data) => setLeaderboard(data.leaderboard))
      .catch((e) => setError(e.message));
  }, []);

  return (
    <div className="card mt-8">
      <h1 className="text-2xl font-bold mb-6">🏆 Classement global</h1>

      {error && <p className="text-red-200">{error}</p>}

      <div className="flex flex-col gap-2">
        {leaderboard.map((entry) => (
          <div
            key={entry.user.id}
            className="flex items-center justify-between bg-white/10 rounded-xl px-4 py-3"
          >
            <div className="flex items-center gap-3">
              <span className="font-bold w-6 text-center">{entry.rank}</span>
              <span className="text-xl">{entry.user.avatar}</span>
              <div>
                <p>{entry.user.name}</p>
                <p className="text-xs text-white/60">{entry.quizzes_played} quiz joués</p>
              </div>
            </div>
            <span className="font-semibold">{entry.total_score} pts</span>
          </div>
        ))}
      </div>

      <Link href="/" className="block text-center text-white/80 underline mt-6">
        Retour à l'accueil
      </Link>
    </div>
  );
}
