import { useQuiz } from '../../context/QuizContext';
import { selectQuestions } from '../../data/questionUtils';
import { QuestionReview } from './QuestionReview';
import { Button } from '../shared/Button';
import questionsBank from '../../data/questions.json';
import type { Question } from '../../types/quiz.types';
import './Results.css';

function getFeedback(percentage: number): string {
  if (percentage >= 80) return 'Excellent travail ! 🎉';
  if (percentage >= 50) return 'Bon effort, continuez ! 💪';
  return 'Révisez et réessayez ! 📚';
}

export function ResultsScreen() {
  const { state, dispatch } = useQuiz();
  const { score, questions, userAnswers, selectedLevel } = state;

  const total = questions.length;
  const percentage = total > 0 ? Math.round((score / total) * 100) : 0;

  function handleReplay() {
    if (!selectedLevel) return;
    try {
      const newQuestions = selectQuestions(questionsBank as Question[], selectedLevel);
      dispatch({ type: 'REPLAY', payload: newQuestions });
    } catch (err) {
      console.error(err);
    }
  }

  function handleGoHome() {
    dispatch({ type: 'GO_HOME' });
  }

  return (
    <main className="results-screen">
      <section className="results-screen__summary" aria-labelledby="results-title">
        <h1 id="results-title" className="results-screen__title">
          Résultats
        </h1>

        <div className="results-screen__score-card">
          <div className="score-display">
            <span className="score-display__value">{score}</span>
            <span className="score-display__separator">/</span>
            <span className="score-display__total">{total}</span>
          </div>
          <div className="score-display__percentage">{percentage}%</div>
          <p className="score-display__feedback">{getFeedback(percentage)}</p>
        </div>

        <div className="results-screen__actions">
          <Button variant="primary" onClick={handleReplay}>
            Rejouer
          </Button>
          <Button variant="secondary" onClick={handleGoHome}>
            Changer de niveau
          </Button>
        </div>
      </section>

      <section className="results-screen__review" aria-labelledby="review-title">
        <h2 id="review-title" className="results-screen__review-title">
          Révision des questions
        </h2>
        <div className="review-list">
          {questions.map((question, i) => {
            const userAnswer = userAnswers[i] ?? {
              questionId: question.id,
              selectedIndex: null,
              isCorrect: false,
            };
            return (
              <QuestionReview
                key={question.id}
                question={question}
                userAnswer={userAnswer}
                index={i}
              />
            );
          })}
        </div>
      </section>
    </main>
  );
}
