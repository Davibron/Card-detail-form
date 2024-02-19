const nameInput = document.getElementById('name');
const numberInput = document.getElementById('number');
const monthInput = document.getElementById('monthInput');
const yearInput = document.getElementById('yearInput');
const cvcInput = document.getElementById('cvc');
const btn = document.getElementById('btn');
const cardDetails = document.getElementById('cardDetails');
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
  const regex1 = /^\d{16}$/;
  const regex2 = /[a-zA-Z]/;
  const isValidInput = regex1.test(numberValue) && !regex2.test(numberValue);

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

  handleInputsValidity();
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
  const regex3 = /^\d{3}$/;
  const regex4 = /[a-zA-Z]/;
  const isValidInput2 = regex3.test(cvcValue) && !regex4.test(cvcValue);

  if (isValidInput2) {
    cvcDisplay.textContent = cvcValue;

    cvcErrorMessage.textContent = '';
    errorColor4.classList.remove('invalid');
  } else {
    cvcDisplay.textContent = '';

    cvcErrorMessage.textContent = "can't be blank";
    errorColor4.classList.add('invalid');
  }

  handleInputsValidity();
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

  handleInputsValidity()
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

function handleInputsValidity() {
  const numberValue = numberInput.value.trim();
  const cvcValue = cvcInput.value.trim();
  const monthValue = monthInput.value.trim();
  const yearValue = yearInput.value.trim();
  const regex1 = /^\d{16}$/;
  const regex2 = /[a-zA-Z]/;
  const regex3 = /^\d{3}$/;
  const regex4 = /[a-zA-Z]/;
  const regexMonth = /^(0[1-9]|1[0-2])$/; // Matches valid month digits (01-12)
  const regexYear = /^\d{2}$/; // Matches valid two-digit year
  const isValidInput = regex1.test(numberValue) && !regex2.test(numberValue);
  const isValidInput2 = regex3.test(cvcValue) && !regex4.test(cvcValue);
  const isValidMonth = regexMonth.test(monthValue);
  const isValidYear = regexYear.test(yearValue);

  if (isValidInput && isValidInput2 && isValidMonth && isValidYear) {
    btn.disabled = false;
  } else {
    btn.disabled = true;
  }

  return { isValidInput, isValidInput2, isValidMonth, isValidYear };
}

btn.addEventListener('click', function() {
  const newDiv = document.createElement('div');
  newDiv.innerHTML = `
    <div class="completed">
      <img src="./images/icon-complete.svg">
      <h2>THANK YOU!</h2>
      <h4>We've added your card details</h4>
      <button>Continue</button>
    </div>
  `;
  
  // Replace existing div with new div
  const childElementsToRemove = cardDetails.children; 

  while (childElementsToRemove.length > 0) {
    cardDetails.removeChild(childElementsToRemove[0]);
  }

  cardDetails.appendChild(newDiv);
});