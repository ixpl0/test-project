import { State } from "./state";
import { Results } from "./results";

export interface View {
  readonly drawQuestion: (state: State, getResults: () => Results) => void;
  readonly moveButton: (buttonIndex: number) => void;
  readonly showError: (buttonIndex: number) => void;
  readonly failQuestion: (word: string, currentLetterIndex: number) => void;
}
