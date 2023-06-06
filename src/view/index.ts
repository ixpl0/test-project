import initUserInputHandlers from "./init-user-input-handlers";
import { drawQuestion, moveButton, showError, failQuestion } from "./question";
import { UserInputHandlers } from "../types/user-input-handlers";
import { View } from "../types/view";

const initView = (userInputHandlers: Readonly<UserInputHandlers>): View => {
  initUserInputHandlers(userInputHandlers);

  return {
    drawQuestion,
    moveButton,
    showError,
    failQuestion,
  };
};

export default initView;
