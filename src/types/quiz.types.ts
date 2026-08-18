export type Level = 'beginner' | 'intermediate' | 'advanced';

export type Theme =
  | 'ai'
  | 'cloud'
  | 'data'
  | 'cybersecurity'
  | 'devtools'
  | 'ethics';

export type Screen = 'home' | 'quiz' | 'results';

export interface Question {
  id: string;
  text: string;
  choices: [string, string, string, string];
  correctAnswerIndex: 0 | 1 | 2 | 3;
  explanation: string;
  level: Level;
  theme: Theme;
}

export interface UserAnswer {
  questionId: string;
  selectedIndex: number | null;
  isCorrect: boolean;
}

export interface QuizState {
  screen: Screen;
  selectedLevel: Level | null;
  questions: Question[];
  currentQuestionIndex: number;
  userAnswers: UserAnswer[];
  score: number;
  isAboutOpen: boolean;
}

export type QuizAction =
  | { type: 'SELECT_LEVEL'; payload: Level }
  | { type: 'START_QUIZ'; payload: Question[] }
  | { type: 'ANSWER_QUESTION'; payload: { selectedIndex: number | null } }
  | { type: 'NEXT_QUESTION' }
  | { type: 'FINISH_QUIZ' }
  | { type: 'REPLAY'; payload: Question[] }
  | { type: 'GO_HOME' }
  | { type: 'TOGGLE_ABOUT' };
