const isDebugMode = true;

//Select containers that will be used to build the calculator
const calculatorContainer = document.querySelector('.calculator-container');
const bottomContainer = document.querySelector('.bottom-container');
const numberContainer = document.querySelector(".number-container");
const operatorContainer = document.querySelector('.operator-container');

document.addEventListener('keydown', (e) => handleInput(e));

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
    error: 'ERROR',
    idle: 'IDLE',
    multiply: 'MULTIPLY',
    subtract: 'SUBTRACT',
};

//Define calculator object to centralize state management
const calculator = {
    state: calculatorStates.idle, //can be anything in the calculatorStates object
    savedValue: null, //secondary value used to complete calculations
    value: '0', //value displayed on calculator display
    overwritable: true, //used to track if the displayed value should be overwritten when a new number is pressed
}

//Initialize calculator
buildCalculator();
logCalculatorState();
const calculatorDisplay = document.querySelector('.calculator-display');


function addDecimal() {
    if (calculator.value.includes('.')) {
        if(isDebugMode) console.log('Failed to add decimal, already had one.');
    } else {
        calculator.value += '.';
        if(isDebugMode) console.log('Successfully added decimal.');
        calculator.overwritable = false;
    }
}

function addInputs() {
    if(isDebugMode) console.log('Adding numbers...');
    let output = parseFloat(calculator.savedValue) + parseFloat(calculator.value);
    calculator.value = output;
    calculator.savedValue = null;
    calculator.state = calculatorStates.idle;
    calculator.overwritable = true;
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

function changeSign() {
    calculator.value = 0 - calculator.value;
}

function createButton (symbol, type, buttonClass) {
    const button = document.createElement('button');
    button.classList.add(buttonClass);
    button.setAttribute('type', type);
    button.textContent = symbol;
    return button;
}

function divideInputs() {
    if(isDebugMode) console.log('Dividing numbers...');
    if (calculator.value == '0') {
        calculator.state = calculatorStates.error;
        calculator.value = 'E R R O R';
        if(isDebugMode) console.log('Division failed, attemped to divide by 0.'); 
    } else {
        let output = parseFloat(calculator.savedValue) / parseFloat(calculator.value);
        calculator.value = output;
        calculator.savedValue = null;
        calculator.state = calculatorStates.idle;
        calculator.overwritable = true;
        if(isDebugMode) console.log('Numbers divided successfully.'); 
    }
    if(isDebugMode) logCalculatorState();
}

function handleInput(e) {
    let buttonValue, buttonType;
    
    if(e.type === 'keydown') {
      let  attributes = simulateButtonAttributes(e);
      buttonValue = attributes[0];
      buttonType = attributes[1];
      console.log("buttonValue: " + buttonValue);
      console.log("buttonType: " + buttonType);
    }
    else {    
        buttonValue = getButtonValue(e);
        buttonType = getButtonType(e);
    }

    if(isDebugMode) console.log(`Button clicked: ${buttonValue} (Type: ${buttonType})`);

    if(calculator.state == calculatorStates.error && buttonType != buttonTypes.clear) {
        if(isDebugMode) console.log('Calculator in error state, must be cleared.');
        return;
    }

    switch (buttonType) {
        case buttonTypes.number:
            if(isDebugMode) console.log(`Calculator value before update: ${calculator.value}`);
            if (calculator.overwritable) {
                calculator.value = buttonValue;
                calculator.overwritable = false;
            } else calculator.value += buttonValue;
            if(isDebugMode) console.log(`Updated calculator value: ${calculator.value}`);
            break;

        case buttonTypes.add:
            processOperator(calculatorStates.add);
            break;

        case buttonTypes.changeSign:
            changeSign();
            break;

        case buttonTypes.clear:
            if(isDebugMode) console.log(`Clearing calculator value`);
            calculator.state = calculatorStates.idle;
            calculator.value = 0;
            calculator.overwritable = true;
            break;

        case buttonTypes.decimal: 
            addDecimal();
            break;

        case buttonTypes.divide:
            processOperator(calculatorStates.divide);
            if(isDebugMode) logCalculatorState();
            break;

        case buttonTypes.evaluate:
            if(isDebugMode) logCalculatorState();
            if (calculator.state === calculatorStates.idle || calculator.savedValue === null || calculator.overwritable) {
                if(isDebugMode) console.log(`Calculator state; ${calculator.state}, no action taken.`);
                break;
            }
            
            switch (calculator.state) {                   

                case (calculatorStates.add):
                    addInputs();
                    break;

                case (calculatorStates.divide):
                    divideInputs();
                    break;

                case (calculatorStates.multiply):
                    multiplyInputs();
                    break;

                    case (calculatorStates.subtract):
                    subtractInputs();
                    break;

                default:
                    if(isDebugMode) console.log(`Unhandled button type: ${buttonType}`);
                    break;
            }

            calculator.state = calculatorStates.idle;
            calculator.savedValue = null;
            if(isDebugMode) logCalculatorState();
            break;

        case buttonTypes.multiply: 
            processOperator(calculatorStates.multiply); 
            break;
        
        case buttonTypes.subtract: 
            processOperator(calculatorStates.subtract);
            break;

         
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
    Overwritable: ${calculator.overwritable}
    Value: ${calculator.value}
    Saved Value: ${calculator.savedValue}
    State: ${calculator.state}`);
    }
}

function multiplyInputs() {
    if(isDebugMode) console.log('Multiplying numbers...');
    let output = parseFloat(calculator.savedValue) * parseFloat(calculator.value);
    calculator.value = output;
    calculator.savedValue = null;
    calculator.state = calculatorStates.idle;
    calculator.overwritable = true;
    if(isDebugMode) console.log('Numbers multiplied successfully.');
}

function processOperator(operation) {
    // Prevent invalid operator sequences 
    if (calculator.overwritable) {
        if(isDebugMode) console.log('Invalid operator sequence ignored');
        calculator.state = operation;
        calculator.savedValue = calculator.value;
        return;
    }

    // If there's a previous operation, calculate first
    if(calculator.state != calculatorStates.idle && calculator.savedValue != null) {
        switch (calculator.state) {

            case (calculatorStates.add):
                addInputs();
                break;

            case (calculatorStates.divide):
                divideInputs();
                break;

            case (calculatorStates.multiply):
                multiplyInputs();
                break;

                case (calculatorStates.subtract):
                subtractInputs();
                break;
        }
        
    }

    calculator.savedValue = calculator.value;

    // Set new operator state
    calculator.state = operation;
    calculator.overwritable = true;

    if(isDebugMode) logCalculatorState();
    return;

}

function simulateButtonAttributes(e){
    let buttonValue, buttonType;
    const key = e.key;

    if (isDebugMode) console.log(`Key pressed: ${key}`);

    if (!isNaN(key)) {
        buttonValue = key;
        buttonType = buttonTypes.number;
    } else {
        switch (key) {
            case '+':
                buttonValue = '+';
                buttonType = buttonTypes.add;
                break;

            case '-':
                buttonValue = '-';
                buttonType = buttonTypes.subtract;
                break;
                
            case '*':
                buttonValue = '*';
                buttonType = buttonTypes.multiply;
                break;
                
            case '/':
                buttonValue = '/';
                buttonType = buttonTypes.divide;
                break;
                
            case '=':
            case 'Enter':
                buttonValue = '=';
                buttonType = buttonTypes.evaluate;
                break;
                
            case '.':
                buttonValue = '.';
                buttonType = buttonTypes.decimal;
                break;
                
            case 'Escape':
                buttonValue = 'Clear';
                buttonType = buttonTypes.clear;
                break;
        }
    }

    return [buttonValue, buttonType];
}

function subtractInputs(){
    if(isDebugMode) console.log('Subtracting numbers...');
    let output = parseFloat(calculator.savedValue) - parseFloat(calculator.value);
    calculator.value = output;
    calculator.savedValue = null;
    calculator.state = calculatorStates.idle;
    calculator.overwritable = true;
    if(isDebugMode) console.log('Numbers subtracted successfully.');
}

function updateDisplay() {
    let maxDisplayLength = 10;

    if(calculator.value.toString().length > maxDisplayLength) {
        if (!isNaN(calculator.value)) {
            calculator.value = parseFloat(parseFloat(calculator.value).toPrecision(maxDisplayLength));
        } else {
            calculator.state = calculatorStates.error;
            calculator.value = 'E R R O R';
        }
    }

    calculatorDisplay.textContent = calculator.value;
}