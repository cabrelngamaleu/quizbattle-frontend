'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function JoinPage() {
  const router = useRouter();
  const [code, setCode] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (code.trim().length >= 4) {
      router.push(`/session/${code.trim().toUpperCase()}/play`);
    }
  }

  return (
    <div className="card mt-8">
      <h1 className="text-2xl font-bold mb-6">Rejoindre un quiz</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          className="input text-center text-2xl tracking-widest font-mono uppercase"
          placeholder="CODE"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          maxLength={8}
          required
        />
        <button className="btn-primary">Rejoindre</button>
      </form>
    </div>
  );
}
