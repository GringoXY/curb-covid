function toggleContrastMode(isContrastOn) {
  const { body } = document;
  isContrastOn
    ? body.classList.add("contrast")
    : body.classList.remove("contrast");
}

const btnContrast = document.querySelector(".c-settings__btn--is-contrast-on");
let isContrastSet = localStorage.getItem("contrast");

toggleContrastMode(isContrastSet);

btnContrast.addEventListener("click", () => {
  // make negation of isContrastSet
  isContrastSet = (isContrastSet === "true")
    ? ""
    : "true";
  localStorage.setItem("contrast", `${isContrastSet}`);
  toggleContrastMode(isContrastSet);
});