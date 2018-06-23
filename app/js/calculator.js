function Calculator() {
  this.value = 0;
}

Calculator.prototype.writeDigit = function(digit) {
  if (isNaN(digit))
    throw new TypeError("digit must be a number")

  if (digit < 0 || digit > 9)
    throw new RangeError("digit must be in range [0-9]");

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