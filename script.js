const isDebugMode = true;

//Select containers that will be used to build the calculator
const calculatorContainer = document.querySelector('.calculator-container');
const bottomContainer = document.querySelector('.bottom-container');
const numberContainer = document.querySelector(".number-container");
const operatorContainer = document.querySelector('.operator-container');

//Define array to manage button types
const buttonTypes = {
    add: 'ADD',
   changeSign: 'CHANGE-SIGN',
    clear: 'CLEAR',
    decimal: 'DECIMAL',
    divide: 'DIVIDE',
    evaluate: 'EVALUATE',
    multiply: 'MULTIPLY',
    number: 'NUMBER',
    subtract: 'SUBTRACT',


}

//Define object for defining calculator states
const calculatorStates = {
    add: 'ADD',
    divide: 'DIVIDE',
    idle: 'IDLE',
    multiply: 'MULTIPLY',
    subtract: 'SUBTRACT',
};

//Define calculator object to centralize state management
const calculator = {
    currentSign: 'POSITIVE',
    state: 'IDLE', //can be IDLE, ADD, SUBTRACT, MULTIPLY, or DIVIDE
    savedValue: null,
    value: '0', //value displayed on calculator display
}

//Initialize calculator
buildCalculator();
logCalculatorState();
const calculatorDisplay = document.querySelector('.calculator-display');


function addInputs() {
    if(isDebugMode) console.log('Adding numbers...');
    let output = parseFloat(calculator.savedValue) + parseFloat(calculator.value);
    calculator.value = output;
    calculator.savedValue = null;
    calculator.state = calculatorStates.idle;
    if(isDebugMode) console.log('Numbers added successfully.');
}

function attachButtonListeners() {
    if(isDebugMode) console.log(`Attaching listeners to buttons...`);
    const numberButtons = document.querySelectorAll('button');
    numberButtons.forEach(button => {
        button.addEventListener("click", (e) => handleInput(e));
    });
    if(isDebugMode) console.log(`Listeners attached successfully.`);
}

function buildBottomButtons() {
    if(isDebugMode) console.log(`Building bottom row of buttons...`);
    const bottomButtons = [
        {symbol: '=', type: "EVALUATE"},
        {symbol: 'Clear', type: "CLEAR"},
    ];

    bottomButtons.forEach(button => {
        const bottomButton = document.createElement('button');
        bottomButton.classList.add('bottom-button');
        bottomButton.setAttribute('type', button.type);
        bottomButton.textContent = button.symbol;
        bottomContainer.appendChild(bottomButton);
    });
    if(isDebugMode) console.log(`Bottom row of buttons built successfully.`);
}

function buildCalculator() {
    if(isDebugMode) console.log('Building the calculator...');
    buildDisplay();
    buildNumberButtons();
    buildOperatorButtons();
    buildBottomButtons();
    attachButtonListeners();
    if(isDebugMode) console.log('Calculator built successfully.');
}

function buildNumberButtons() {
    if(isDebugMode) console.log(`Building number buttons...`);
    const numberButtons = [
        {symbol: 9, type: buttonTypes.number,},
        {symbol: 8, type: buttonTypes.number},
        {symbol: 7, type: buttonTypes.number},
        {symbol: 6, type: buttonTypes.number},
        {symbol: 5, type: buttonTypes.number},
        {symbol: 4, type: buttonTypes.number},
        {symbol: 3, type: buttonTypes.number},
        {symbol: 2, type: buttonTypes.number},
        {symbol: 1, type: buttonTypes.number},
        {symbol: '.', type: buttonTypes.decimal},
        {symbol: 0, type: buttonTypes.number},
        {symbol: '+/-', type: buttonTypes.changeSign},
    ];

    numberButtons.forEach(number => {
        const numberButton = createButton(number.symbol, number.type, 'number-button');
        numberContainer.appendChild(numberButton);
    });
    if(isDebugMode) console.log(`Number buttons built successfully.`);
}

function buildDisplay() {
    if(isDebugMode)  console.log(`Building calculator display...`);
    const calcDisplay = document.createElement('div');
    calcDisplay.classList.add('calculator-display');
    calcDisplay.textContent = '0';

    calculatorContainer.prepend(calcDisplay);
    if(isDebugMode) console.log(`Calculator display built successfully.`);
}

function buildOperatorButtons(){
    if(isDebugMode) console.log(`Building operator buttons...`);
    const operators = [
        {symbol: '+', type: 'ADD'},
        {symbol: '-', type: 'SUBTRACT'},
        {symbol: 'x', type: 'MULTIPLY'},
        {symbol: '÷', type: 'DIVIDE'},
    ]
    operators.forEach(operator => {
        const operatorButton = createButton(operator.symbol, operator.type, 'operator-button');
        operatorContainer.appendChild(operatorButton);
    })
    if(isDebugMode) console.log(`Operator buttons built successfully...`);
}

function createButton (symbol, type, buttonClass) {
    const button = document.createElement('button');
    button.classList.add(buttonClass);
    button.setAttribute('type', type);
    button.textContent = symbol;
    return button;
}

function handleInput(e) {
    let buttonValue = getButtonValue(e);
    let buttonType = getButtonType(e);

    if(isDebugMode) console.log(`Button clicked: ${buttonValue} (Type: ${buttonType})`);

    switch (buttonType) {
        case buttonTypes.number:
            if(isDebugMode) console.log(`Calculator value before update: ${calculator.value}`);
            if (calculator.value == '0') calculator.value = buttonValue; 
            else calculator.value += buttonValue;
            if(isDebugMode) console.log(`Updated calculator value: ${calculator.value}`);
            break;

        case buttonTypes.add:
            calculator.state = calculatorStates.add;
            calculator.savedValue = calculator.value;
            calculator.value = 0;
            if(isDebugMode) logCalculatorState();
            break;

        case buttonTypes.clear:
            if(isDebugMode) console.log(`Clearing calculator value`);
            calculator.state = calculatorStates.idle;
            calculator.value = 0;
            break;

        case buttonTypes.evaluate:
            switch (calculator.state) {
                case (calculatorStates.idle):
                    if(isDebugMode) console.log(`Calculator state; ${calculator.state}, no action taken.`);
                    break;

                case (calculatorStates.add):
                    addInputs();
                    break;

                case (calculatorStates.multiply):
                    multiplyInputs();
                    break;

                    case (calculatorStates.subtract):
                    subtractInputs();
                    break;

                case (calculatorStates.divide):
                default:
                    if(isDebugMode) console.log(`Unhandled button type: ${buttonType}`);
                    break;
            }
            break;

        case buttonTypes.multiply: 
            calculator.state = calculatorStates.multiply;
            calculator.savedValue = calculator.value;
            calculator.value = 0;
            if(isDebugMode) logCalculatorState();
            break;
        
        case buttonTypes.subtract: 
            calculator.state = calculatorStates.subtract;
            calculator.savedValue = calculator.value;
            calculator.value = 0;
            if(isDebugMode) logCalculatorState();
            break;

        case buttonTypes.changeSign:
        case buttonTypes.decimal:
        case buttonTypes.divide:  
        if(isDebugMode) console.log(`Operator selected: ${buttonType}`);
            break;
        
        default: 
            if(isDebugMode) console.log(`Unhandled button type: ${buttonType}`);
            break;

    }
    updateDisplay();
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
    Current Sign: ${calculator.currentSign}
    State: ${calculator.state}`);
    }
}

function multiplyInputs() {
    if(isDebugMode) console.log('Multiplying numbers...');
    let output = parseFloat(calculator.savedValue) * parseFloat(calculator.value);
    calculator.value = output;
    calculator.savedValue = null;
    calculator.state = calculatorStates.idle;
    updateDisplay();
    if(isDebugMode) console.log('Numbers multiplied successfully.');
}

function subtractInputs(){
    if(isDebugMode) console.log('Subtracting numbers...');
    let output = parseFloat(calculator.savedValue) - parseFloat(calculator.value);
    calculator.value = output;
    calculator.savedValue = null;
    calculator.state = calculatorStates.idle;
    updateDisplay();
    if(isDebugMode) console.log('Numbers subtracted successfully.');
}

function updateDisplay() {
    calculatorDisplay.textContent = calculator.value;
}