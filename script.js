document.addEventListener('DOMContentLoaded', function () {
    const display = document.getElementById('display');
    let currentInput = '';
    let operator = '';
    let previousInput = '';

    function clearDisplay() {
        currentInput = '';
        operator = '';
        previousInput = '';
        display.textContent = '0';
    }

    function calculate() {
        let result;
        const prev = parseFloat(previousInput);
        const current = parseFloat(currentInput);

        if (isNaN(prev) || isNaN(current)) return;

        switch (operator) {
            case '+':
                result = prev + current;
                break;
            case '-':
                result = prev - current;
                break;
            case '*':
                result = prev * current;
                break;
            case '/':
                result = prev / current;
                break;
            default:
                return;
        }

        currentInput = result.toString();
        operator = '';
        previousInput = '';
        display.textContent = currentInput;
    }

    function handleButtonClick(e) {
        const value = e.target.dataset.value;

        if (!value) return;

        if (value === 'C') {
            clearDisplay();
            return;
        }

        if (value === '=') {
            calculate();
            return;
        }

        if (['+', '-', '*', '/'].includes(value)) {
            if (currentInput === '') return;
            if (operator !== '') calculate();
            operator = value;
            previousInput = currentInput;
            currentInput = '';
            return;
        }

        currentInput += value;
        display.textContent = currentInput;
    }

    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', handleButtonClick);
    });

    clearDisplay();
});