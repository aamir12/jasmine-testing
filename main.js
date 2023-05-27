const inputValue = document.getElementById("inputValue");
function calculate(value) {
  const inputValue = value;
  const expression = /\+|\*|\-|\//;
  //console.log(expression);
  const numbers = inputValue.split(expression);
  const numberA = +numbers[0];
  const numberB = +numbers[1];
  const operation = inputValue.match(expression);
  if (isNaN(numberA) || isNaN(numberB) || operation === null) {
    updateResult("Expression not recognized");
    return;
  }
  const operator = operation[0];

  const calculator = new Calculator();
  calculator.add(numberA);

  let result;
  switch (operator) {
    case "+":
      result = calculator.add(numberB);
      break;
    case "-":
      result = calculator.subtract(numberB);
      break;
    case "*":
      result = calculator.multiply(numberB);
      break;
    case "/":
      result = calculator.divide(numberB);
      break;
  }
  updateResult(result);
}

function updateResult(result) {
  let element = document.getElementById("result");
  if (element) {
    element.innerText = result;
  }
}

function showVersion() {
  const element = document.getElementById("version");
  const calculate = new Calculator();
  if (element) {
    calculate.version.then(function (version) {
      element.innerText = version;
    });
  }
}

function showCalculotorType() {
  const element = document.getElementById("calType");
  const calculate = new Calculator();
  if (element) {
    element.innerText = calculate.calculatorType;
  }
}

inputValue &&
  inputValue.addEventListener("change", function (event) {
    calculate(event.target.value);
  });
