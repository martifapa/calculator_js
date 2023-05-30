let currentNumber = '';
let lastNumber = '';
let currentOperation = '';


// elements
const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const comma = document.getElementById('.');
const enter = document.getElementById('evaluate');
const backspace = document.getElementById('backspace');
const clear = document.getElementById('clear');
const currentValueLabel = document.getElementById('current-value');


// calculation functions
const add = () => parseFloat(lastNumber) + parseFloat(currentNumber);
const substract = () => parseFloat(lastNumber) - parseFloat(currentNumber);
const multiply = () => parseFloat(lastNumber) * parseFloat(currentNumber);
const divide = () => parseFloat(lastNumber) / parseFloat(currentNumber);


const evaluate = () => {
    console.log(currentOperation)
    if (currentOperation === '+') {
        currentNumber = add();
    } else if (currentOperation === '-') {
        currentNumber = substract();
    } else if (currentOperation === '*') {
        currentNumber = multiply();
    } else if (currentOperation === '/') {
        currentNumber = divide();
    }
    updateCalculator();
    lastNumber = currentNumber;
    currentNumber = '';
}

const listenNumberKey = (num) => {
    currentNumber += num;
}
const listenOperationKey = (operator) => {
    if (currentNumber) {
        lastNumber = currentNumber;
        currentNumber = '';
    }
    currentOperation = operator;
}
const listenBackspace = () => {
    currentNumber = currentNumber.slice(0, -1);
    updateCalculator();
}
const listenComma = () => {
    currentNumber += '.';
    updateCalculator();
}
const clearAll = () => {
    currentNumber = '';
    currentOperation = '';
    lastNumber = '';
    updateCalculator();
}

const updateCalculator = () => {
    currentValueLabel.textContent = Math.round(currentNumber * 1000) / 1000;
}

// event listeners
numberButtons.forEach((button) => button.addEventListener('click', () => listenNumberKey(button.textContent)));
numberButtons.forEach((button) => button.addEventListener('click', updateCalculator));
operationButtons.forEach((button) => button.addEventListener('click', () => listenOperationKey(button.textContent)));
clear.addEventListener('click', clearAll);
enter.addEventListener('click', evaluate);
backspace.addEventListener('click', listenBackspace);
comma.addEventListener('click', listenComma);
