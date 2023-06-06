import { totalQuestions, wordList } from "../utils/consts";
import shuffle from "../utils/shuffle";
import { Question } from "../types/state";

const getRandomQuestionWords = (
  words: readonly string[],
  count: number
): string[] => shuffle(words).slice(0, count);

export const getRandomQuestions = (): Question[] =>
  getRandomQuestionWords(wordList, totalQuestions).map(
    (questionWord): Question => ({
      word: questionWord,
      currentLetterIndex: 0,
      errors: 0,
      letters: shuffle(questionWord),
    })
  );

export const getRandomId = (): string => Math.random().toString(16).slice(2);
