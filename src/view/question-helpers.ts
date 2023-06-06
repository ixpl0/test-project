import {
  answerBoxId,
  currentQuestionBoxId,
  errorsCountBoxId,
  hardestWordBoxId,
  lettersBoxId,
  perfectWordsBoxId,
  questionBoxId,
  resultsBoxId,
  totalQuestionsBoxId,
} from "./consts";
import { maxErrors, totalQuestions } from "../utils/consts";
import { createButton } from "./helpers";
import { State } from "../types/state";
import { Results } from "../types/results";

export const drawTitle = (state: Readonly<State>) => {
  const currentQuestionElement = document.getElementById(currentQuestionBoxId)!;
  const totalQuestionsElement = document.getElementById(totalQuestionsBoxId)!;

  currentQuestionElement.textContent = String(state.currentQuestionNumber + 1);
  totalQuestionsElement.textContent = String(totalQuestions);
};

export const drawAnswer = (state: Readonly<State>) => {
  const currentQuestion = state.currentQuestion!;
  const { word, currentLetterIndex, errors } = currentQuestion;
  const answerBox = document.getElementById(answerBoxId)!;
  const buttonClass = errors > maxErrors ? "btn-danger" : "btn-success";

  const buttons = word
    .slice(0, currentLetterIndex)
    .split("")
    .map((letter) => createButton(letter, ["btn", buttonClass]));

  answerBox.innerHTML = "";
  answerBox.append(...buttons);
};

export const drawLetters = (state: Readonly<State>) => {
  const currentQuestion = state.currentQuestion!;
  const { letters } = currentQuestion;
  const lettersBox = document.getElementById(lettersBoxId)!;

  const buttons = letters
    .split("")
    .map((letter) => createButton(letter, ["btn", "btn-primary"]));

  lettersBox.innerHTML = "";
  lettersBox.append(...buttons);
};

export const drawResults = (getResults: () => Results) => {
  const perfectWordsBox = document.getElementById(perfectWordsBoxId)!;
  const errorsCountBox = document.getElementById(errorsCountBoxId)!;
  const hardestWordBox = document.getElementById(hardestWordBoxId)!;
  const resultsBox = document.getElementById(resultsBoxId)!;
  const questionBox = document.getElementById(questionBoxId)!;
  const { perfectWordsCount, errorsTotalCount, hardestWord } = getResults();

  perfectWordsBox.textContent = String(perfectWordsCount);
  errorsCountBox.textContent = String(errorsTotalCount);
  hardestWordBox.textContent = hardestWord;
  resultsBox.classList.replace("d-none", "d-flex");
  questionBox.classList.replace("d-flex", "d-none");
};
