import { getRandomId, getRandomQuestions } from "./random";
import { State } from "../types/state";
import { saveStateToStorage } from "./storage";
import { View } from "../types/view";

export let state: State = {
  id: "",
  questions: [],
  currentQuestionNumber: 0,
};

const getInitialState = (): State => {
  const questions = getRandomQuestions();

  return {
    id: getRandomId(),
    questions,
    currentQuestionNumber: 0,
    currentQuestion: questions[0],
  };
};

export const setState = (newState: State): State => {
  state = newState;
  saveStateToStorage(state);

  return state;
};

export const setQuestion = (questionNumber: number) => {
  state.currentQuestionNumber = questionNumber;
  state.currentQuestion = state.questions[questionNumber];
  saveStateToStorage(state);
};

export const setNextQuestion = () => {
  setQuestion(state.currentQuestionNumber + 1);
};

export const endQuestion = () => {
  const currentQuestion = state.currentQuestion!;

  currentQuestion.currentLetterIndex = currentQuestion.word.length;
  currentQuestion.letters = "";

  saveStateToStorage(state);
};

export const addError = () => {
  state.currentQuestion!.errors += 1;

  saveStateToStorage(state);
};

export const resolveLetter = (newLetters: string) => {
  const currentQuestion = state.currentQuestion!;

  currentQuestion.currentLetterIndex += 1;
  currentQuestion.letters = newLetters;

  saveStateToStorage(state);
};

export const resetState = (): State => {
  setState(getInitialState());

  saveStateToStorage(state);

  return state;
};

export const setView = (view: View) => {
  state.view = view;
};
