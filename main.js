let previousDisplayValue = "";
let currentDisplayValue = "";
let operatorSelection = "";

document.addEventListener("DOMContentLoaded", function () {
  let previousEntry = document.querySelector(".previous-entry");
  let currentEntry = document.querySelector(".current-entry");

  const clear = document.querySelector(".clear");
  const equal = document.querySelector(".equal");
  const decimal = document.querySelector(".decimal");

  const operators = document.querySelectorAll(".operator");
  const numbers = document.querySelectorAll(".number");

  clear.addEventListener("click", function (event) {
    clearEntry(event.target.textContent);
  });

  equal.addEventListener("click", function (event) {
    calculate(event.target.textContent);
  });

  decimal.addEventListener("click", function (event) {
    addDecimal(event.target.textContent);
  });

  operators.forEach((operator) =>
    operator.addEventListener("click", function (event) {
      handleOperator(event.target.textContent);
    })
  );

  numbers.forEach((number) =>
    number.addEventListener("click", function (event) {
      handleNumber(event.target.textContent);
    })
  );
});

function clearEntry(clear) {
  console.log(clear);
}

function calculate(equal) {
  console.log(equal);
}

function addDecimal(decimal) {
  console.log(decimal);
}

function handleOperator(operator) {
  console.log(operator);
}

function handleNumber(number) {
  console.log(number);
}
