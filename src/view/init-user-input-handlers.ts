import { lettersBoxId } from "./consts";
import { UserInputHandlers } from "../types/user-input-handlers";
import { HistoryState } from "../types/history";
import { state } from "../model/state";

const initUserInputHandlers = (
  userInputHandlers: Readonly<UserInputHandlers>
) => {
  document.addEventListener("click", (event: MouseEvent) => {
    const targetElement = event.target as HTMLElement;
    const { parentElement } = targetElement;

    if (!parentElement || parentElement.id !== lettersBoxId) {
      return;
    }

    const letterElements = [...parentElement.children];
    const clickedButtonIndex = letterElements.indexOf(targetElement);

    userInputHandlers.onLetterClick(clickedButtonIndex);
  });

  document.addEventListener("keypress", (event: KeyboardEvent) => {
    const keyPressed = event.key.toLowerCase();
    const isLatinLetter = /^[a-z]$/.test(keyPressed);

    if (!isLatinLetter) {
      return;
    }

    userInputHandlers.onKeyPress(keyPressed);
  });

  window.addEventListener("popstate", (event: PopStateEvent) => {
    const currentHistoryState = event.state as HistoryState | undefined;

    if (!currentHistoryState) {
      return;
    }

    const { id, questionNumber } = currentHistoryState;
    const isWrongTrainingQuestion = id !== state.id;

    if (isWrongTrainingQuestion) {
      return;
    }

    userInputHandlers.onHistoryPop(questionNumber);
  });
};

export default initUserInputHandlers;
