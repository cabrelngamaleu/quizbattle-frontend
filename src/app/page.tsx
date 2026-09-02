'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { api, clearToken } from '@/lib/api';
import type { User } from '@/types';

export default function HomePage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    api
      .me()
      .then((u) => setUser(u))
      .catch(() => setUser(null))
      .finally(() => setChecked(true));
  }, []);

  function handleLogout() {
    clearToken();
    setUser(null);
    router.refresh();
  }

  return (
    <div className="flex flex-col items-center text-center gap-8 mt-12">
      <div>
        <h1 className="text-4xl font-bold mb-2">🧠 QuizBattle</h1>
        <p className="text-white/80">
          Défie tes potes sur des quiz de culture générale, chacun à son rythme,
          et grimpe au classement.
        </p>
      </div>

      {checked && user && (
        <div className="flex items-center gap-2 text-white/90">
          <span className="text-2xl">{user.avatar}</span>
          <span>
            Connecté en tant que <strong>{user.name}</strong>
          </span>
        </div>
      )}

      <div className="card w-full flex flex-col gap-4">
        <Link href="/create" className="btn-primary">
          🎯 Créer un quiz
        </Link>
        <Link
          href="/join"
          className="btn-primary bg-transparent border border-white text-white hover:bg-white/10"
        >
          🔗 Rejoindre avec un code
        </Link>
        <Link href="/leaderboard" className="text-white/80 underline underline-offset-4 mt-2">
          Voir le classement global
        </Link>
      </div>

      <div className="flex gap-4 text-sm text-white/70">
        {checked && user ? (
          <button onClick={handleLogout} className="underline">
            Déconnexion
          </button>
        ) : (
          <>
            <Link href="/login" className="underline">
              Connexion
            </Link>
            <Link href="/register" className="underline">
              Inscription
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
