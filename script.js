const numberContainer =document.querySelector(".number-container");
const topRowContainer =document.querySelector(".top-container");
const bottomRowContainer =document.querySelector(".bottom-container");
const calculatorContainer = document.querySelector('.calculator-container');



buildCalculator();



function buildCalculator() {
    buildDisplay();
    buildNumberButtons();
}

function buildNumberButtons() {
    for (let i = 9; i > 0; i--) {    
        const numberButton = document.createElement("button");
        numberButton.classList.add("number-button");
        numberButton.textContent = i;
        numberContainer.appendChild(numberButton);
    }

    let headerButtons
}

function buildDisplay() {
    const calcDisplay = document.createElement('div');
    calcDisplay.classList.add('calculator-display');
    calcDisplay.textContent = '0';

    calculatorContainer.prepend(calcDisplay);
}