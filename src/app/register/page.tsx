'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { api, setToken } from '@/lib/api';

const AVATARS = ['🙂', '😎', '🦁', '🐼', '🚀', '🔥', '🎯', '🧙'];

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [avatar, setAvatar] = useState(AVATARS[0]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { token } = await api.register({ name, email, password, avatar });
      setToken(token);
      router.push('/');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="card mt-8">
      <h1 className="text-2xl font-bold mb-6">Créer un compte</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          className="input"
          placeholder="Pseudo"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          className="input"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className="input"
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={6}
        />
        <div>
          <p className="text-sm mb-2 text-white/80">Choisis ton avatar :</p>
          <div className="flex gap-2 flex-wrap">
            {AVATARS.map((a) => (
              <button
                type="button"
                key={a}
                onClick={() => setAvatar(a)}
                className={`text-2xl rounded-lg p-2 ${
                  avatar === a ? 'bg-white' : 'bg-white/20'
                }`}
              >
                {a}
              </button>
            ))}
          </div>
        </div>
        {error && <p className="text-red-200 text-sm">{error}</p>}
        <button className="btn-primary" disabled={loading}>
          {loading ? 'Création...' : "S'inscrire"}
        </button>
      </form>
    </div>
  );
}
