const numberContainer = document.querySelector(".number-container");
const topRowContainer = document.querySelector(".top-container");
const bottomRowContainer = document.querySelector(".bottom-container");
const calculatorContainer = document.querySelector('.calculator-container');
const operatorContainer = document.querySelector('.operator-container');

const calculator = {
    currentSign: 'POSITIVE',
    state: 'IDLE', //can be IDLE, ADD, SUBTRACT, MULTIPLY, or DIVIDE
    value: '0', //value displayed on calculator display
}


buildCalculator();
const calculatorDisplay = document.querySelector('.calculator-display');


function attachButtonListeners() {
    const numberButtons = document.querySelectorAll('button');
    numberButtons.forEach(button => {
        button.addEventListener("click", (e) => handleInput(e));
    });
}

function buildCalculator() {
    buildDisplay();
    buildNumberButtons();
    buildOperatorButtons();
    attachButtonListeners();
}

function buildNumberButtons() {
    const numberButtons = [
        {symbol: 9, type : 'NUMBER'},
        {symbol: 8, type : 'NUMBER'},
        {symbol: 7, type : 'NUMBER'},
        {symbol: 6, type : 'NUMBER'},
        {symbol: 5, type : 'NUMBER'},
        {symbol: 4, type : 'NUMBER'},
        {symbol: 3, type : 'NUMBER'},
        {symbol: 2, type : 'NUMBER'},
        {symbol: 1, type : 'NUMBER'},
        {symbol: '.', type : 'DECIMAL'},
        {symbol: 0, type : 'NUMBER'},
        {symbol: '+/-', type : 'CHANGE-SIGN'},
    ];

    numberButtons.forEach(number => {
        const numberButton = document.createElement('button');
        numberButton.classList.add('number-button');
        numberButton.setAttribute('type', number.type);
        numberButton.textContent = number.symbol;
        numberContainer.appendChild(numberButton);
    });
}

function buildDisplay() {
    const calcDisplay = document.createElement('div');
    calcDisplay.classList.add('calculator-display');
    calcDisplay.textContent = ' ';

    calculatorContainer.prepend(calcDisplay);
}

function buildOperatorButtons(){
    const operators = [
        {symbol: '+', type: 'ADD'},
        {symbol: '-', type: 'SUBTRACT'},
        {symbol: 'x', type: 'MULTIPLY'},
        {symbol: '÷', type: 'DIVIDE'},
    ]
    operators.forEach(operator => {
        const operatorButton = document.createElement('button');
        operatorButton.classList.add('operator-button');
        operatorButton.setAttribute('type', operator.type);
        operatorButton.textContent = operator.symbol;
        operatorContainer.appendChild(operatorButton);
    })
}

function handleInput(e) {
    let buttonValue = getButtonValue(e);
    let buttonType = getButtonType(e);

    switch (buttonType) {
        case ('NUMBER'):
            if (calculator.value == '0' || isNaN(parseInt(calculator.value))) {
                calculator.value = buttonValue;
            } else {
                calculator.value = calculator.value + buttonValue
            }
            break;
        case ('ADD'):
        case ('CHANGE-SIGN'):
        case ('DECIMAL'):
        case ('DIVIDE'):
        case ('MULTIPLY'):
        case ('SUBTRACT'):    
            console.log('operator!');
            break;
        case ('CLEAR'):
            console.log('clear!');
            calculator.value = 0;
        break;
    }
    calculatorDisplay.textContent = calculator.value;
}

function getButtonType(e) {
    return e.target.getAttribute('type');
}

function getButtonValue(e) {
    console.log("User Selection: " + e.target.textContent);
    return e.target.textContent;
}