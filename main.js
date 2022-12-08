let previousEntry = "";
let currentEntry = "";
let operatorEntry = "";

let previousDisplayEntry = document.querySelector(".previous-entry");
let currentDisplayEntry = document.querySelector(".current-entry");

const clearDisplay = document.querySelector(".clear-display");
const backspace = document.querySelector(".backspace");
const equal = document.querySelector(".equal");
const decimal = document.querySelector(".decimal");

const operators = document.querySelectorAll(".operator");
const numbers = document.querySelectorAll(".number");

clearDisplay.addEventListener("click", function () {
  previousEntry = "";
  currentEntry = "";
  operatorEntry = "";
  previousDisplayEntry.textContent = previousEntry;
  currentDisplayEntry.textContent = currentEntry;
});

backspace.addEventListener("click", function () {
  handleDelete();
});

equal.addEventListener("click", function () {
  if (previousEntry != "" && currentEntry != "") {
    operate();
    previousDisplayEntry.textContent = "";
    if (previousEntry.length <= 13) {
      currentDisplayEntry.textContent = previousEntry;
    } else {
      currentDisplayEntry.textContent = `${previousEntry.slice(0, 13)}...`;
    }
  }
});

decimal.addEventListener("click", function () {
  addDecimal();
});

operators.forEach((operator) =>
  operator.addEventListener("click", function (event) {
    handleOperator(event.target.textContent);
    previousDisplayEntry.textContent = `${previousEntry} ${operatorEntry}`;
    currentDisplayEntry.textContent = currentEntry;
  })
);

numbers.forEach((number) =>
  number.addEventListener("click", function (event) {
    handleNumber(event.target.textContent);
    currentDisplayEntry.textContent = currentEntry;
  })
);

function updateDisplay() {
  currentDisplayEntry.textContent = currentEntry;
}

function handleDelete() {
  currentEntry = currentEntry.toString().slice(0, -1);
}

function addDecimal() {
  if (!currentEntry.includes(".")) {
    currentEntry += ".";
  }
}

function handleOperator(operator) {
  if (currentEntry === "") return;
  operatorEntry = operator;
  previousEntry = currentEntry;
  currentEntry = "";
}

function handleNumber(number) {
  if (currentEntry.length < 13) {
    currentEntry = currentEntry.toString() + number.toString();
  }
}
function handleRounding(number) {
  return Math.round(number * 100000) / 100000;
}

function operate() {
  previousEntry = Number(previousEntry);
  currentEntry = Number(currentEntry);
  if (operatorEntry === "+") {
    previousEntry += currentEntry;
  } else if (operatorEntry === "-") {
    previousEntry -= currentEntry;
  } else if (operatorEntry === "x") {
    previousEntry *= currentEntry;
  } else if (operatorEntry === "/") {
    previousEntry /= currentEntry;
  }
  previousEntry = handleRounding(previousEntry);
  previousEntry = previousEntry.toString();
  currentEntry = previousEntry.toString();
}
