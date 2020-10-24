const spanQuote = document.querySelector(".c-about__quote");
const img = document.querySelectorAll(".c-about__img");
const text = document.querySelectorAll(".c-about__text");

const elementsToAnimate = [spanQuote, ...img, ...text];

window.addEventListener("scroll", () => {
  elementsToAnimate.forEach(element => {
    const elementCords = element.getBoundingClientRect();
    const elementY = elementCords.top;

    const windowY = window.pageYOffset;
    if (windowY > elementY) {
      const elementClass = element.className.split(' ')[0];
      const elementNewClass = `${elementClass}--is-visible`;
      element.classList.add(`${elementNewClass}`);
    }
  });
});