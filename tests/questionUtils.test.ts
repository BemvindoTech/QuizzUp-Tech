import { describe, it, expect } from 'vitest';
import { shuffle, selectQuestions, QUESTION_COUNT } from '../src/data/questionUtils';
import type { Question, Level } from '../src/types/quiz.types';
import rawBank from '../src/data/questions.json';

const bank = rawBank as Question[];

// ── shuffle ──────────────────────────────────────────────────────────────────

describe('shuffle', () => {
  it('ne mute pas le tableau original', () => {
    const original = [1, 2, 3, 4, 5];
    const copy = [...original];
    shuffle(original);
    expect(original).toEqual(copy);
  });

  it('conserve tous les éléments (même longueur, mêmes valeurs)', () => {
    const arr = ['a', 'b', 'c', 'd', 'e'];
    const result = shuffle(arr);
    expect(result).toHaveLength(arr.length);
    expect(result.sort()).toEqual([...arr].sort());
  });

  it('retourne un tableau (pas undefined)', () => {
    expect(shuffle([1, 2, 3])).toBeDefined();
  });
});

// ── selectQuestions ───────────────────────────────────────────────────────────

describe('selectQuestions', () => {
  const levels: Level[] = ['beginner', 'intermediate', 'advanced'];

  levels.forEach((level) => {
    it(`retourne exactement ${QUESTION_COUNT[level]} questions pour le niveau "${level}"`, () => {
      const result = selectQuestions(bank, level);
      expect(result).toHaveLength(QUESTION_COUNT[level]);
    });

    it(`toutes les questions retournées sont du niveau "${level}"`, () => {
      const result = selectQuestions(bank, level);
      result.forEach((q) => expect(q.level).toBe(level));
    });
  });

  it('lève une erreur si la banque est insuffisante', () => {
    const tinyBank: Question[] = bank
      .filter((q) => q.level === 'beginner')
      .slice(0, 3); // 3 < 10 requis
    expect(() => selectQuestions(tinyBank, 'beginner')).toThrow();
  });

  it('retourne des ordres différents entre deux appels (test probabilistique)', () => {
    let different = false;
    for (let i = 0; i < 10; i++) {
      const r1 = selectQuestions(bank, 'beginner').map((q) => q.id);
      const r2 = selectQuestions(bank, 'beginner').map((q) => q.id);
      if (r1.join() !== r2.join()) {
        different = true;
        break;
      }
    }
    // Sur 10 essais, les ordres doivent différer au moins une fois
    expect(different).toBe(true);
  });
});
