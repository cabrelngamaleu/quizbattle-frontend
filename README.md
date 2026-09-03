# QuizBattle — Frontend

Stack : Next.js 14, TypeScript, Tailwind CSS, Vercel

Interface web de QuizBattle, une application de quiz de culture generale a jouer entre amis. Ce depot contient uniquement le frontend ; l'API backend (Laravel) vit dans le depot separe quizbattle-backend.

## Sommaire

- Fonctionnalites
- Stack technique
- Architecture
- Pages de l'application
- Installation
- Deploiement
- Structure du projet

## Fonctionnalites

- Inscription et connexion avec avatar personnalisable
- Creation d'une session de quiz : choix de la categorie et du nombre de questions
- Participation a une session via un code de partage court
- Deroulement du quiz question par question, avec retour immediat et score cumule en temps reel
- Classement d'une session et classement global, avec mise en avant du podium
- Detection de l'etat de connexion sur la page d'accueil

## Stack technique

| Categorie | Choix | Justification |
|---|---|---|
| Framework | Next.js 14 (App Router) | Routage par fichiers, rendu cote client adapte a une application interactive |
| Langage | TypeScript | Typage strict des reponses de l'API et des composants |
| Style | Tailwind CSS | Developpement rapide d'une interface coherente |
| Hebergement | Vercel | Integration native avec Next.js, deploiement continu depuis GitHub |

## Architecture

L'application est un client consommant l'API REST du backend via un module centralise, src/lib/api.ts, qui expose une fonction par operation metier (inscription, connexion, creation de session, soumission de reponse, classements). Ce module gere :

- l'ajout automatique du token d'authentification a chaque requete
- la normalisation des erreurs renvoyees par l'API
- la configuration de l'URL de base de l'API via une variable d'environnement

Cette centralisation evite de dupliquer la logique d'appel reseau dans chaque page.

L'authentification repose sur un token Bearer conserve cote client (localStorage) et transmis a chaque requete vers l'API.

## Pages de l'application

| Route | Description |
|---|---|
| / | Accueil, avec detection de l'etat de connexion |
| /register, /login | Inscription et connexion |
| /create | Creation d'une session : choix de categorie et nombre de questions |
| /join | Rejoindre une session existante via son code |
| /session/[code]/play | Deroulement du quiz, une question a la fois |
| /session/[code]/leaderboard | Classement detaille d'une session |
| /leaderboard | Classement global cumule |

## Installation

Prerequis : Node.js, npm.

npm install
cp .env.local.example .env.local

Renseigner l'URL de l'API dans .env.local :

NEXT_PUBLIC_API_URL=http://localhost:8000/api

Puis demarrer le serveur de developpement :

npm run dev

L'application est disponible sur http://localhost:3000.

## Deploiement

Le deploiement est assure par Vercel, connecte directement au depot GitHub. Chaque push sur la branche principale declenche automatiquement un nouveau build et un nouveau deploiement.

Variable d'environnement requise en production : NEXT_PUBLIC_API_URL, pointant vers l'URL de l'API backend deployee, avec le suffixe /api.

## Structure du projet

src/app/page.tsx : accueil
src/app/login, src/app/register : authentification
src/app/create, src/app/join : creation et participation a une session
src/app/session/[code]/play : deroulement du quiz
src/app/session/[code]/leaderboard : classement de session
src/app/leaderboard : classement global
src/lib/api.ts : client API centralise
src/types/index.ts : types TypeScript partages
