

function initSlider() {
  // Set the CSS transition on the fields to the value we specified in SLIDETIME above
  allFields.forEach(field =>
    field.setAttribute(
      "style",
      `transition: transform ${SLIDETIME}ms ease-in;
       animation-duration: ${SLIDETIME}ms;`,
    ),
  );
}

function changeField(forward) {
  if (clickable) {
    clickable = false;
    displayed = document.querySelector(".c-test__field--is-displayed");
    let newDisplayedFieldIndex = parseInt(0, 10);
    const displayedFieldIndex = allFields.indexOf(displayed);

    if (forward) {
      newDisplayed = allFields[(displayedFieldIndex + 1) % allFields.length];
      newDisplayedFieldIndex = parseInt(displayedFieldIndex + 1, 10);
      displayed.classList.add("c-test__field--is-slided-out-left");
      newDisplayed.classList.add("c-test__field--is-slided-in-right", "c-test__field--is-displayed");
    } else {
      newDisplayed =
        allFields[
        (displayedFieldIndex - 1 + allFields.length) % allFields.length
        ];
      newDisplayedFieldIndex = parseInt(displayedFieldIndex - 1, 10);
      displayed.classList.add("c-test__field--is-slided-out-right");
      newDisplayed.classList.add("c-test__field--is-slided-in-left", "c-test__field--is-displayed");
    }

    switch (newDisplayedFieldIndex) {
      case 10:
        forwardButton.disabled = true;
        break;
      case 0:
        backButton.disabled = true;
        break;
      default:
        forwardButton.disabled = false;
        backButton.disabled = false;
        break;
    }
  }
}

const SLIDETIME = 500; //ms

const backButton = document.querySelector(".c-test__btn--back");
backButton.disabled = true;
const forwardButton = document.querySelector(".c-test__btn--next");
// Select all fields and convert node to array for easy handling
const allFields = [...document.querySelectorAll(".c-test__field")];
let clickable = true;
let displayed = null;
let newDisplayed = null;

allFields.forEach(field => {
  field.addEventListener("transitionend", e => {
    // Check for the old displayed transition and if clickable is false
    // do not trigger it more than once
    if (field === displayed && !clickable) {
      clickable = true;
      // Remove all CSS animation classes on old displayed
      const displayedFieldIndex = allFields.indexOf(displayed);
      displayed.className = displayedFieldIndex === 10
        ? "c-test__field c-test__result"
        : "c-test__field";
    }
  });
});

//Event listeners
forwardButton.addEventListener("click", () => {
  changeField(true);
});
backButton.addEventListener("click", () => {
  changeField(false);
});

// Init the slider
initSlider();