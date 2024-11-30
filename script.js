const numberContainer =document.querySelector(".number-container");
const topRowContainer =document.querySelector(".top-container");
const bottomRowContainer =document.querySelector(".bottom-container");



populateButtons();




function populateButtons() {
    for (let i = 9; i > 0; i--) {    
        const numberButton = document.createElement("button");
        numberButton.classList.add("number-button");
        numberButton.textContent = i;
        numberContainer.appendChild(numberButton);
    }

    let headerButtons
}