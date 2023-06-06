import initState from "../model";
import initView from "../view";
import userInputHandlers from "./user-input-handlers";
import { setView, state } from "../model/state";
import getResults from "./get-results";
import { getStateFromStorage, initRestoredHistory } from "./storage";
import { HistoryState } from "../types/history";

const initApp = () => {
  const stateFromStorage = getStateFromStorage();

  if (
    stateFromStorage &&
    confirm("Обнаружена незаконченная тренировка. Хотите продолжить?") // прошу прощения за confirm :)
  ) {
    initState(stateFromStorage);
    initRestoredHistory();
  } else {
    initState();
  }

  const { id, currentQuestionNumber } = state;
  const view = initView(userInputHandlers);

  setView(view);
  view.drawQuestion(state, getResults);

  history.replaceState(
    { id, questionNumber: currentQuestionNumber } as HistoryState,
    ""
  );
};

export default initApp;
