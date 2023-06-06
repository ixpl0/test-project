import { onHistoryPop, onKeyPress, onLetterClick } from "./on-user-input";
import { UserInputHandlers } from "../types/user-input-handlers";

const userInputHandlers: UserInputHandlers = {
  onLetterClick,
  onKeyPress,
  onHistoryPop,
};

export default userInputHandlers;
