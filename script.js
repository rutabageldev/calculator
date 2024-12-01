const isDebugMode = true;

const numberContainer = document.querySelector(".number-container");
const topRowContainer = document.querySelector(".top-container");
const bottomRowContainer = document.querySelector(".bottom-container");
const calculatorContainer = document.querySelector('.calculator-container');
const operatorContainer = document.querySelector('.operator-container');

const calculator = {
    currentSign: 'POSITIVE',
    state: 'IDLE', //can be IDLE, ADD, SUBTRACT, MULTIPLY, or DIVIDE
    savedValue: null,
    value: '0', //value displayed on calculator display
}


buildCalculator();
logCalculatorState();
const calculatorDisplay = document.querySelector('.calculator-display');

function attachButtonListeners() {
    console.log(`Attaching listeners to buttons...`);
    const numberButtons = document.querySelectorAll('button');
    numberButtons.forEach(button => {
        button.addEventListener("click", (e) => handleInput(e));
    });
    console.log(`Listeners attached successfully.`);
}

function buildCalculator() {
    console.log('Building the calculator...');
    buildDisplay();
    buildNumberButtons();
    buildOperatorButtons();
    attachButtonListeners();
    console.log('Calculator built successfully.');
}

function buildNumberButtons() {
    console.log(`Building number buttons...`);
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
    console.log(`Number buttons built successfully.`);
}

function buildDisplay() {
    console.log(`Building calculator display...`);
    const calcDisplay = document.createElement('div');
    calcDisplay.classList.add('calculator-display');
    calcDisplay.textContent = '0';

    calculatorContainer.prepend(calcDisplay);
    console.log(`Calculator display built successfully.`);
}

function buildOperatorButtons(){
    console.log(`Building operator buttons...`);
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
    console.log(`Operator buttons built successfully...`);
}

function handleInput(e) {
    let buttonValue = getButtonValue(e);
    let buttonType = getButtonType(e);

    console.log(`Button clicked: ${buttonValue} (Type: ${buttonType})`);

    switch (buttonType) {
        case ('NUMBER'):
            console.log(`Calculator value before update: ${calculator.value}`);
            if (calculator.value == '0' || isNaN(parseInt(calculator.value))) {
                calculator.value = buttonValue;
            } else {
                calculator.value = calculator.value + buttonValue
            }
            console.log(`Updated calculator value: ${calculator.value}`);
            break;
        case ('ADD'):
        case ('CHANGE-SIGN'):
        case ('DECIMAL'):
        case ('DIVIDE'):
        case ('MULTIPLY'):
        case ('SUBTRACT'):    
            console.log(`Operator selected: ${buttonType}`);
            break;
        case ('CLEAR'):
            console.log(`Clearing calculator value`);
            calculator.value = 0;
            break;
        default: 
            console.log(`Unhandled button type: ${buttonType}`);
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

function logCalculatorState(){
    if (isDebugMode) {
    console.log(`Calculator State:
    Value: ${calculator.value}
    Saved Value: ${calculator.savedValue};
    Current Sign" ${calculator.currentSign}
    State: ${calculator.state}`);
    }
}