var expect = require('chai').expect;
var Calculator = require('../calculator');

describe('Calculator', function() {
  
  it('should contain "0" by default', function() {

    var calc = new Calculator();

    const result = calc.getResultText();

    expect(result).to.be.equal("0");

  });

  var calc = new Calculator();

  it('should contain "0" after being cleared', function() {
    
    calc.clear();
    const result = calc.getResultText();

    expect(result).to.be.equal("0");

  });

  it('should contain "1" after being cleared and having 1 written', function() {

    calc.clear();
    calc.writeDigit(1)
    const result = calc.getResultText();

    expect(result).to.be.equal("1");

  });

  it('should not calculate 2 + 2 to be 4 yet', function() {

    calc.clear();
    calc.writeDigit(2);
    calc.startAdd();
    calc.writeDigit(2);
    const result = calc.getResultText();

    expect(result).to.not.be.equal("4");

  });
});