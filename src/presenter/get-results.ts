import { state } from "../model/state";
import { Results } from "../types/results";

const getResults = (): Results => {
  const { questions } = state;

  const perfectWordsCount = questions.filter(
    ({ errors }) => errors === 0
  ).length;

  const errorsTotalCount = questions.reduce(
    (acc, { errors }) => acc + errors,
    0
  );

  const { errors, word } = questions.reduce((acc, question) =>
    acc.errors > question.errors ? acc : question
  );

  const hardestWord = errors ? word : "-";

  return {
    perfectWordsCount,
    errorsTotalCount,
    hardestWord,
  };
};

export default getResults;
