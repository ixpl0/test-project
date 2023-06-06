import { setState, resetState } from "./state";
import { State } from "../types/state";

const initState = (stateFromStorage?: State): State =>
  stateFromStorage ? setState(stateFromStorage) : resetState();

export default initState;
