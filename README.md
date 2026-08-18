# Tech & AI Quiz – MVP Solo

Jeu de quiz interactif en mode Solo pour apprendre et réviser des concepts clés du numérique : Intelligence Artificielle, Cloud, Data, Cybersécurité, Outils Dev et Éthique.

---

## Prérequis

- **Node.js** ≥ 18
- **npm** ≥ 9

---

## Installation

```bash
npm install
```

---

## Développement local

```bash
npm run dev
```

L'application est accessible sur [http://localhost:5173](http://localhost:5173).

---

## Build de production

```bash
npm run build
```

Le dossier `dist/` contient les fichiers statiques prêts à être déployés.

Pour prévisualiser le build localement :

```bash
npm run preview
```

---

## Tests

```bash
# Mode watch (développement)
npm run test

# Exécution unique (CI)
npm run test:run
```

La suite de tests couvre :
- **`questionUtils.test.ts`** – shuffle, sélection des questions par niveau
- **`quizReducer.test.ts`** – toutes les transitions d'état du reducer
- **`questions.validation.test.ts`** – validation structurelle de la banque de questions

---

## Déploiement

### Vercel

1. Importer le dépôt depuis [vercel.com](https://vercel.com)
2. Framework détecté automatiquement : **Vite**
3. Build command : `npm run build`
4. Output directory : `dist`

### Netlify

1. Importer le dépôt depuis [netlify.com](https://netlify.com)
2. Build command : `npm run build`
3. Publish directory : `dist`

### GitHub Pages

1. Modifier `vite.config.ts` pour ajouter le `base` si le site est servi sous un sous-chemin :
   ```ts
   base: '/nom-du-repo/',
   ```
2. Utiliser [gh-pages](https://www.npmjs.com/package/gh-pages) ou GitHub Actions pour déployer le dossier `dist/`.

---

## Ajouter des questions

Les questions sont dans `src/data/questions.json`. Chaque entrée respecte ce schéma :

```json
{
  "id": "q-061",
  "text": "Énoncé de la question ?",
  "choices": ["Choix A", "Choix B", "Choix C", "Choix D"],
  "correctAnswerIndex": 0,
  "explanation": "Explication courte (2–3 phrases) visible dans les résultats.",
  "level": "beginner",
  "theme": "ai"
}
```

**Valeurs autorisées :**
- `level` : `"beginner"` | `"intermediate"` | `"advanced"`
- `theme` : `"ai"` | `"cloud"` | `"data"` | `"cybersecurity"` | `"devtools"` | `"ethics"`
- `correctAnswerIndex` : `0`, `1`, `2` ou `3`

Après ajout, lancez `npm run test:run` pour valider la structure.

---

## Structure du projet

```
src/
├── components/
│   ├── Home/          # Écran d'accueil (choix du niveau)
│   ├── Quiz/          # Écran de jeu (question, timer, progression)
│   ├── Results/       # Écran de résultats (score, révision)
│   └── shared/        # Button, Modal (composants réutilisables)
├── context/
│   ├── QuizContext.tsx   # React Context + Provider + hook useQuiz
│   └── quizReducer.ts    # Reducer + état initial + toutes les actions
├── data/
│   ├── questions.json    # Banque de 60+ questions (FR)
│   └── questionUtils.ts  # selectQuestions, shuffle, QUESTION_COUNT
├── types/
│   └── quiz.types.ts     # Interfaces TypeScript (Question, QuizState…)
├── App.tsx
├── main.tsx
└── index.css
tests/
├── questionUtils.test.ts
├── quizReducer.test.ts
├── questions.validation.test.ts
└── setup.ts
```

---

## Stack technique

| Technologie | Rôle |
|---|---|
| React 18 + TypeScript | Framework UI + typage statique |
| Vite | Bundler + dev server |
| Vitest | Tests unitaires |
| CSS custom (variables) | Styles sans dépendance externe |

---

## Roadmap (post-MVP)

- Persistance des scores (backend / localStorage)
- Mode multijoueur en temps réel
- Génération de questions via API IA
- Filtrage par thème
- Tableau des scores (leaderboard)
