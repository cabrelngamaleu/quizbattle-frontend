'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { api } from '@/lib/api';
import type { PublicQuestion } from '@/types';

export default function PlaySessionPage() {
  const { code } = useParams<{ code: string }>();
  const router = useRouter();

  const [questions, setQuestions] = useState<PublicQuestion[]>([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<{ correct: boolean; correctOption: number } | null>(
    null
  );
  const [totalScore, setTotalScore] = useState(0);
  const [questionStart, setQuestionStart] = useState<number>(Date.now());
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .joinSession(code)
      .then((data) => {
        if (data.already_finished) {
          router.push(`/session/${code}/leaderboard`);
          return;
        }
        setQuestions(data.questions);
        setQuestionStart(Date.now());
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [code, router]);

  async function handleAnswer(optionIndex: number) {
    if (feedback) return; // déjà répondu à cette question
    setSelected(optionIndex);

    const timeTaken = Math.round((Date.now() - questionStart) / 1000);
    const question = questions[current];

    try {
      const res = await api.submitAnswer(code, {
        question_id: question.id,
        selected_option: optionIndex,
        time_taken_seconds: timeTaken,
      });
      setFeedback({ correct: res.is_correct, correctOption: res.correct_option });
      setTotalScore(res.total_score);
    } catch (err: any) {
      setError(err.message);
    }
  }

  function nextQuestion() {
    setSelected(null);
    setFeedback(null);
    setQuestionStart(Date.now());

    if (current + 1 < questions.length) {
      setCurrent(current + 1);
    } else {
      finishAndRedirect();
    }
  }

  async function finishAndRedirect() {
    try {
      await api.finishSession(code);
    } finally {
      router.push(`/session/${code}/leaderboard`);
    }
  }

  if (loading) return <p className="text-center mt-12">Chargement du quiz...</p>;
  if (error) return <p className="text-center mt-12 text-red-200">{error}</p>;
  if (!questions.length) return <p className="text-center mt-12">Aucune question trouvée.</p>;

  const question = questions[current];

  return (
    <div className="card mt-8">
      <div className="flex justify-between items-center mb-4 text-sm text-white/70">
        <span>
          Question {current + 1} / {questions.length}
        </span>
        <span>Score : {totalScore} pts</span>
      </div>

      <h2 className="text-xl font-semibold mb-6">{question.question_text}</h2>

      <div className="flex flex-col gap-3">
        {question.options.map((option, index) => {
          let style = 'bg-white/10 hover:bg-white/20';
          if (feedback) {
            if (index === feedback.correctOption) style = 'bg-green-500/80';
            else if (index === selected) style = 'bg-red-500/80';
          } else if (index === selected) {
            style = 'bg-white/30';
          }

          return (
            <button
              key={index}
              onClick={() => handleAnswer(index)}
              disabled={!!feedback}
              className={`text-left rounded-xl px-4 py-3 transition ${style}`}
            >
              {option}
            </button>
          );
        })}
      </div>

      {feedback && (
        <button className="btn-primary w-full mt-6" onClick={nextQuestion}>
          {current + 1 < questions.length ? 'Question suivante' : 'Voir le classement'}
        </button>
      )}
    </div>
  );
}
