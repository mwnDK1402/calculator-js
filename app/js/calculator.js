const operations = Object.freeze({ "Addition": 0, "Subtraction": 1 });

function Calculator() {
  this.value = 0;
  this.calculation = this.value.toString();
  this.input = "";
  this.operation = operations.Addition;
}

Calculator.prototype.writeDigit = function(digit) {
  if (isNaN(digit))
    throw new TypeError("digit must be a number")

  if (digit < 0 || digit > 9)
    throw new RangeError("digit must be in range [0-9]");

  this.input = this.input.concat(digit);
  this.calculation = this.calculation === "0" ? this.input : this.calculation.concat(digit);
};

Calculator.prototype.clear = function() {
  this.value = 0;
  this.input = "";
  this.calculation = this.value.toString();
  this.operation = operations.Addition;
}

Calculator.prototype.endOperation = function() {
  if (this.operation === operations.Addition)
    this.value += +this.input;
  else
    this.value -= +this.input;

  this.input = "";
};

Calculator.prototype.startAdd = function() {
  if (this.input !== "")
    this.calculation = this.calculation.concat(" + ");
  this.endOperation();
  this.operation = operations.Addition;
};

Calculator.prototype.startSubtract = function() {
  if (this.input !== "")
    this.calculation = this.calculation.concat(" - ");
  this.endOperation();
  this.operation = operations.Subtraction;
};

Calculator.prototype.getCalculationText = function() {
  return this.calculation;
};


function truncate(str, n) {
  return (str.length > n) ? str.substr(0, n) : str;
};

Calculator.prototype.getResultText = function() {
  return truncate(this.value.toString(), 9);
};

module.exports = Calculator;