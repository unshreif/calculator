let firstOperand = null;
let operator = null;
let waitingForSecondOperand = false;

function appendNumber(number) {
    const display = document.getElementById("calcarea");
    
    if (waitingForSecondOperand) {
        display.textContent = number;
        waitingForSecondOperand = false;
    } else {
        if (display.textContent === '0') {
            display.textContent = number;
        } else {
            display.textContent += number;
        }
    }
}

function appendDecimal() {
    const display = document.getElementById("calcarea");
    
    if (waitingForSecondOperand) {
        display.textContent = "0.";
        waitingForSecondOperand = false;
        return;
    }
    
    if (!display.textContent.includes('.')) {
        display.textContent += '.';
    }
}

function operation(op) {
    const display = document.getElementById("calcarea");
    const inputValue = parseFloat(display.textContent);
    
    if (firstOperand === null) {
        firstOperand = inputValue;
    } else if (operator) {
        const result = calculate(true);
        display.textContent = result;
        firstOperand = result;
    }
    
    waitingForSecondOperand = true;
    operator = op;
}

function calculate(silent = false) {
    if (operator === null || firstOperand === null) {
        return parseFloat(document.getElementById("calcarea").textContent);
    }
    
    const secondOperand = parseFloat(document.getElementById("calcarea").textContent);
    let result = 0;
    
    switch(operator) {
        case '+':
            result = firstOperand + secondOperand;
            break;
        case '-':
            result = firstOperand - secondOperand;
            break;
        case '*':
            result = firstOperand * secondOperand;
            break;
        case '/':
            result = firstOperand / secondOperand;
            break;
        case '%':
            result = firstOperand % secondOperand;
            break;
    }
    
    if (!silent) {
        operator = null;
        firstOperand = null;
        waitingForSecondOperand = false;
        document.getElementById("calcarea").textContent = result;
    }
    
    return result;
}

function clearDisplay() {
    document.getElementById("calcarea").textContent = "0";
    firstOperand = null;
    operator = null;
    waitingForSecondOperand = false;
}

function backspace() {
    const display = document.getElementById("calcarea");
    if (display.textContent.length > 1) {
        display.textContent = display.textContent.slice(0, -1);
    } else {
        display.textContent = "0";
    }
}

function addition() {
    document.getElementById("calcarea").innerHTML = "+";
}