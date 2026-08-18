import './Quiz.css';

interface TimerProps {
  timeLeft: number;
  totalTime: number;
}

function getTimerColor(timeLeft: number): string {
  if (timeLeft > 10) return 'timer--green';
  if (timeLeft > 5) return 'timer--orange';
  return 'timer--red';
}

export function Timer({ timeLeft, totalTime }: TimerProps) {
  const percentage = (timeLeft / totalTime) * 100;
  const colorClass = getTimerColor(timeLeft);

  return (
    <div className={`timer ${colorClass}`} aria-label={`Temps restant : ${timeLeft} secondes`}>
      <div className="timer__display" aria-live="polite" aria-atomic="true">
        <span className="timer__seconds">{timeLeft}</span>
        <span className="timer__label">s</span>
      </div>
      <div
        className="timer__bar-track"
        role="progressbar"
        aria-valuenow={timeLeft}
        aria-valuemin={0}
        aria-valuemax={totalTime}
      >
        <div
          className="timer__bar-fill"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
