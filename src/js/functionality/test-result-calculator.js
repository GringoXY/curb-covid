function displayCovidSymptoms(symptoms) {
  // make covid symptoms as list
  const listOfSymptoms = document.createElement("ul");
  listOfSymptoms.className = "c-test__list";

  // create list item on every element
  symptoms.forEach(symptom => {
    const listItem = document.createElement("li");
    listItem.textContent = symptom;
    listItem.className = "c-test__symptom";
    listOfSymptoms.appendChild(listItem);
  });

  return listOfSymptoms;
}

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
  const covidSymptoms = new Array();

  //summarize probability of having disease
  if (displayedFieldIndex === 9) {
    allInputs.forEach(input => {
      const isChecked = input.checked;
      if (isChecked) {
        const dataProbability = parseInt(input.getAttribute("data-probability"), 10);
        probabilityOfDisease += dataProbability;

        const isCovidSymptom = input.getAttribute("data-text");
        if (isCovidSymptom) {
          const symptom = isCovidSymptom;
          covidSymptoms.push(symptom);
        }
      }
    });

    // depending on probability of having disease display proper result field
    if (probabilityOfDisease > 15) {
      resultField.className = "c-test__field c-test__field--is-displayed c-test__result c-test__result--orange";
      resultTitle.textContent = "Call the emergency number. Avoid all contact.";

      // get list of symptoms
      const symptomsDescription = displayCovidSymptoms(covidSymptoms);

      // set description text
      resultDescription.textContent = "Your symptoms are very serious and you may have COVID-19.";
      resultDescription.appendChild(symptomsDescription);
    }
    else if (probabilityOfDisease > 10) {
      resultField.className = "c-test__field c-test__field--is-displayed c-test__result c-test__result--orange";
      resultTitle.textContent = "Call a doctor";

      // get list of symptoms
      const symptomsDescription = displayCovidSymptoms(covidSymptoms);

      // set description text
      resultDescription.textContent = "Your answers do not suggest that you have the COVID-19. However, your symptoms are worrisome and require medical consultation.";
      resultDescription.appendChild(symptomsDescription);
    }
    else if (probabilityOfDisease > 5) {
      resultField.className = "c-test__field c-test__field--is-displayed c-test__result c-test__result--white";
      resultTitle.textContent = "Stay home and monitor your symptoms.";
      resultDescription.textContent = "Your symptoms do not suggest that you have the COVID-19. Still, it is better if you recover from your illness or symptoms at home for your and other people’s safety. Remember that your symptoms may also result from other diseases and may require medical consultation - this interview targets the COVID-19 infection. If your symptoms seem severe and you are worried, contact your doctor or local health authorities.";
    }
    else {
      resultField.className = "c-test__field c-test__field--is-displayed c-test__result c-test__result--green";
      resultTitle.textContent = "Follow preventive measures.";
      resultDescription.textContent = "Your symptoms do not suggest that you have COVID-19. Continue following the common measures and government directives to avoid contracting COVID-19. Remember that your symptoms may also result from other diseases and may require medical consultation - this interview targets the COVID-19 infection. If your symptoms seem severe and you are worried, contact your doctor or local health authorities.";
    }

  }

  // reset probability when user want to make changes on form
  probabilityOfDisease = 0;
});