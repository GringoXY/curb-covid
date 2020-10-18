// catch elements to put in text content depending on result
const resultTitle = document.querySelector(".c-test__judgement");
const resultDescription = document.querySelector(".c-test__details");
const resultField = document.querySelector(".c-test__result");
// get all inputs except type of 'range'
const allInputRadios = document.querySelectorAll(".c-test__input-radio");
const allInputCheckboxes = document.querySelectorAll(".c-test__input-checkbox");
const allInputs = [...allInputRadios, ...allInputCheckboxes];

const btnNext = document.querySelector(".c-test__btn--next");
let probabilityOfDisease = parseInt(0, 10);
let displayedFieldIndex = parseInt(0, 10);

btnNext.addEventListener("click", () => {
  // get index of displayed field
  const fields = [...document.querySelectorAll(".c-test__field")];
  const displayedField = document.querySelector(".c-test__field--is-displayed");
  displayedFieldIndex = fields.indexOf(displayedField);

  //summarize probability of having disease
  if (displayedFieldIndex === 9) {
    allInputs.forEach(input => {
      if (input.checked) {
        const dataProbability = parseInt(input.getAttribute("data-probability"), 10);
        probabilityOfDisease += dataProbability;
      }
    });

    // depending on probability of having disease display proper result field
    if (probabilityOfDisease > 15) {
      resultField.className = "c-test__field c-test__field--is-displayed c-test__result c-test__result--red";
      resultTitle.textContent = "Very bad";
      resultDescription.textContent = "Call an ambulance immediately!";
    }
    else if (probabilityOfDisease > 10) {
      resultField.className = "c-test__field c-test__field--is-displayed c-test__result c-test__result--orange";
      resultTitle.textContent = "Bad";
      resultDescription.textContent = "Call a doctor";
    }
    else if (probabilityOfDisease > 5) {
      resultField.className = "c-test__field c-test__field--is-displayed c-test__result c-test__result--white";
      resultTitle.textContent = "You have light symptoms";
      resultDescription.textContent = "Eat healthy take vitamins & get hot tea with honey and lemon";
    }
    else {
      resultField.className = "c-test__field c-test__field--is-displayed c-test__result c-test__result--green";
      resultTitle.textContent = "It's all fine";
      resultDescription.textContent = "You don't have COVID-19 symptoms. Stay care <3";
    }

  }

  // reset probability when user want to make changes on form
  probabilityOfDisease = 0;
});