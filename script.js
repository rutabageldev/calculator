const numberContainer = document.querySelector(".number-container");
const topRowContainer = document.querySelector(".top-container");
const bottomRowContainer = document.querySelector(".bottom-container");
const calculatorContainer = document.querySelector('.calculator-container');
const operatorContainer = document.querySelector('.operator-container');

const calculator = {
    state: 'idle', //can be idle, add, subtract, multiply, or divide
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
    for (let i = 9; i > -3; i--) {    
        const numberButton = document.createElement("button");
        numberButton.classList.add("number-button");
        if (i > 0) {
            numberButton.textContent = i;
            numberButton.setAttribute('button-type', 'NUMBER');
        } else {
            switch (i) {
                case (0):
                    numberButton.textContent = ".";
                    numberButton.setAttribute('button-type', 'OPERATOR');
                    break;
                case (-1):
                    numberButton.textContent = 0;
                    numberButton.setAttribute('button-type', 'NUMBER');
                    break;
                case (-2):
                    numberButton.textContent="+/-";
                    numberButton.setAttribute('button-type', 'OPERATOR');
                    break;
            }
        }
        numberContainer.appendChild(numberButton);
    }
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
        operatorButton.setAttribute('button-type', 'OPERATOR');
        operatorButton.setAttribute('operator-type', operator.type);
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
        case ('OPERATOR'):
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
    return e.target.getAttribute('button-type');
}

function getButtonValue(e) {
    console.log("User Selection: " + e.target.textContent);
    return e.target.textContent;
}