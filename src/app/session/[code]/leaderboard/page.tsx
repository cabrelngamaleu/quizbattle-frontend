'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { api } from '@/lib/api';
import type { LeaderboardEntry } from '@/types';

export default function SessionLeaderboardPage() {
  const { code } = useParams<{ code: string }>();
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    api
      .sessionLeaderboard(code)
      .then((data) => setLeaderboard(data.leaderboard))
      .catch((e) => setError(e.message));
  }, [code]);

  return (
    <div className="card mt-8">
      <h1 className="text-2xl font-bold mb-2">Classement de la session</h1>
      <p className="text-white/70 mb-6 font-mono">{code}</p>

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
              <span>{entry.user.name}</span>
              {!entry.finished && (
                <span className="text-xs text-yellow-200/80">(en cours)</span>
              )}
            </div>
            <span className="font-semibold">{entry.score} pts</span>
          </div>
        ))}
      </div>

      <Link href="/" className="block text-center text-white/80 underline mt-6">
        Retour à l'accueil
      </Link>
    </div>
  );
}
