const nameInput = document.getElementById('name');
const numberInput = document.getElementById('number');
const monthInput = document.getElementById('monthInput');
const yearInput = document.getElementById('yearInput');
const cvcInput = document.getElementById('cvc');
const nameDisplay = document.getElementById('name-display');
const numberDisplay = document.getElementById('number-display');
const dateDisplay = document.getElementById('date-display');
const cvcDisplay = document.getElementById('cvc-display');
const numberErrorMessage = document.getElementById('numberErrorMessage');
const dateErrorMessage = document.getElementById('dateErrorMessage');
const cvcErrorMessage = document.getElementById('cvcErrorMessage');
const errorColor = document.getElementById('errorColor');
const errorColor2 = document.getElementById('errorColor2');
const errorColor3 = document.getElementById('errorColor3');
const errorColor4 = document.getElementById('errorColor4');


numberInput.addEventListener('input', function () {
  const numberValue = numberInput.value.trim();
  const isValidInput = /^\d{16}$/.test(numberValue) && !/[a-zA-Z]/.test(numberValue);

  if (isValidInput) {
    const formatValue = formatInputValue(numberValue);
    numberDisplay.textContent = formatValue;

    numberErrorMessage.textContent = '';
    errorColor.classList.remove('invalid');
  } else {
    numberDisplay.textContent = numberValue;
    numberErrorMessage.textContent = 'Wrong format, numbers only';
    errorColor.classList.add('invalid');
  }
});

function formatInputValue(value) {
  return value.match(/.{1,4}/g).join(' ');
}

nameInput.addEventListener('input', function () {
  const nameValue = nameInput.value.toUpperCase();

  nameDisplay.textContent = nameValue;
});

monthInput.addEventListener('input', dateUpdate);
yearInput.addEventListener('input', dateUpdate);

cvcInput.addEventListener('input', function() {
  const cvcValue = cvcInput.value.trim();
  const isValidInput = /^\d{3}$/.test(cvcValue) && !/[a-zA-Z]/.test(cvcValue);

  if (isValidInput) {
    cvcDisplay.textContent = cvcValue;

    cvcErrorMessage.textContent = '';
    errorColor4.classList.remove('invalid');
  } else {
    cvcDisplay.textContent = '';

    cvcErrorMessage.textContent = "can't be blank";
    errorColor4.classList.add('invalid');
  }
});

function dateUpdate() {
  const monthValue = monthInput.value.trim();
  const yearValue = yearInput.value.trim();
  const month = padSingleDigit(monthValue);
  const year = padSingleDigit(yearValue);

  if (month && year && isValidMonth(month) && isValidYear(year)) {
    dateDisplay.textContent = `${month}/${year}`;
    dateErrorMessage.textContent = '';
    errorColor2.classList.remove('invalid');
    errorColor3.classList.remove('invalid');
  } else {
    dateDisplay.textContent = `${monthValue}/${yearValue}`;
    dateErrorMessage.textContent = "can't be blank";
    errorColor2.classList.add('invalid');
    errorColor3.classList.add('invalid');
  }
};

function padSingleDigit(value) {
  return value.length === 1 ? '0' + value : value;
}

function isValidMonth(month) {
  const numericMonth = Number(month);
  return !isNaN(numericMonth) && numericMonth >= 1 && numericMonth <= 12;
}

function isValidYear(year) {
  const numericYear = Number(year);
  return !isNaN(numericYear) && numericYear >= 0 && numericYear <= 99;
}