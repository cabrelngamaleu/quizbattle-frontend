# QuizBattle — Frontend

Interface web développée en Next.js pour QuizBattle, une application de quiz de culture générale à jouer entre amis. Ce dépôt contient uniquement le frontend. Le backend associé (API Laravel) se trouve dans le dépôt quizbattle-backend.

## Stack technique

- Framework : Next.js 14 (App Router)
- Langage : TypeScript
- Style : Tailwind CSS
- Hébergement : Vercel

## Architecture

L'application est un client léger consommant l'API REST du backend Laravel via un module client centralisé (src/lib/api.ts), qui gère l'ajout du token d'authentification et la normalisation des erreurs pour l'ensemble des appels.

Organisation des pages (App Router) :
- / : accueil, avec détection de l'état de connexion
- /register, /login : authentification
- /create : création d'une session de quiz (choix de catégorie et nombre de questions)
- /join : rejoindre une session via son code
- /session/[code]/play : déroulement du quiz, question par question, avec retour immédiat sur chaque réponse
- /session/[code]/leaderboard : classement d'une session
- /leaderboard : classement global cumulé

L'authentification repose sur un token Bearer stocké côté client (localStorage), transmis à chaque requête vers l'API.

## Démarche de développement

Le développement a été mené entièrement depuis un terminal Android (Termux), en l'absence de poste de travail traditionnel. Cette contrainte a mis en évidence une limitation technique de fond : le compilateur natif utilisé par Next.js (SWC) n'est pas distribué pour l'architecture Android, rendant impossible toute compilation locale sur ce type d'environnement.

Le contournement retenu a été de déléguer la compilation à Vercel, qui construit le projet sur ses propres serveurs à chaque push sur la branche principale. Cette approche a également permis de valider le projet sans dépendre des ressources matérielles du terminal de développement.

## Installation locale

Prérequis : Node.js, npm.

    npm install
    cp .env.local.example .env.local

Renseigner l'URL de l'API dans .env.local (NEXT_PUBLIC_API_URL), puis :

    npm run dev

L'application est disponible sur http://localhost:3000.

Remarque : la compilation Next.js nécessite une architecture prise en charge par son compilateur natif (SWC). Elle ne peut pas s'exécuter sur un environnement Android tel que Termux.

## Déploiement

Le déploiement est assuré par Vercel, connecté au dépôt GitHub. Chaque push sur la branche principale déclenche automatiquement un nouveau build et déploiement.

Variable d'environnement requise : NEXT_PUBLIC_API_URL, pointant vers l'URL de l'API backend déployée.
