import { setQuestion, state } from "../model/state";
import { maxErrors } from "../utils/consts";
import { onError, onSuccess } from "./helpers";
import getResults from "./get-results";

export const onLetterClick = (clickedButtonIndex: number) => {
  const currentQuestion = state.currentQuestion!;
  const { word, letters, currentLetterIndex, errors } = currentQuestion;
  const isQuestionDone = currentLetterIndex === word.length;

  if (errors > maxErrors || isQuestionDone) {
    return;
  }

  const isCorrectClick =
    word[currentLetterIndex] === letters[clickedButtonIndex];

  if (!isCorrectClick) {
    onError(clickedButtonIndex);

    return;
  }

  onSuccess(clickedButtonIndex);
};

export const onKeyPress = (keyPressed: string) => {
  const clickedButtonIndex = state.currentQuestion!.letters.indexOf(keyPressed);

  onLetterClick(clickedButtonIndex);
};

export const onHistoryPop = (questionNumber: number) => {
  setQuestion(questionNumber);

  state.view!.drawQuestion(state, getResults);
};
