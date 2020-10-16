function changeRangeValue(isIncreased) {
  const unit = parseInt(1, 10);

  inputRange.value = (isIncreased)
    ? parseInt(inputRange.value, 10) + unit
    : parseInt(inputRange.value, 10) - unit;

  text.textContent = `${inputRange.value}`;
}

const inputRange = document.querySelector(".c-test__input-range");
const btnRangeDecrease = document.querySelector(".c-test__setting--age-decrease");
const btnRangeIncrease = document.querySelector(".c-test__setting--age-increase");
const text = document.querySelector(".c-test__age");

inputRange.oninput = () => {
  text.textContent = `${inputRange.value}`;
};

btnRangeIncrease.addEventListener("click", () => {
  changeRangeValue(true);
});

btnRangeDecrease.addEventListener("click", () => {
  changeRangeValue(false);
});