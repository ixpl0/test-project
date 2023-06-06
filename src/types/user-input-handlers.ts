export interface UserInputHandlers {
  onLetterClick: (clickedButtonIndex: number) => void;
  onHistoryPop: (questionNumber: number) => void;
  onKeyPress: (keyPressed: string) => void;
}
