
// global variables
const MILLISECONDS_IN_DAY = 86400000;

const yearsOutput = document.getElementById('years');
const monthsOutput = document.getElementById('months');
const daysOutput = document.getElementById('days');
const submitBtn = document.getElementById('submitBtn');

// submit button is clicked
function handleClick() {
    const yearInput = document.getElementById('year');
    const monthInput = document.getElementById('month');
    const dayInput = document.getElementById('day');
    let isValid = true;

    // verify input values
    // returns boolean
    isValid = checkInputs(dayInput, monthInput, yearInput); 

    // if valid, calculate values
    if (isValid) {
        calculateOutput(dayInput, monthInput, yearInput);
    }   
}

// check user input values for date variables
function checkInputs(days, months, years) {
    let isValid = true;

    resetErrors();  // reset input errors

    // check if date is in the past
    if (new Date() < new Date(`${months.value} ${days.value} ${years.value}`) || /^\d+$/.test(years.value) === false) {
        setErrorMessage(years, "Must be in the past");
        isValid = false;
    }
    
    // check if values are within parameters
    if (days.value > 31 || days.value < 1 || /^\d+$/.test(days.value) === false) {
        setErrorMessage(days, "Must be a valid day");
        isValid = false;
    }

    if (months.value > 12 || months.value < 1 || /^\d+$/.test(months.value) === false) {
        setErrorMessage(months, "Must be a valid month");
        isValid = false;
    }

    // check if date format is valid
    if (new Date(`${months.value} ${days.value} ${years.value}`).isValid === false) {
        setErrorMessage(days, "Must be a valid date");
        setErrorMessage(months, "");
        setErrorMessage(years, "");
        isValid = false;
    }

    // check if values are empty
    if (days.value === '') {
        setErrorMessage(days, "This field is required");
        isValid = false;
    }

    if (months.value === '') {
        setErrorMessage(months, "This field is required");
        isValid = false;
    }
    
    if (years.value === '') {
        setErrorMessage(years, "This field is required");
        isValid = false;
    }

    return isValid;
} 

// sets error messages and styles
function setErrorMessage(obj, message) {
    const nextSibling = obj.nextElementSibling;
    const prevSibling = obj.previousElementSibling;

    nextSibling.innerHTML = message;

    obj.style.border = "1px solid var(--light-red)";
    prevSibling.style.color = "var(--light-red)";
}

// returns error styles to default
function resetErrors() {
    const inputs = document.querySelectorAll('.input');

    [...inputs].map(input => {
        input.nextElementSibling.innerHTML = '';
        input.style.border = "1px solid var(--light-gray)";
        input.previousElementSibling.style.color = "var(--smokey-gray)";
    })
}

// calculate age results
function calculateOutput(dayInput, monthInput, yearInput) {
    const diff = Math.floor((new Date() - Date.parse(`${monthInput.value} ${dayInput.value} ${yearInput.value}`)) / MILLISECONDS_IN_DAY);

    console.log(`${monthInput.value} ${dayInput.value} ${yearInput.value}`);

    let years = Math.floor(diff / 365);
    let months = Math.floor((diff % 365) / 30);
    let days = Math.floor((diff % 365) % 30);

    yearsOutput.innerHTML = years;
    monthsOutput.innerHTML = months;
    daysOutput.innerHTML = days;
}

submitBtn.addEventListener("click", handleClick);   // submit button

// reset values on page reload
window.onload = function() {
    [...document.querySelectorAll('input')].map(i => {
        i.value = '';
    })
}