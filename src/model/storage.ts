import { State } from "../types/state";

export const saveStateToStorage = (state: State) => {
  localStorage.setItem("state", JSON.stringify(state));
};
