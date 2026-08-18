import './Quiz.css';

interface ProgressBarProps {
  current: number;
  total: number;
}

export function ProgressBar({ current, total }: ProgressBarProps) {
  const percentage = Math.round((current / total) * 100);

  return (
    <div className="progress">
      <span className="progress__label">
        Question <strong>{current}</strong> / {total}
      </span>
      <div
        className="progress__track"
        role="progressbar"
        aria-valuenow={current}
        aria-valuemin={1}
        aria-valuemax={total}
        aria-label={`Question ${current} sur ${total}`}
      >
        <div
          className="progress__fill"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
