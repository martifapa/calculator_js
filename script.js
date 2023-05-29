// 
let currentNumber = '';
let pastNumber = '';
let currentOperation = '';
let lastKeyCompute = false;

// elements
const zero = document.getElementById('0');
const one = document.getElementById('1');
const two = document.getElementById('2');
const three = document.getElementById('3');
const four = document.getElementById('4');
const five = document.getElementById('5');
const six = document.getElementById('6');
const seven = document.getElementById('7');
const eight = document.getElementById('8');
const nine = document.getElementById('9');

const comma = document.getElementById('.');

const add = document.getElementById('add');
const subtract = document.getElementById('subtract');
const multiply = document.getElementById('multiply');
const divide = document.getElementById('divide');

const enter = document.getElementById('enter');
const backspace = document.getElementById('backspace');

const currentValueLabel = document.getElementById('current-value');

// calculation functions
const sumValues = () => parseFloat(pastNumber) + parseFloat(currentNumber);

const subtractValues = () => parseFloat(pastNumber) - parseFloat(currentNumber);

const multiplyValues = () => parseFloat(pastNumber) * parseFloat(currentNumber);

const divideValues = () => parseFloat(pastNumber) / parseFloat(currentNumber);

// input functions
const listenKey = e => {
    if (lastKeyCompute && e.target.id.length === 1) {
        currentNumber = e.target.id;
        pastNumber = '';
    } else {
        lastKeyCompute = false;
        e.target.id.length === 1 ? currentNumber += e.target.id : listenNewKey(e.target.id);
    }
    updateCurrentValueLabel();
}
const listenNewKey = passedOperation => {
    if (passedOperation === 'enter') {
        currentNumber = calculate();
        lastKeyCompute = true;
        console.log(currentNumber);
        return
    } else if (passedOperation === 'backspace') {
        if (!lastKeyCompute) {
            currentNumber = currentNumber.slice(0, -1);
        }
    } else {
        pastNumber = currentNumber;
        currentNumber = '';
        currentOperation = passedOperation;
    }
}

const calculate = () => {
    if (currentOperation === 'add') {
        return sumValues();
    } else if (currentOperation === 'subtract') {
        return subtractValues();
    } else if (currentOperation === 'multiply') {
        return multiplyValues();
    } else if (currentOperation === 'divide') {
        return divideValues();
    } else {
        return pastNumber;
    }
}

// UI functions
const updateCurrentValueLabel = () => {
    if (lastKeyCompute) {
        currentValueLabel.textContent = currentNumber;
    } else if (pastNumber && currentNumber) {
        currentValueLabel.textContent = pastNumber + currentOperation + currentNumber;
    } else if (pastNumber && !currentNumber) {
        currentValueLabel.textContent = pastNumber + currentOperation;
    } else {
        currentValueLabel.textContent = currentNumber;
    }
}

// event listeners
for (let i = 0; i < 10; i++) {
    const btn = document.getElementById(i.toString());
    btn.addEventListener('click', listenKey);
}

add.addEventListener('click', listenKey);
subtract.addEventListener('click', listenKey);
multiply.addEventListener('click', listenKey);
divide.addEventListener('click', listenKey);
enter.addEventListener('click', listenKey);
comma.addEventListener('click', listenKey);
backspace.addEventListener('click', listenKey);