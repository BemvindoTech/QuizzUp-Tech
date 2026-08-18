import { useState } from 'react';
import { useQuiz } from '../../context/QuizContext';
import { selectQuestions } from '../../data/questionUtils';
import { Button } from '../shared/Button';
import { Modal } from '../shared/Modal';
import questionsBank from '../../data/questions.json';
import type { Level, Question } from '../../types/quiz.types';
import './HomeScreen.css';

const LEVELS: { id: Level; label: string; count: number; description: string }[] = [
  { id: 'beginner',     label: 'Débutant',      count: 10, description: '10 questions – Fondamentaux' },
  { id: 'intermediate', label: 'Intermédiaire',  count: 15, description: '15 questions – Concepts avancés' },
  { id: 'advanced',     label: 'Avancé',         count: 20, description: '20 questions – Expert' },
];

export function HomeScreen() {
  const { state, dispatch } = useQuiz();
  const { selectedLevel, isAboutOpen } = state;
  const [error, setError] = useState<string | null>(null);

  function handleSelectLevel(level: Level) {
    setError(null);
    dispatch({ type: 'SELECT_LEVEL', payload: level });
  }

  function handleStart() {
    if (!selectedLevel) {
      setError('Veuillez choisir un niveau avant de commencer.');
      return;
    }
    try {
      const questions = selectQuestions(questionsBank as Question[], selectedLevel);
      dispatch({ type: 'START_QUIZ', payload: questions });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors du chargement des questions.');
    }
  }

  return (
    <main className="home-screen">
      <header className="home-screen__hero">
        <div className="home-screen__icon" aria-hidden="true">🧠</div>
        <h1 className="home-screen__title">Tech &amp; AI Quiz</h1>
        <p className="home-screen__subtitle">
          Testez vos connaissances en Intelligence Artificielle, Cloud, Data,
          Cybersécurité, Outils Dev et Éthique numérique.
        </p>
      </header>

      <section aria-labelledby="level-heading">
        <h2 id="level-heading" className="home-screen__section-title">
          Choisissez votre niveau
        </h2>

        <div
          className="level-grid"
          role="radiogroup"
          aria-label="Niveaux de difficulté"
        >
          {LEVELS.map((lvl) => {
            const isSelected = selectedLevel === lvl.id;
            return (
              <button
                key={lvl.id}
                className={`level-card${isSelected ? ' level-card--selected' : ''}`}
                onClick={() => handleSelectLevel(lvl.id)}
                aria-pressed={isSelected}
              >
                <span className="level-card__label">{lvl.label}</span>
                <span className="level-card__desc">{lvl.description}</span>
              </button>
            );
          })}
        </div>

        {error && (
          <p className="home-screen__error" role="alert">
            {error}
          </p>
        )}
      </section>

      <div className="home-screen__actions">
        <Button variant="primary" onClick={handleStart}>
          Commencer le quiz
        </Button>
        <Button
          variant="secondary"
          onClick={() => dispatch({ type: 'TOGGLE_ABOUT' })}
        >
          À propos
        </Button>
      </div>

      <Modal
        isOpen={isAboutOpen}
        onClose={() => dispatch({ type: 'TOGGLE_ABOUT' })}
        title="À propos de Tech & AI Quiz"
      >
        <p>
          <strong>Tech &amp; AI Quiz</strong> est un jeu de quiz interactif en
          mode Solo conçu pour apprendre et réviser les concepts clés du
          numérique : Intelligence Artificielle, Cloud, Data Science,
          Cybersécurité, Outils Dev et Éthique.
        </p>
        <p>
          Choisissez votre niveau de difficulté, répondez à des questions
          chronométrées (20 secondes par question) et consultez vos résultats
          avec des explications détaillées à la fin.
        </p>
        <p>
          Les questions sont sélectionnées aléatoirement depuis une banque de
          plus de 60 questions rédigées en français. Bonne chance !
        </p>
      </Modal>
    </main>
  );
}
