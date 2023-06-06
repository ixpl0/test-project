import { totalQuestions } from "../utils/consts";
import { State } from "../types/state";
import { state } from "../model/state";
import { HistoryState } from "../types/history";

export const getStateFromStorage = (): State | undefined => {
  const stateFromStorageJson = localStorage.getItem("state");
  const isStorageEmpty = !stateFromStorageJson;

  if (isStorageEmpty) {
    return;
  }

  const stateFromStorage = JSON.parse(stateFromStorageJson) as State;
  const isTrainingFinished =
    stateFromStorage.currentQuestionNumber >= totalQuestions;
  const isTrainingNotStarted =
    !stateFromStorage.questions[0]!.currentLetterIndex;

  if (isTrainingFinished || isTrainingNotStarted) {
    return;
  }

  const isCurrentQuestionDone = !stateFromStorage.currentQuestion!.letters;

  // на случай, если сохранение восстанавливаемого стейта пришлось на момент, пока мы гуляли по браузерной истории
  if (isCurrentQuestionDone) {
    const nextUnsolvedQuestionNumber = stateFromStorage.questions.findIndex(
      ({ letters }) => letters
    );

    const isTrainingDone = nextUnsolvedQuestionNumber === -1;

    if (isTrainingDone) {
      return;
    }

    stateFromStorage.currentQuestionNumber = nextUnsolvedQuestionNumber;

    stateFromStorage.currentQuestion =
      stateFromStorage.questions[nextUnsolvedQuestionNumber];
  }

  return stateFromStorage;
};

export const initRestoredHistory = () => {
  const { id, currentQuestionNumber } = state;

  Array.from({ length: currentQuestionNumber + 1 }).forEach((_, i) => {
    history.pushState({ id, questionNumber: i } as HistoryState, "");
  });
};
