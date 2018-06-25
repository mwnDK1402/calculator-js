var style;
var quit;

function enterquit() {
  quit.style.backgroundColor = style.getPropertyValue('--hover-color');
};

function outquit() {
  quit.style.backgroundColor = style.getPropertyValue('--normal-color');
};

function downquit() {
  quit.style.backgroundColor = style.getPropertyValue('--press-color');
};

function upquit() {
  quit.style.backgroundColor = style.getPropertyValue('--normal-color');
};

function clickquit() {
  const {ipcRenderer} = require('electron');
  ipcRenderer.send('close-me');
};

require('./js/renderer');

window.addEventListener("load", function() {
  function getStyle(style) {
    var element = document.getElementById(style);
    return window.getComputedStyle(element);
  };

  style = getStyle('quit');
  quit = document.getElementById("quit");

  const display = document.getElementById("number-display");
  const Calculator = require('./js/calculator');
  const operations = require('./js/operationtreenode').operations;

  var calc = new Calculator();

  function showCalculation() {
    display.innerHTML = calc.getCalculationText();
  }

  function showResult() {
    display.innerHTML = calc.getResultText();
  }

  function writeDigit(digit) {
    calc.writeDigit(digit);
    showCalculation();
  };

  function clearDisplay() {
    calc.clear();
    showCalculation();
  };

  function startAdd() {
    calc.startOperation(operations.Addition);
    showCalculation();
  }

  function startSubtract() {
    calc.startOperation(operations.Subtraction);
    showCalculation();
  }

  function calculate() {
    showResult();
    calc.clear();
  };

  function getEventHandlerFromDigit(digit) {
    return function() {
      writeDigit(+digit);
    };
  };

  function getEventHandlerFromContent(content) {
    if (isNaN(content)) {
      switch (content) {
        case "C":
          return clearDisplay;
      
        case "+":
          return startAdd;

        case "-":
          return startSubtract;

        case "=":
          return calculate;
      }
    }
    else
      return getEventHandlerFromDigit(content);
  };

  var items = document.getElementsByClassName("digit-item");

  for (let i = 0; i < items.length; i++) {
    items[i].addEventListener('click', getEventHandlerFromContent(items[i].innerHTML));
  }
});