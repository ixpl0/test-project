import {
  drawTitle,
  drawAnswer,
  drawLetters,
  drawResults,
} from "./question-helpers";
import {
  answerBoxId,
  lettersBoxId,
  questionBoxId,
  resultsBoxId,
} from "./consts";
import { createButton } from "./helpers";
import { State } from "../types/state";
import { Results } from "../types/results";

export const drawQuestion = (
  state: Readonly<State>,
  getResults: () => Results
) => {
  const { currentQuestion } = state;

  if (!currentQuestion) {
    drawResults(getResults);

    return;
  }

  document.getElementById(questionBoxId)!.classList.replace("d-none", "d-flex");
  document.getElementById(resultsBoxId)!.classList.replace("d-flex", "d-none");

  drawTitle(state);
  drawAnswer(state);
  drawLetters(state);
};

export const moveButton = (buttonIndex: number) => {
  const answerBox = document.getElementById(answerBoxId)!;
  const lettersBox = document.getElementById(lettersBoxId)!;
  const button = lettersBox.children.item(buttonIndex)!;
  const { classList } = button;

  answerBox.appendChild(button);

  setTimeout(() => {
    classList.replace("btn-primary", "btn-success");
  });
};

export const showError = (buttonIndex: number) => {
  const lettersBox = document.getElementById(lettersBoxId)!;
  const button = lettersBox.children.item(buttonIndex)!;
  const { classList } = button;

  classList.replace("btn-primary", "btn-danger");

  setTimeout(() => {
    classList.replace("btn-danger", "btn-primary");
  }, 200);
};

export const failQuestion = (word: string, currentLetterIndex: number) => {
  const answerBox = document.getElementById(answerBoxId)!;
  const lettersBox = document.getElementById(lettersBoxId)!;

  const buttons = word
    .slice(currentLetterIndex)
    .split("")
    .map((letter) => createButton(letter, ["btn", "btn-primary"]));

  answerBox.append(...buttons);
  lettersBox.innerHTML = "";

  setTimeout(() => {
    const { children } = answerBox;

    [...children].forEach((button) => {
      const { classList } = button;

      classList.replace("btn-primary", "btn-danger");
      classList.replace("btn-success", "btn-danger");
    });
  });
};
