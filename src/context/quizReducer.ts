import type { QuizState, QuizAction } from '../types/quiz.types';

export const initialState: QuizState = {
  screen: 'home',
  selectedLevel: null,
  questions: [],
  currentQuestionIndex: 0,
  userAnswers: [],
  score: 0,
  isAboutOpen: false,
};

export function quizReducer(state: QuizState, action: QuizAction): QuizState {
  switch (action.type) {
    case 'SELECT_LEVEL':
      return { ...state, selectedLevel: action.payload };

    case 'START_QUIZ':
      return {
        ...state,
        screen: 'quiz',
        questions: action.payload,
        currentQuestionIndex: 0,
        userAnswers: [],
        score: 0,
      };

    case 'ANSWER_QUESTION': {
      const question = state.questions[state.currentQuestionIndex];
      const isCorrect =
        action.payload.selectedIndex !== null &&
        action.payload.selectedIndex === question.correctAnswerIndex;

      return {
        ...state,
        userAnswers: [
          ...state.userAnswers,
          {
            questionId: question.id,
            selectedIndex: action.payload.selectedIndex,
            isCorrect,
          },
        ],
        score: isCorrect ? state.score + 1 : state.score,
      };
    }

    case 'NEXT_QUESTION': {
      const nextIndex = state.currentQuestionIndex + 1;
      if (nextIndex >= state.questions.length) {
        return { ...state, screen: 'results' };
      }
      return { ...state, currentQuestionIndex: nextIndex };
    }

    case 'FINISH_QUIZ':
      return { ...state, screen: 'results' };

    case 'REPLAY':
      return {
        ...state,
        screen: 'quiz',
        questions: action.payload,
        currentQuestionIndex: 0,
        userAnswers: [],
        score: 0,
      };

    case 'GO_HOME':
      return { ...initialState };

    case 'TOGGLE_ABOUT':
      return { ...state, isAboutOpen: !state.isAboutOpen };

    default:
      return state;
  }
}
