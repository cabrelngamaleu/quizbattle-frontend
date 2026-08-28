import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'QuizBattle — Quiz entre potes',
  description: 'Défie tes potes sur des quiz de culture générale et grimpe au classement.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className="min-h-screen bg-gradient-to-br from-brand-dark via-brand to-brand-light text-white">
        <div className="max-w-2xl mx-auto px-4 py-8">{children}</div>
      </body>
    </html>
  );
}
