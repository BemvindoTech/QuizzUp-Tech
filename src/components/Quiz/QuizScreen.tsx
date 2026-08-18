import { useEffect, useRef, useState } from 'react';
import { useQuiz } from '../../context/QuizContext';
import { Timer } from './Timer';
import { ProgressBar } from './ProgressBar';
import { QuestionCard } from './QuestionCard';
import './Quiz.css';

const TOTAL_TIME = 20;
const ADVANCE_DELAY = 800; // ms après réponse avant passage à la suivante

export function QuizScreen() {
  const { state, dispatch } = useQuiz();
  const { questions, currentQuestionIndex } = state;

  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);
  const [isAnswered, setIsAnswered] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const isAnsweredRef = useRef(false); // guard contre double-dispatch

  /* Réinitialise et lance le timer à chaque nouvelle question */
  useEffect(() => {
    setTimeLeft(TOTAL_TIME);
    setIsAnswered(false);
    setSelectedIndex(null);
    isAnsweredRef.current = false;

    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current!);
          // Temps écoulé – réponse nulle si pas déjà répondu
          if (!isAnsweredRef.current) {
            isAnsweredRef.current = true;
            dispatch({ type: 'ANSWER_QUESTION', payload: { selectedIndex: null } });
            setTimeout(() => dispatch({ type: 'NEXT_QUESTION' }), ADVANCE_DELAY);
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [currentQuestionIndex, dispatch]);

  function handleSelect(index: number) {
    if (isAnsweredRef.current) return; // guard double clic
    isAnsweredRef.current = true;

    if (intervalRef.current) clearInterval(intervalRef.current);

    setIsAnswered(true);
    setSelectedIndex(index);

    dispatch({ type: 'ANSWER_QUESTION', payload: { selectedIndex: index } });
    setTimeout(() => dispatch({ type: 'NEXT_QUESTION' }), ADVANCE_DELAY);
  }

  const currentQuestion = questions[currentQuestionIndex];
  if (!currentQuestion) return null;

  return (
    <main className="quiz-screen">
      <div className="quiz-screen__header">
        <ProgressBar
          current={currentQuestionIndex + 1}
          total={questions.length}
        />
        <Timer timeLeft={timeLeft} totalTime={TOTAL_TIME} />
      </div>

      <QuestionCard
        question={currentQuestion}
        selectedIndex={selectedIndex}
        isAnswered={isAnswered}
        onSelect={handleSelect}
      />
    </main>
  );
}
