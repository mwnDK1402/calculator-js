operations = Object.freeze({ "Addition": 0, "Subtraction": 1 });

function OperationTreeNode() {
  this.children = [0];
  this.operation = operations.Addition;
};

OperationTreeNode.prototype.value = function() {
  var sum = 0;
  
  this.children.forEach(child => {
    sum += isNaN(child) ? child.value() : child;
  });

  return sum;
};

OperationTreeNode.prototype.toString = function() {
  switch (this.children.length) {
    case 0:
    return "";
  
    case 1:
      return this.children[0] === 0 && this.operation === operations.Subtraction ? "-" : this.children[0].toString();

    default:
      var str = "";

      for (let i = 0; i < this.children.length - 1; i++) {
        const child = this.children[i];
        const nextChild = this.children[i + 1];

        // @TEMP: Use special negative sign for first child
        str += (i == 0 ? child : Math.abs(child)).toString();
        
        switch (this.operation) {
          case operations.Subtraction:
          case operations.Addition:
            str += Math.sign(nextChild) == -1 ? " - " : " + ";
            break;

          default:
            throw new Error("invalid operation");
        }
      }

      const lastChild = this.children[this.children.length - 1];
      str += Math.abs(lastChild);

      return str;
  }
};

module.exports = {
  "OperationTreeNode": OperationTreeNode,
  "operations": operations
};