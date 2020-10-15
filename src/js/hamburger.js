const btnHamburger = document.querySelector(".c-nav__btn");
const spanHamburger = document.querySelector(".c-nav__hamburger");
const navList = document.querySelector(".c-nav__list--fill-window");
const { style } = navList;
let isClicked = false;

btnHamburger.addEventListener("click", () => {
  isClicked = !isClicked;

  if (isClicked) {
    style.transform = "translateX(0)";
    spanHamburger.classList.add("c-nav__hamburger--is-displayed");
  } else {
    style.transform = "translateX(100%)";
    spanHamburger.classList.remove("c-nav__hamburger--is-displayed");
  }
});