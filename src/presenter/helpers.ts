import {
  addError,
  endQuestion,
  resolveLetter,
  setNextQuestion,
  state,
} from "../model/state";
import { maxErrors } from "../utils/consts";
import getResults from "./get-results";
import { HistoryState } from "../types/history";

const switchToNextQuestion = () => {
  setTimeout(() => {
    setNextQuestion();

    const { id, currentQuestionNumber } = state;

    state.view!.drawQuestion(state, getResults);

    history.pushState(
      { id, questionNumber: currentQuestionNumber } as HistoryState,
      ""
    );
  }, 500);
};

const onQuestionFail = () => {
  const currentQuestion = state.currentQuestion!;

  state.view!.failQuestion(
    currentQuestion.word,
    currentQuestion.currentLetterIndex
  );

  endQuestion();
  switchToNextQuestion();
};

const onQuestionSuccess = () => {
  switchToNextQuestion();
};

export const onError = (clickedButtonIndex: number) => {
  const currentQuestion = state.currentQuestion!;

  addError();

  if (currentQuestion.errors <= maxErrors) {
    if (clickedButtonIndex > -1) {
      state.view!.showError(clickedButtonIndex);
    }

    return;
  }

  onQuestionFail();
};

export const onSuccess = (clickedButtonIndex: number) => {
  const currentQuestion = state.currentQuestion!;
  const { letters } = currentQuestion;
  const leftPart = letters.slice(0, clickedButtonIndex);
  const rightPart = letters.slice(clickedButtonIndex + 1);
  const newLetters = `${leftPart}${rightPart}`;

  const isQuestionDone =
    currentQuestion.currentLetterIndex === currentQuestion.word.length - 1;

  resolveLetter(newLetters);
  state.view!.moveButton(clickedButtonIndex);

  if (isQuestionDone) {
    onQuestionSuccess();
  }
};
