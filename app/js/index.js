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

  var calc = new Calculator();

  function writeDigit(digit) {
    calc.writeDigit(digit);
    display.innerHTML = calc.getResultText();
  };

  function clearDisplay() {
    calc.clear();
    display.innerHTML = calc.getResultText();
  };

  function getEventHandlerFromDigit(digit) {
    return function() {
      writeDigit(digit);
    };
  };

  function getEventHandlerFromContent(content) {
    if (isNaN(content)) {
      switch (content) {
        case "C":
          return clearDisplay;
      
        case "+":
          return calc.startAdd;

        case "-":
          return calc.startSubtract;
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