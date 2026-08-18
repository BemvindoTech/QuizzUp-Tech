import type { Question, Level } from '../types/quiz.types';

/** Nombre de questions par niveau (REQ-06, REQ-07, REQ-08) */
export const QUESTION_COUNT: Record<Level, number> = {
  beginner: 10,
  intermediate: 15,
  advanced: 20,
};

/**
 * Mélange un tableau en utilisant l'algorithme Fisher-Yates.
 * Ne mute pas le tableau original.
 */
export function shuffle<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/**
 * Filtre les questions par niveau, mélange et retourne exactement N questions.
 * Lève une Error si la banque ne contient pas assez de questions (REQ-29).
 */
export function selectQuestions(bank: Question[], level: Level): Question[] {
  const filtered = bank.filter((q) => q.level === level);
  const needed = QUESTION_COUNT[level];

  if (filtered.length < needed) {
    throw new Error(
      `Pas assez de questions pour le niveau "${level}" : ${filtered.length} disponibles, ${needed} requises.`
    );
  }

  return shuffle(filtered).slice(0, needed);
}
