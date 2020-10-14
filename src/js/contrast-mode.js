const btnContrast = document.querySelector(".c-settings__btn--is-contrast-on");
let isContrastSet = false;

btnContrast.addEventListener("click", () => {
  isContrastSet = !isContrastSet;
  const { body } = document;

  isContrastSet ? body.classList.add("contrast") : body.classList.remove("contrast");
});