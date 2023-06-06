type ShuffleResult<T> = T extends string ? string : T;

const shuffle = <T extends string | readonly any[]>(
  input: T
): ShuffleResult<T> => {
  const isString = typeof input === "string";
  const array = isString ? input.split("") : [...input];
  let i = array.length;

  while (i) {
    const j = Math.floor(Math.random() * i--);
    const tempElement = array[i];

    array[i] = array[j];
    array[j] = tempElement;
  }

  return (isString ? array.join("") : array) as ShuffleResult<T>;
};

export default shuffle;
