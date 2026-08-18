import type { Question } from '../../types/quiz.types';
import { AnswerOption } from './AnswerOption';
import './Quiz.css';

interface QuestionCardProps {
  question: Question;
  selectedIndex: number | null;
  isAnswered: boolean;
  onSelect: (index: number) => void;
}

export function QuestionCard({
  question,
  selectedIndex,
  isAnswered,
  onSelect,
}: QuestionCardProps) {
  return (
    <div className="question-card">
      <p className="question-card__text">{question.text}</p>
      <div
        className="question-card__options"
        role="group"
        aria-label="Choix de réponse"
      >
        {question.choices.map((choice, i) => (
          <AnswerOption
            key={i}
            index={i}
            text={choice}
            isSelected={selectedIndex === i}
            isDisabled={isAnswered}
            onSelect={onSelect}
          />
        ))}
      </div>
    </div>
  );
}
