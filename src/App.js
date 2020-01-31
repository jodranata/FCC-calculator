import React, { useEffect, useState } from 'react';
import './App.css';

const KeypadButton = ({ handleInputNum }) =>
  [
    {
      id: 'nine',
      sign: '9',
    },
    {
      id: 'eight',
      sign: '8',
    },
    {
      id: 'seven',
      sign: '7',
    },
    {
      id: 'six',
      sign: '6',
    },
    {
      id: 'five',
      sign: '5',
    },
    {
      id: 'four',
      sign: '4',
    },
    {
      id: 'three',
      sign: '3',
    },
    {
      id: 'two',
      sign: '2',
    },
    {
      id: 'one',
      sign: '1',
    },
    {
      id: 'zero',
      sign: '0',
    },
    {
      id: 'decimal',
      sign: '.',
    },
  ].map(num => {
    const { id, sign } = num;
    return (
      <>
        <button
          id={id}
          key={id}
          value={sign}
          type="button"
          onClick={handleInputNum}
          className="number"
        >
          {sign}
        </button>
      </>
    );
  });

const OperatorButton = ({ handleInputOp }) =>
  [
    {
      id: 'add',
      sign: '+',
    },
    {
      id: 'subtract',
      sign: '-',
    },
    {
      id: 'multiply',
      sign: 'x',
    },
    {
      id: 'divide',
      sign: '/',
    },
    {
      id: 'equals',
      sign: '=',
    },
  ].map(ops => {
    const { id, sign } = ops;
    return (
      <button
        id={id}
        key={id}
        value={sign}
        type="button"
        onClick={handleInputOp}
        className="operator"
      >
        {sign}
      </button>
    );
  });

function App() {
  const [prevNum, setPrevNum] = useState(null);
  const [currNum, setCurrNum] = useState('0');
  const [operator, setOperator] = useState('');
  const [isDecimal, setIsDecimal] = useState(false);
  const [opClicked, setOpClicked] = useState(false);
  const [hasEval, setHasEval] = useState(false);
  const [error, setError] = useState(false);

  const handleEval = () => {
    if (!prevNum) return;
    const first = Number(prevNum);
    const sec = Number(currNum);
    let totalNum;
    switch (operator) {
      case '+':
        totalNum = first + sec;
        break;
      case '-':
        totalNum = first - sec;
        break;
      case 'x':
        totalNum = first * sec;
        break;
      case '/':
        totalNum = first / sec;
        break;
      default:
        console.log('error');
    }
    setPrevNum(totalNum);
    setCurrNum('0');
    setIsDecimal(false);
    setHasEval(true);
  };

  const handleInputNum = e => {
    if (currNum.length > 10) {
      setError(true);
      setCurrNum('REACHED LIMITED NUMBER');
    }
    if (error) return;
    const { value } = e.target;
    if (value === '.') {
      if (isDecimal) return;
      setCurrNum(currNum + value);
      setIsDecimal(true);
    } else if (currNum === '0' || hasEval) {
      setCurrNum(value);
    } else {
      setCurrNum(currNum + value);
    }
    setHasEval(false);
    setOpClicked(false);
  };

  const handleInputOp = e => {
    const { value } = e.target;
    setIsDecimal(false);
    const isMathOp = ['+', '-', 'x', '/'].findIndex(op => op === value) !== -1;
    if (isMathOp) {
      if (opClicked) {
        return setOperator(value);
      }
      setOpClicked(true);
      if (prevNum === null) {
        setPrevNum(currNum);
        setCurrNum('0');
        return setOperator(value);
      }
      handleEval();
      return setOperator(value);
    }
    if (value === '=') {
      return handleEval();
    }
  };

  const handleReset = () => {
    setPrevNum(null);
    setCurrNum('0');
    setOperator('');
    setIsDecimal(false);
    setOpClicked(false);
    setHasEval(false);
    setError(false);
  };
  return (
    <div className="calculator-app">
      <div className="display" id="display">
        {hasEval ? prevNum : currNum}
      </div>
      <div className="keypad-buttons">
        <div className="operator-buttons">
          <button
            type="button"
            onClick={handleReset}
            id="clear"
            className="clear"
          >
            AC
          </button>
          <OperatorButton handleInputOp={handleInputOp} />
        </div>
        <div className="number-buttons">
          <KeypadButton handleInputNum={handleInputNum} />
        </div>
      </div>
    </div>
  );
}

export default App;

// if (value === '-' && !isNeg) {
//   setIsNeg(true);
//   return setCurrNum(value + currNum);
// }
// if (value === '-' && isNeg) {
//   const newNum = [...currNum].filter(elem => elem !== '-').join('');
//   setIsNeg(false);
//   return setCurrNum(newNum);
// }
