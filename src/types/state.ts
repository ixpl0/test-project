import { View } from "./view";

export interface Question {
  readonly word: string;
  currentLetterIndex: number;
  errors: number;
  letters: string;
}

export interface State {
  id: string;
  questions: Question[];
  currentQuestionNumber: number;
  currentQuestion?: Question;
  view?: View;
}
