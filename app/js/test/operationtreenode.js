var expect = require('chai').expect;
var {OperationTreeNode} = require('../operationtreenode');

describe('OperationTreeNode', function() {

  it('should respond to value()', function() {
    
    const tree = new OperationTreeNode();

    expect(tree).to.respondTo('value');

  });

  it('should respond to toString()', function() {

    const tree = new OperationTreeNode();

    expect(tree).to.respondTo('toString');

  });

  it('should evaluate [ 1, 2, 3 ] as "1 + 2 + 3"', function() {

    const tree = new OperationTreeNode();
    const expected = "1 + 2 + 3";

    tree.children = [ 1, 2, 3 ];

    expect(tree.toString()).to.equal(expected);

  });

  it('should evaluate [ 1, 2, 3 ] as 6', function() {

    const tree = new OperationTreeNode();
    const expected = 6;

    tree.children = [ 1, 2, 3 ];

    expect(tree.value()).to.be.equal(expected);

  });

  it('should evaluate [ -1, -2, -3 ] as "-1 - 2 - 3"', function() {

    const tree = new OperationTreeNode();
    const expected = "-1 - 2 - 3";

    tree.children = [ -1, -2, -3 ];

    expect(tree.toString()).to.equal(expected);

  });

  it('should evaluate [ -1, -2, -3 ] as -6', function() {

    const tree = new OperationTreeNode();
    const expected = -6;

    tree.children = [ -1, -2, -3 ];

    expect(tree.value()).to.be.equal(expected);

  });
});