import type { Question, UserAnswer } from '../../types/quiz.types';
import './Results.css';

const LABELS = ['A', 'B', 'C', 'D'];

interface QuestionReviewProps {
  question: Question;
  userAnswer: UserAnswer;
  index: number;
}

export function QuestionReview({ question, userAnswer, index }: QuestionReviewProps) {
  const { isCorrect, selectedIndex } = userAnswer;

  const userAnswerText =
    selectedIndex !== null
      ? `${LABELS[selectedIndex]}. ${question.choices[selectedIndex]}`
      : 'Aucune réponse (temps écoulé)';

  const correctAnswerText = `${LABELS[question.correctAnswerIndex]}. ${question.choices[question.correctAnswerIndex]}`;

  return (
    <div className={`review-item ${isCorrect ? 'review-item--correct' : 'review-item--incorrect'}`}>
      <div className="review-item__header">
        <span className="review-item__number">Q{index + 1}</span>
        <span className="review-item__badge" aria-label={isCorrect ? 'Correct' : 'Incorrect'}>
          {isCorrect ? (
            <>
              <span aria-hidden="true">✓</span> Correct
            </>
          ) : (
            <>
              <span aria-hidden="true">✗</span> Incorrect
            </>
          )}
        </span>
      </div>

      <p className="review-item__question">{question.text}</p>

      <div className="review-item__answers">
        <div className="review-item__answer-row">
          <span className="review-item__answer-label">Votre réponse :</span>
          <span className={`review-item__answer-value ${isCorrect ? 'text--success' : 'text--error'}`}>
            {userAnswerText}
          </span>
        </div>
        {!isCorrect && (
          <div className="review-item__answer-row">
            <span className="review-item__answer-label">Bonne réponse :</span>
            <span className="review-item__answer-value text--success">
              {correctAnswerText}
            </span>
          </div>
        )}
      </div>

      <p className="review-item__explanation">{question.explanation}</p>
    </div>
  );
}
