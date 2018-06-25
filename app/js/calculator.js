const {OperationTreeNode, operations} = require('./operationtreenode')

function truncate(str, n) {
  return (str.length > n) ? str.substr(0, n) : str;
};

function Calculator() {
  this.tree = new OperationTreeNode();
};

Calculator.prototype.writeDigit = function(digit) {
  if (isNaN(digit))
    throw new TypeError("digit must be a number")

  if (digit < 0 || digit > 9)
    throw new RangeError("digit must be in range [0-9]");

    // @TEMP: Only one level of children.
  const lastNode = this.tree.children[this.tree.children.length - 1];
  
  if (lastNode === 0)
    this.tree.children[this.tree.children.length - 1] = this.tree.operation === operations.Subtraction ? -digit : digit;
  else
    this.tree.children[this.tree.children.length - 1] = +lastNode.toString().concat(digit);
  };

Calculator.prototype.clear = function() {
  this.tree = new OperationTreeNode();
}

Calculator.prototype.startOperation = function(operation) {
  this.tree.operation = operation;

  // @TEMP: Only one level of children.
  const lastNode = this.tree.children[this.tree.children.length - 1];
  if (lastNode === 0)
    this.tree.children[this.tree.children.length - 1] = operation === operations.Addition ? Math.abs(lastNode) : -Math.abs(lastNode);
  else
    this.tree.children.push(0);
};

Calculator.prototype.getCalculationText = function() {
  return this.tree.toString();
};

Calculator.prototype.getResultText = function() {
  return this.tree.value().toString();
};

module.exports = Calculator;