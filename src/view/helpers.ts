export const createButton = (
  text: string,
  classes: readonly string[]
): HTMLButtonElement => {
  const button = document.createElement("button");

  button.textContent = text;
  button.classList.add(...classes);

  return button;
};
