document.addEventListener('DOMContentLoaded', () => {
    const tempInput = document.getElementById('temp-input');
    const unitSelect = document.getElementById('unit-select');
    const convertBtn = document.getElementById('convert-btn');
    const errorMessage = document.getElementById('error-message');
    const resultsContainer = document.querySelector('.results-container');
    const result1Label = document.querySelector('#result-1 .result-label');
    const result1Value = document.querySelector('#result-1 .result-value');
    const result2Label = document.querySelector('#result-2 .result-label');
    const result2Value = document.querySelector('#result-2 .result-value');

    const updateResults = () => {
        const inputVal = tempInput.value.trim();
        
        // Validation
        if (inputVal === '') {
            showError('Please enter a temperature.');
            return;
        }

        const temp = parseFloat(inputVal);
        if (isNaN(temp) || inputVal !== temp.toString() && inputVal !== temp.toString() + '.' && !inputVal.includes('e')) {
            // Further strict validation to ensure pure numbers
            const numCheck = Number(inputVal);
            if(Number.isNaN(numCheck)){
                 showError('Please enter a valid number.');
                 return;
            }
        }

        clearError();
        
        const unit = unitSelect.value;
        let t1, t2;

        // Conversion Logic
        if (unit === 'C') {
            t1 = { label: 'Fahrenheit', value: (parseFloat(inputVal) * 9/5) + 32, symbol: '°F' };
            t2 = { label: 'Kelvin', value: parseFloat(inputVal) + 273.15, symbol: 'K' };
        } else if (unit === 'F') {
            t1 = { label: 'Celsius', value: (parseFloat(inputVal) - 32) * 5/9, symbol: '°C' };
            t2 = { label: 'Kelvin', value: (parseFloat(inputVal) - 32) * 5/9 + 273.15, symbol: 'K' };
        } else if (unit === 'K') {
            t1 = { label: 'Celsius', value: parseFloat(inputVal) - 273.15, symbol: '°C' };
            t2 = { label: 'Fahrenheit', value: (parseFloat(inputVal) - 273.15) * 9/5 + 32, symbol: '°F' };
        }

        displayResult(result1Label, result1Value, t1);
        displayResult(result2Label, result2Value, t2);
    };

    const showError = (msg) => {
        errorMessage.textContent = msg;
        errorMessage.classList.add('show');
        resultsContainer.classList.remove('active');
        resetValues();
    };

    const clearError = () => {
        errorMessage.classList.remove('show');
        resultsContainer.classList.add('active');
    };

    const displayResult = (labelEl, valueEl, data) => {
        labelEl.textContent = data.label;
        // Float handling to avoid long decimals, e.g., 25.00 -> 25, 25.1234 -> 25.12
        valueEl.textContent = `${Number(data.value.toFixed(2))} ${data.symbol}`;
    };

    const resetValues = () => {
        if (unitSelect.value === 'C') {
             result1Label.textContent = 'Fahrenheit';
             result2Label.textContent = 'Kelvin';
        } else if (unitSelect.value === 'F') {
             result1Label.textContent = 'Celsius';
             result2Label.textContent = 'Kelvin';
        } else {
             result1Label.textContent = 'Celsius';
             result2Label.textContent = 'Fahrenheit';
        }
        result1Value.textContent = '--';
        result2Value.textContent = '--';
    };

    // Initialize labels based on default select
    resetValues();

    // Event Listeners for Real-time conversion and button clicks
    convertBtn.addEventListener('click', updateResults);
    tempInput.addEventListener('input', updateResults);
    unitSelect.addEventListener('change', () => {
        resetValues();
        if (tempInput.value) {
            updateResults();
        }
    });

    // Enter key support
    tempInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            updateResults();
        }
    });
});
