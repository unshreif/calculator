let firstOperand = null;
let operator = null;
let waitingForSecondOperand = false;
let calculationHistory = [];
const MAX_HISTORY_ITEMS = 20;

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
    
    // Format result to avoid excessive decimal places
    result = parseFloat(result.toFixed(10));
    
    // Add to history unless it's a silent calculation
    if (!silent) {
        // Create operation symbols for display
        let operatorSymbol;
        switch(operator) {
            case '+': operatorSymbol = '+'; break;
            case '-': operatorSymbol = '−'; break;
            case '*': operatorSymbol = '×'; break;
            case '/': operatorSymbol = '÷'; break;
            case '%': operatorSymbol = '%'; break;
        }
        
        // Add to history
        addToHistory(`${firstOperand} ${operatorSymbol} ${secondOperand}`, result);
        
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

// History functions
function addToHistory(expression, result) {
    calculationHistory.unshift({ expression, result });
    
    // Limit history size
    if (calculationHistory.length > MAX_HISTORY_ITEMS) {
        calculationHistory.pop();
    }
    
    updateHistoryDisplay();
    
    // Save to localStorage
    localStorage.setItem('calculatorHistory', JSON.stringify(calculationHistory));
}

function updateHistoryDisplay() {
    const historyList = document.getElementById('history-list');
    historyList.innerHTML = '';
    
    calculationHistory.forEach(item => {
        const historyItem = document.createElement('div');
        historyItem.className = 'history-item';
        historyItem.innerHTML = `
            <div class="history-expression">${item.expression}</div>
            <div class="history-result">${item.result}</div>
        `;
        
        // Add click event to reuse this result
        historyItem.addEventListener('click', () => {
            document.getElementById('calcarea').textContent = item.result;
            firstOperand = null;
            operator = null;
            waitingForSecondOperand = false;
        });
        
        historyList.appendChild(historyItem);
    });
}

function clearHistory() {
    calculationHistory = [];
    updateHistoryDisplay();
    localStorage.removeItem('calculatorHistory');
}

// Function to update theme-color meta tag
function updateThemeMetaColor(color) {
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
        metaThemeColor.setAttribute('content', color);
    }
}

// Initialize when the page loads
document.addEventListener('DOMContentLoaded', () => {
    // Load history from localStorage if available
    const savedHistory = localStorage.getItem('calculatorHistory');
    if (savedHistory) {
        calculationHistory = JSON.parse(savedHistory);
        updateHistoryDisplay();
    }
    
    // Toggle history panel
    document.getElementById('toggle-history').addEventListener('click', () => {
        document.getElementById('history-panel').classList.toggle('open');
    });
    
    // Clear history button
    document.getElementById('clear-history').addEventListener('click', clearHistory);
    
    // Theme switcher
    const themeSwitch = document.getElementById('theme-switch');
    
    // Check for saved theme preference or respect OS preference
    const savedTheme = localStorage.getItem('calculatorTheme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'light') {
        document.body.classList.add('light-theme');
        themeSwitch.checked = true;
    } else if (savedTheme === 'dark') {
        document.body.classList.remove('light-theme');
        themeSwitch.checked = false;
    } else if (!prefersDark) {
        // If no saved preference but OS prefers light
        document.body.classList.add('light-theme');
        themeSwitch.checked = true;
    }
    
    // Theme toggle event
    themeSwitch.addEventListener('change', () => {
        if (themeSwitch.checked) {
            document.body.classList.add('light-theme');
            localStorage.setItem('calculatorTheme', 'light');
            updateThemeMetaColor('#f8f9fa');
        } else {
            document.body.classList.remove('light-theme');
            localStorage.setItem('calculatorTheme', 'dark');
            updateThemeMetaColor('#202124');
        }
    });
});


// Convert pressed key into button ID
function keyToId(num) {
    const words = {
        0: 'zero',
        1: 'one',
        2: 'two',
        3: 'three',
        4: 'four',
        5: 'five',
        6: 'six',
        7: 'seven',
        8: 'eight',
        9: 'nine',
        '.': 'decimal',
        'Escape': 'clear',
        'Backspace': 'backspace',
        '*': 'multiply',
        '/': 'divide',
        '+': 'add',
        '-': 'subtract',
        'Enter': 'equal',
        '=': 'equal',
    };
    
    return words[num];
}

// Keyboard animation
document.addEventListener('keydown', (event) => {
    var key = event.key;
    key = keyToId(key);
    const button = document.getElementById(key);
    button.classList.add('active-btn'); //add active class

    // Remove the class after a short delay
    setTimeout(() => {
        button.classList.remove('active-btn');
    }, 200);

});