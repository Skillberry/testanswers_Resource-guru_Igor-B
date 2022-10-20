const assert = require('assert');

const operators = {
    '+': function(left, right) {
        return left + right;
    },
    '-': function(left, right) {
        return left - right;
    },
    x: function(left, right) {
        return left * right;
    },
    '÷': function(left, right) {
        return left / right;
    },
};

const makeString = (...args) => `(${args.join(' ')})`;
const isOperator = (str) => (operators[str] ? true : false);

const OperatorNode = (value, left, right) => {
    const type = 'operator';

    if (!isOperator(value)) {
        throw new Error('Unrecognized operator');
    }

    const result = () => operators[value](left.result(), right.result());

    const toString = () => makeString(left.toString(), value, right.toString());

    return {
        type,
        result,
        toString,
    };
};
const ConstantNode = (value) => {
    if (typeof value !== 'number') {
        throw new Error('Value for constant node can be only "number" type');
    }

    const type = 'constant';
    const result = () => value;
    const toString = () => value.toString();

    return {
        type,
        result,
        toString,
    };
};
const tree = OperatorNode(
    '÷',
    OperatorNode(
        '+',
        ConstantNode(7),
        OperatorNode(
            'x',
            OperatorNode('-', ConstantNode(3), ConstantNode(2)),
            ConstantNode(5),
        ),
    ),
    ConstantNode(6),
);

assert.strictEqual('((7 + ((3 - 2) x 5)) ÷ 6)', tree.toString());
assert.strictEqual(2, tree.result());
