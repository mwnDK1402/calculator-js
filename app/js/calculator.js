function Calculator() {
  this.value = 0;
}

Calculator.prototype.writeDigit = function(digit) {
  this.value = +this.value.toString().concat(digit);
};

Calculator.prototype.clear = function() {
  this.value = 0;
}

Calculator.prototype.startAdd = function() {
};

Calculator.prototype.startSubtract = function() {
};

Calculator.prototype.getCalculationText = function() {
};

function truncate(str, n) {
  return (str.length > n) ? str.substr(0, n) : str;
};

Calculator.prototype.getResultText = function() {
  return truncate(this.value.toString(), 9);
};

module.exports = Calculator;