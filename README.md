# QuizBattle — Frontend (Next.js)

Interface web pour **QuizBattle**, une app de quiz de culture générale entre potes en mode asynchrone.

## Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS

## Installation

```bash
npm install
cp .env.local.example .env.local
```

Renseigne l'URL de ton API Laravel dans `.env.local` (`NEXT_PUBLIC_API_URL`), puis :

```bash
npm run dev
```

L'app est disponible sur `http://localhost:3000`.

## Pages

| Route | Description |
|---|---|
| `/` | Accueil — créer ou rejoindre un quiz |
| `/register`, `/login` | Authentification |
| `/create` | Créer une session (choix catégorie + nombre de questions) → génère un code |
| `/join` | Rejoindre une session via un code |
| `/session/[code]/play` | Jouer — répondre aux questions à son rythme, feedback immédiat |
| `/session/[code]/leaderboard` | Classement de la session |
| `/leaderboard` | Classement global cumulé (tous quiz confondus) |

## Fonctionnement

Le jeu est **asynchrone** : chaque joueur rejoint une session avec le code, répond aux questions à son propre rythme (le temps de réponse influence les points), puis termine sa partie. Le classement de session s'actualise pour tout le monde au fur et à mesure que les joueurs terminent.

## Notes

- Le token d'authentification est stocké en `localStorage` (`quizbattle_token`).
- Le style visuel (dégradé violet, cartes translucides) est centralisé dans `globals.css` et `tailwind.config.ts` — facile à changer.
