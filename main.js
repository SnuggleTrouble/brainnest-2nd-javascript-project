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

/*-------------------------------- Event Listeners --------------------------------*/
window.addEventListener("keydown", handleKeyPress);

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
    updateDisplay();
  })
);

clearDisplay.addEventListener("click", function () {
  previousEntry = "";
  currentEntry = "";
  operatorEntry = "";
  previousDisplayEntry.textContent = previousEntry;
  currentDisplayEntry.textContent = currentEntry;
});

backspace.addEventListener("click", function () {
  handleDelete();
  updateDisplay();
});

equal.addEventListener("click", function () {
  if (previousEntry != "" && currentEntry != "") {
    operate();
    previousDisplayEntry.textContent = "";
    if (previousEntry.length <= 13) {
      currentDisplayEntry.textContent = previousEntry;
    } else {
      currentDisplayEntry.textContent = `${previousEntry
        .toString()
        .slice(0, 13)}...`;
    }
    updateDisplay();
  }
});

decimal.addEventListener("click", function () {
  addDecimal();
});

/*----------------------------------- Functions -----------------------------------*/
function add(num1, num2) {
  return num1 + num2;
}
function subtract(num1, num2) {
  return num1 - num2;
}
function multiply(num1, num2) {
  return num1 * num2;
}
function divide(num1, num2) {
  return num1 / num2;
}

function operate() {
  let result;
  previousEntry = parseFloat(previousEntry);
  currentEntry = parseFloat(currentEntry);
  if (isNaN(previousEntry) || isNaN(currentEntry)) return;
  switch (operatorEntry) {
    case "+":
      result = add(previousEntry, currentEntry);
      break;
    case "-":
      result = subtract(previousEntry, currentEntry);
      break;
    case "x":
      result = multiply(previousEntry, currentEntry);
      break;
    case "÷":
    case "/":
      if (currentEntry === 0) {
        operatorEntry = "";
        previousEntry = "";
        currentEntry = "To infinity & Beyond!";
        return;
      }
      result = divide(previousEntry, currentEntry);
      break;
    default:
      return;
  }
  result = handleRounding(result);
  currentEntry = result;
  operatorEntry = undefined;
  previousEntry = "";
}

function addDecimal() {
  if (!currentEntry.includes(".")) {
    currentEntry += ".";
  }
  updateDisplay();
}

function updateDisplay() {
  currentDisplayEntry.textContent = currentEntry;
  if (operatorEntry != null) {
    previousDisplayEntry.textContent = `${previousEntry} ${operatorEntry}`;
  }
}

function handleDelete() {
  currentEntry = currentEntry.toString().slice(0, -1);
  updateDisplay();
}

function handleOperator(operator) {
  if (currentEntry === "") return;
  if (previousEntry !== "") {
    operate();
  }
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

function handleKeyPress(event) {
  event.preventDefault();
  if (event.key >= 0 && event.key <= 9) {
    handleNumber(event.key);
  }
  if (
    event.key === "Enter" ||
    (event.key === "=" && previousEntry != "" && currentEntry != "")
  ) {
    operate();
  }
  if (event.key === "+" || event.key === "-" || event.key === "/") {
    handleOperator(event.key);
  }
  if (event.key === "*" || event.key === "x") {
    handleOperator("x");
  }
  if (event.key === ".") {
    addDecimal();
  }
  if (event.key === "Backspace") {
    handleDelete();
  }
  updateDisplay();
}
