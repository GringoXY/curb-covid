const btnDecrease = document.querySelector(".c-settings__btn--font-decrease");
const btnIncrease = document.querySelector(".c-settings__btn--font-increase");
let defaultFontSize = parseInt(10, 10);
let isFontIncreasing = false;

function changeFontSize(bodyFontSize, isFontIncreased) {
  const { body } = document;
  bodyFontSize = isFontIncreased ? ++bodyFontSize : --bodyFontSize;
  body.style.fontSize = `calc(${bodyFontSize}px + 2vmin)`;

  return bodyFontSize;
}

btnDecrease.addEventListener("click", () => {
  isFontIncreasing = false;
  if (defaultFontSize > 6) {
    defaultFontSize = changeFontSize(defaultFontSize, isFontIncreasing);
  }
});

btnIncrease.addEventListener("click", () => {
  isFontIncreasing = true;
  if (defaultFontSize < 13) {
    defaultFontSize = changeFontSize(defaultFontSize, isFontIncreasing);
  }
});