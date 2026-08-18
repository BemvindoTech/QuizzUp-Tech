import { describe, it, expect } from 'vitest';
import { quizReducer, initialState } from '../src/context/quizReducer';
import type { Question, QuizState } from '../src/types/quiz.types';

// Questions fictives pour les tests
const mockQuestions: Question[] = [
  {
    id: 'test-001',
    text: 'Question 1',
    choices: ['A', 'B', 'C', 'D'],
    correctAnswerIndex: 1,
    explanation: 'Explication 1',
    level: 'beginner',
    theme: 'ai',
  },
  {
    id: 'test-002',
    text: 'Question 2',
    choices: ['W', 'X', 'Y', 'Z'],
    correctAnswerIndex: 0,
    explanation: 'Explication 2',
    level: 'beginner',
    theme: 'cloud',
  },
];

const stateWithQuiz: QuizState = {
  ...initialState,
  screen: 'quiz',
  selectedLevel: 'beginner',
  questions: mockQuestions,
  currentQuestionIndex: 0,
};

// ── SELECT_LEVEL ──────────────────────────────────────────────────────────────
describe('SELECT_LEVEL', () => {
  it('met à jour selectedLevel', () => {
    const result = quizReducer(initialState, { type: 'SELECT_LEVEL', payload: 'intermediate' });
    expect(result.selectedLevel).toBe('intermediate');
  });

  it('ne change pas le reste de l\'état', () => {
    const result = quizReducer(initialState, { type: 'SELECT_LEVEL', payload: 'advanced' });
    expect(result.screen).toBe('home');
    expect(result.score).toBe(0);
  });
});

// ── START_QUIZ ────────────────────────────────────────────────────────────────
describe('START_QUIZ', () => {
  it('passe screen à "quiz" et initialise les questions', () => {
    const result = quizReducer(
      { ...initialState, selectedLevel: 'beginner' },
      { type: 'START_QUIZ', payload: mockQuestions }
    );
    expect(result.screen).toBe('quiz');
    expect(result.questions).toHaveLength(mockQuestions.length);
    expect(result.currentQuestionIndex).toBe(0);
    expect(result.score).toBe(0);
    expect(result.userAnswers).toHaveLength(0);
  });
});

// ── ANSWER_QUESTION ───────────────────────────────────────────────────────────
describe('ANSWER_QUESTION', () => {
  it('incrémente le score pour une bonne réponse (index 1)', () => {
    const result = quizReducer(stateWithQuiz, {
      type: 'ANSWER_QUESTION',
      payload: { selectedIndex: 1 }, // correctAnswerIndex de test-001
    });
    expect(result.score).toBe(1);
    expect(result.userAnswers[0].isCorrect).toBe(true);
  });

  it('ne change pas le score pour une mauvaise réponse', () => {
    const result = quizReducer(stateWithQuiz, {
      type: 'ANSWER_QUESTION',
      payload: { selectedIndex: 0 }, // mauvais index
    });
    expect(result.score).toBe(0);
    expect(result.userAnswers[0].isCorrect).toBe(false);
  });

  it('enregistre isCorrect: false pour une réponse null (temps écoulé)', () => {
    const result = quizReducer(stateWithQuiz, {
      type: 'ANSWER_QUESTION',
      payload: { selectedIndex: null },
    });
    expect(result.score).toBe(0);
    expect(result.userAnswers[0].isCorrect).toBe(false);
    expect(result.userAnswers[0].selectedIndex).toBeNull();
  });
});

// ── NEXT_QUESTION ─────────────────────────────────────────────────────────────
describe('NEXT_QUESTION', () => {
  it('incrémente currentQuestionIndex si ce n\'est pas la dernière question', () => {
    const result = quizReducer(stateWithQuiz, { type: 'NEXT_QUESTION' });
    expect(result.currentQuestionIndex).toBe(1);
    expect(result.screen).toBe('quiz');
  });

  it('passe screen à "results" à la dernière question', () => {
    const lastQuestionState: QuizState = {
      ...stateWithQuiz,
      currentQuestionIndex: mockQuestions.length - 1,
    };
    const result = quizReducer(lastQuestionState, { type: 'NEXT_QUESTION' });
    expect(result.screen).toBe('results');
  });
});

// ── FINISH_QUIZ ───────────────────────────────────────────────────────────────
describe('FINISH_QUIZ', () => {
  it('passe screen à "results"', () => {
    const result = quizReducer(stateWithQuiz, { type: 'FINISH_QUIZ' });
    expect(result.screen).toBe('results');
  });
});

// ── GO_HOME ───────────────────────────────────────────────────────────────────
describe('GO_HOME', () => {
  it('remet l\'état à initialState', () => {
    const modified: QuizState = { ...stateWithQuiz, score: 5 };
    const result = quizReducer(modified, { type: 'GO_HOME' });
    expect(result).toEqual(initialState);
  });
});

// ── REPLAY ────────────────────────────────────────────────────────────────────
describe('REPLAY', () => {
  const stateAfterGame: QuizState = {
    ...stateWithQuiz,
    screen: 'results',
    score: 2,
    userAnswers: [
      { questionId: 'test-001', selectedIndex: 1, isCorrect: true },
      { questionId: 'test-002', selectedIndex: 0, isCorrect: true },
    ],
    currentQuestionIndex: 1,
  };

  it('remet score, userAnswers et currentQuestionIndex à zéro', () => {
    const result = quizReducer(stateAfterGame, {
      type: 'REPLAY',
      payload: mockQuestions,
    });
    expect(result.score).toBe(0);
    expect(result.userAnswers).toHaveLength(0);
    expect(result.currentQuestionIndex).toBe(0);
    expect(result.screen).toBe('quiz');
  });

  it('remplace les questions par le payload', () => {
    const newQuestions: Question[] = [
      { ...mockQuestions[0], id: 'new-001' },
    ];
    const result = quizReducer(stateAfterGame, {
      type: 'REPLAY',
      payload: newQuestions,
    });
    expect(result.questions[0].id).toBe('new-001');
  });
});

// ── TOGGLE_ABOUT ──────────────────────────────────────────────────────────────
describe('TOGGLE_ABOUT', () => {
  it('bascule isAboutOpen de false à true', () => {
    const result = quizReducer(initialState, { type: 'TOGGLE_ABOUT' });
    expect(result.isAboutOpen).toBe(true);
  });

  it('bascule isAboutOpen de true à false', () => {
    const result = quizReducer({ ...initialState, isAboutOpen: true }, { type: 'TOGGLE_ABOUT' });
    expect(result.isAboutOpen).toBe(false);
  });
});
