var expect = require('chai').expect;
var Calculator = require('../calculator');
var operations = require('../operationtreenode').operations;

describe('Calculator', function() {
  
  describe('defaults', function() {
    it('should show "0" by default', function() {

      var calc = new Calculator();
      const expected = "0";
  
      const result = calc.getCalculationText();
  
      expect(result).to.be.equal(expected);
  
    });
  });

  // They can share, because they should work regardless of the state of the calculator.
  var calc = new Calculator();

  it('should show "0" after being cleared', function() {
    
    const expected = "0";

    calc.clear();
    const result = calc.getCalculationText();

    expect(result).to.be.equal(expected);

  });

  describe('writeDigit(digit)', function() {
    it('should throw when digit is not a digit', function() {

      expect(function() { 
        calc.writeDigit(-1);
      }).throws("must be in range");

      expect(function() { 
        calc.writeDigit(10);
      }).throws("must be in range");

      expect(function() { 
        calc.writeDigit();
      }).throws("must be a number");

    });

    it('should show "1" after being cleared and having 1 written', function() {

      const expected = "1";

      calc.clear();
      calc.writeDigit(1);
      const result = calc.getCalculationText();
  
      expect(result).to.be.equal(expected);

    });

    it('should show "1" after being cleared, having 1 written, and ending operation', function() {

      const expected = "1";

      calc.clear();
      calc.writeDigit(1);
      const result = calc.getResultText();
  
      expect(result).to.be.equal(expected);

    });
  });

  describe('operations', function() {
    describe('addition', function() {
      it('should calculate "1" to be 1', function() {

        const expectedCalculation = "1";
        const expectedResult = "1";

        calc.clear();
        calc.writeDigit(1);
        
        const calculation = calc.getCalculationText();
        const result = calc.getResultText();

        expect(calculation).to.be.equal(expectedCalculation);
        expect(result).to.be.equal(expectedResult);

      });
      it('should calculate "2 + 2" to be 4', function() {
  
        const expectedCalculation = "2 + 2";
        const expectedResult = "4";
  
        calc.clear();
        calc.writeDigit(2);
        calc.startOperation(operations.Addition);
        calc.writeDigit(2);

        const calculation = calc.getCalculationText();
        const result = calc.getResultText();
    
        expect(calculation).to.be.equal(expectedCalculation);
        expect(result).to.be.equal(expectedResult);
    
      });
  
      it('should calculate "2 + 2 + 2" to be 6', function() {
        
        const expectedCalculation = "2 + 2 + 2";
        const expectedResult = "6";
        
        calc.clear();
        calc.writeDigit(2);
        calc.startOperation(operations.Addition);
        calc.writeDigit(2);
        calc.startOperation(operations.Addition);
        calc.writeDigit(2);

        const calculation = calc.getCalculationText();  
        const result = calc.getResultText();
    
        expect(calculation).to.be.equal(expectedCalculation);
        expect(result).to.be.equal(expectedResult);
      });
  
      it('should calculate "29 + 01" (shown as "29 + 1") to be 30', function() {
        
        const expectedCalculation = "29 + 1";
        const expectedResult = "30";
        
        calc.clear();
        calc.writeDigit(2);
        calc.writeDigit(9);
        calc.startOperation(operations.Addition);
        calc.writeDigit(0);
        calc.writeDigit(1);

        const calculation = calc.getCalculationText();
        const result = calc.getResultText();
    
        expect(calculation).to.be.equal(expectedCalculation);
        expect(result).to.be.equal(expectedResult);
      });
    });

    describe('subtraction', function() {
      it('should calculate "2 - 2" to be 0', function() {
  
        const expectedCalculation = "2 - 2";
        const expectedResult = "0";
  
        calc.clear();
        calc.writeDigit(2);
        calc.startOperation(operations.Subtraction);
        calc.writeDigit(2);

        const calculation = calc.getCalculationText();
        const result = calc.getResultText();
    
        expect(calculation).to.be.equal(expectedCalculation);
        expect(result).to.be.equal(expectedResult);
    
      });

      it('should calculate "-2 - 2" to be -4', function() {
  
        const expectedCalculation = "-2 - 2";
        const expectedResult = "-4";
  
        calc.clear();
        calc.startOperation(operations.Subtraction);
        calc.writeDigit(2);
        calc.startOperation(operations.Subtraction);
        calc.writeDigit(2);

        const calculation = calc.getCalculationText();
        const result = calc.getResultText();
    
        expect(calculation).to.be.equal(expectedCalculation);
        expect(result).to.be.equal(expectedResult);
    
      });
  
      it('should calculate "2 - 2 - 2" to be -2', function() {
        
        const expectedCalculation = "2 - 2 - 2";
        const expectedResult = "-2";
        
        calc.clear();
        calc.writeDigit(2);
        calc.startOperation(operations.Subtraction);
        calc.writeDigit(2);
        calc.startOperation(operations.Subtraction);
        calc.writeDigit(2);

        const calculation = calc.getCalculationText();
        const result = calc.getResultText();
  
        expect(calculation).to.be.equal(expectedCalculation);
        expect(result).to.be.equal(expectedResult);
      });
  
      it('should calculate "29 - 031" (shown as "29 - 31") to be -2', function() {
        
        const expectedCalculation = "29 - 31";
        const expectedResult = "-2";
        
        calc.clear();
        calc.writeDigit(2);
        calc.writeDigit(9);
        calc.startOperation(operations.Subtraction);
        calc.writeDigit(0);
        calc.writeDigit(3);
        calc.writeDigit(1);

        const calculation = calc.getCalculationText();
        const result = calc.getResultText();
    
        expect(calculation).to.be.equal(expectedCalculation);
        expect(result).to.be.equal(expectedResult);
      });

      it('should show "1 - 2" when pressing "1, +, -, 2"', function() {
        const expectedCalculation = "1 - 2";
        
        calc.clear();
        calc.writeDigit(1);
        calc.startOperation(operations.Addition);
        calc.startOperation(operations.Subtraction);
        calc.writeDigit(2);
        
        const calculation = calc.getCalculationText();

        expect(calculation).to.be.equal(expectedCalculation);
      });

      it('should calculate "-" to be 0', function() {
  
        const expectedCalculation = "-";
        const expectedResult = "0";
  
        calc.clear();
        calc.startOperation(operations.Subtraction);
        
        const calculation = calc.getCalculationText();
        const result = calc.getResultText();
    
        expect(calculation).to.be.equal(expectedCalculation);
        expect(result).to.be.equal(expectedResult);
    
      });
    });

    describe('compound', function() {
      it('should calculate "1 - 2 + 8" to be 7', function() {
        const expectedCalculation = "1 - 2 + 8";
        const expectedResult = "7";
        
        calc.clear();
        calc.writeDigit(1);
        calc.startOperation(operations.Subtraction);
        calc.writeDigit(2);
        calc.startOperation(operations.Addition);
        calc.writeDigit(8);
        
        const calculation = calc.getCalculationText();
        const result = calc.getResultText();

        expect(calculation).to.be.equal(expectedCalculation);
        expect(result).to.be.equal(expectedResult);
      });
    });
  });
});