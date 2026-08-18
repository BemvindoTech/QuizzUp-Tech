import {
  createContext,
  useContext,
  useReducer,
  type ReactNode,
} from 'react';
import type { QuizState, QuizAction } from '../types/quiz.types';
import { quizReducer, initialState } from './quizReducer';

interface QuizContextValue {
  state: QuizState;
  dispatch: React.Dispatch<QuizAction>;
}

const QuizContext = createContext<QuizContextValue | undefined>(undefined);

export function QuizProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(quizReducer, initialState);

  return (
    <QuizContext.Provider value={{ state, dispatch }}>
      {children}
    </QuizContext.Provider>
  );
}

/** Hook d'accès au Context – lève une erreur si utilisé hors Provider */
export function useQuiz(): QuizContextValue {
  const ctx = useContext(QuizContext);
  if (!ctx) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  return ctx;
}
