import { describe, it, expect } from 'vitest';
import rawBank from '../src/data/questions.json';
import type { Question, Level, Theme } from '../src/types/quiz.types';
import { QUESTION_COUNT } from '../src/data/questionUtils';

const bank = rawBank as Question[];

const VALID_LEVELS: Level[] = ['beginner', 'intermediate', 'advanced'];
const VALID_THEMES: Theme[] = ['ai', 'cloud', 'data', 'cybersecurity', 'devtools', 'ethics'];

describe('Validation de la banque de questions', () => {
  it('contient au moins 60 questions', () => {
    expect(bank.length).toBeGreaterThanOrEqual(60);
  });

  it('tous les ids sont uniques', () => {
    const ids = bank.map((q) => q.id);
    const unique = new Set(ids);
    expect(unique.size).toBe(ids.length);
  });

  it('chaque question possède tous les champs requis', () => {
    bank.forEach((q, i) => {
      expect(q.id,          `q[${i}] id manquant`).toBeTruthy();
      expect(q.text,        `q[${i}] text manquant`).toBeTruthy();
      expect(q.choices,     `q[${i}] choices manquant`).toBeDefined();
      expect(q.explanation, `q[${i}] explanation manquante`).toBeTruthy();
      expect(q.level,       `q[${i}] level manquant`).toBeTruthy();
      expect(q.theme,       `q[${i}] theme manquant`).toBeTruthy();
    });
  });

  it('chaque question a exactement 4 choix non vides', () => {
    bank.forEach((q, i) => {
      expect(q.choices, `q[${i}] choices doit être un tableau`).toBeInstanceOf(Array);
      expect(q.choices.length, `q[${i}] doit avoir 4 choix`).toBe(4);
      q.choices.forEach((c, j) => {
        expect(c.trim().length, `q[${i}] choix[${j}] ne doit pas être vide`).toBeGreaterThan(0);
      });
    });
  });

  it('correctAnswerIndex est entre 0 et 3', () => {
    bank.forEach((q, i) => {
      expect([0, 1, 2, 3], `q[${i}] correctAnswerIndex invalide`).toContain(q.correctAnswerIndex);
    });
  });

  it('level est une valeur valide', () => {
    bank.forEach((q, i) => {
      expect(VALID_LEVELS, `q[${i}] level invalide: ${q.level}`).toContain(q.level);
    });
  });

  it('theme est une valeur valide', () => {
    bank.forEach((q, i) => {
      expect(VALID_THEMES, `q[${i}] theme invalide: ${q.theme}`).toContain(q.theme);
    });
  });

  it(`contient au moins ${QUESTION_COUNT.beginner + 5} questions beginner`, () => {
    const count = bank.filter((q) => q.level === 'beginner').length;
    expect(count).toBeGreaterThanOrEqual(QUESTION_COUNT.beginner + 5);
  });

  it(`contient au moins ${QUESTION_COUNT.intermediate + 5} questions intermediate`, () => {
    const count = bank.filter((q) => q.level === 'intermediate').length;
    expect(count).toBeGreaterThanOrEqual(QUESTION_COUNT.intermediate + 5);
  });

  it(`contient au moins ${QUESTION_COUNT.advanced + 5} questions advanced`, () => {
    const count = bank.filter((q) => q.level === 'advanced').length;
    expect(count).toBeGreaterThanOrEqual(QUESTION_COUNT.advanced + 5);
  });
});
