import './Quiz.css';

const LABELS = ['A', 'B', 'C', 'D'] as const;

interface AnswerOptionProps {
  index: number;
  text: string;
  isSelected: boolean;
  isDisabled: boolean;
  onSelect: (index: number) => void;
}

export function AnswerOption({
  index,
  text,
  isSelected,
  isDisabled,
  onSelect,
}: AnswerOptionProps) {
  const label = LABELS[index];

  return (
    <button
      className={`answer-option${isSelected ? ' answer-option--selected' : ''}`}
      disabled={isDisabled}
      onClick={() => onSelect(index)}
      aria-pressed={isSelected}
    >
      <span className="answer-option__label">{label}</span>
      <span className="answer-option__text">{text}</span>
    </button>
  );
}
