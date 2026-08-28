'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';
import type { Category } from '@/types';

export default function CreateSessionPage() {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [count, setCount] = useState(10);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [shareCode, setShareCode] = useState<string | null>(null);

  useEffect(() => {
    api
      .categories()
      .then((cats) => {
        setCategories(cats);
        if (cats.length) setCategoryId(cats[0].id);
      })
      .catch((e) => setError(e.message));
  }, []);

  async function handleCreate() {
    if (!categoryId) return;
    setError('');
    setLoading(true);
    try {
      const { share_code } = await api.createSession({
        category_id: categoryId,
        questions_count: count,
      });
      setShareCode(share_code);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  if (shareCode) {
    return (
      <div className="card mt-8 text-center">
        <h1 className="text-xl font-semibold mb-4">Ta session est prête 🎉</h1>
        <p className="text-white/80 mb-2">Partage ce code à tes potes :</p>
        <p className="text-5xl font-mono font-bold tracking-widest mb-6">{shareCode}</p>
        <button
          className="btn-primary w-full mb-3"
          onClick={() => router.push(`/session/${shareCode}/play`)}
        >
          Jouer maintenant
        </button>
        <button
          className="text-white/80 underline"
          onClick={() => router.push(`/session/${shareCode}/leaderboard`)}
        >
          Voir le classement de la session
        </button>
      </div>
    );
  }

  return (
    <div className="card mt-8">
      <h1 className="text-2xl font-bold mb-6">Créer un quiz</h1>

      <p className="mb-2 text-white/80">Catégorie :</p>
      <div className="grid grid-cols-2 gap-2 mb-6">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setCategoryId(cat.id)}
            className={`rounded-xl p-3 text-left ${
              categoryId === cat.id ? 'bg-white text-brand-dark' : 'bg-white/10'
            }`}
          >
            <div className="text-2xl">{cat.icon}</div>
            <div className="font-medium">{cat.name}</div>
            <div className="text-xs opacity-70">{cat.questions_count} questions</div>
          </button>
        ))}
      </div>

      <p className="mb-2 text-white/80">Nombre de questions : {count}</p>
      <input
        type="range"
        min={5}
        max={20}
        value={count}
        onChange={(e) => setCount(Number(e.target.value))}
        className="w-full mb-6"
      />

      {error && <p className="text-red-200 text-sm mb-4">{error}</p>}

      <button className="btn-primary w-full" onClick={handleCreate} disabled={loading}>
        {loading ? 'Création...' : 'Générer le code'}
      </button>
    </div>
  );
}
