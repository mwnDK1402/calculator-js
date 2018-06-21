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

  String.prototype.trunc = String.prototype.trunc ||
    function(n) {
      return (this.length > n) ? this.substr(0, n) : this;
    };

  function clipDisplay() {
    display.innerHTML = display.innerHTML.trunc(3);
  };

  function concatDigit(digit) {
    display.innerHTML = +display.innerHTML.concat(digit);
    clipDisplay();
  };

  function getEventHandlerFromDigit(digit) {
    return function() {
      concatDigit(digit);
    };
  };

  function getEventHandlerFromContent(content) {
    if (isNaN(content)) {
    }
    else {
      return getEventHandlerFromDigit(content);
    }
  };

  var items = document.getElementsByClassName("digit-item");

  for (let i = 0; i < items.length; i++) {
    items[i].addEventListener('click', getEventHandlerFromContent(items[i].innerHTML));
  }
});