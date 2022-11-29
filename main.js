function showError(divInput, divError, msgError, show = true) {
  if (show) {
    divError.innerText = msgError;
    divInput.style.borderColor = "#FF0000";
  } else {
    divError.innerText = "";
    divInput.style.borderColor = "hsl(270, 3%, 87%)";
  }
}

function verifyIsFiled(divInput, divError) {
  if (divInput.value.length > 0) {
    showError(divInput, divError, "", false);
    return true;
  } else {
    showError(divInput, divError, "Can't be blank");
    return false;
  }
}

function validateLetters(input, divError) {
  let regExp = /[A-z]/g;
  //   console.log(regExp.test(input.value));
  if (regExp.test(input.value)) {
    showError(input, divError, "Wrong format, numbers only");
  } else {
    showError(input, divError, "", false);
  }
}

// CARDHOLDER NAME
let nameCard = document.querySelector(".card__datails-name");
let nameInput = document.querySelector("#cardholder");
let nameErrorDiv = document.querySelector(".form__cardholder--error");

//NUMBER
let numberCard = document.querySelector(".card__number");
let numberInput = document.querySelector("#cardNumber");
let numberErrorDiv = document.querySelector(".form__inputnumber--error");

// MM
let monthCard = document.querySelector(".card__month");
let monthInput = document.querySelector("#cardMonth");
let monthErrorDiv = document.querySelector(".form__input-mm--error");

//YY

let yearCard = document.querySelector(".card__year");
let yearInput = document.querySelector("#cardYear");
let yearErrorDiv = document.querySelector(".form__input-yy--error");

//CVC

let cvcCard = document.querySelector(".card-back__cvc");
let cvcInput = document.querySelector("#cardCvc");
let cvcErrorDiv = document.querySelector(".form__input-cvc--error");

//Validations
let nameValidation = false;
let numberValidation = false;
let monthValidation = false;
let yearValidation = false;
let cvcValidation = false;

// Secciones Formulario
let formSection = document.querySelector(".form");
let thanksSection = document.querySelector(".thanks-section");

//Ingreso dinamico del nombre

nameInput.addEventListener("input", () => {
  //console.log(nameCard);
  if (nameInput.value == "") {
    nameCard.innerText = "JANE APPLESEED";
  } else {
    nameCard.innerText = nameInput.value;
  }
});

//Ingreso dinamico del number
numberInput.addEventListener("input", (e) => {
  let regExp = /[A-z]/g;
  let eventInputValue = e.target.value;
  //console.log(regExp.test(13332));
  if (regExp.test(numberInput.value)) {
    showError(numberInput, numberErrorDiv, "Wrong format, numbers only");
  } else {
    numberInput.value = eventInputValue
      .replace(/\s/g, "")
      .replace(/([0-9]{4})/g, "$1 ")
      .trim();
    showError(numberInput, numberErrorDiv, "", false);
  }
  if (numberInput.value == "") {
    numberCard.innerText = "0000 0000 0000 0000";
  } else {
    numberCard.innerText = numberInput.value;
  }
});

//Ingreso dinamico del mes
// monthInput.addEventListener("input", () => {
//   if ((monthInput.value = "")) {
//     monthCard.innerText = "00";
//   } else {
//     monthCard.innerText = monthInput.value;
//   }
// });
monthInput.addEventListener("input", () => {
  if (monthInput.value == "") {
    monthCard.innerText = "00";
  } else {
    monthCard.innerText = monthInput.value;
  }
  validateLetters(monthInput, monthErrorDiv);
});

//Ingreso dinamico del año
yearInput.addEventListener("input", () => {
  if (yearInput.value == "") {
    yearCard.innerText = "00";
  } else {
    yearCard.innerText = yearInput.value;
  }
  validateLetters(yearInput, yearErrorDiv);
});

//Ingreso dinamico del CVC
cvcInput.addEventListener("input", () => {
  if (cvcInput.value == "") {
    cvcCard.innerText = "000";
  } else {
    cvcCard.innerText = cvcInput.value;
  }
  validateLetters(cvcInput, cvcErrorDiv);
});

//Boton confirm
let confirmBtn = document.querySelector(".form__submit");

confirmBtn.addEventListener("click", (event) => {
  event.preventDefault();
  //Validar  name
  if (verifyIsFiled(nameInput, nameErrorDiv)) {
    nameValidation = true;
  } else {
    nameValidation = false;
  }
  //Validar numero
  if (verifyIsFiled(numberInput, numberErrorDiv)) {
    if (numberInput.value.length == 19) {
      showError(numberInput, numberErrorDiv, "", false);
      numberValidation = true;
    } else {
      showError(numberInput, numberErrorDiv, "Wrong number");
      numberValidation = false;
    }
  }
  //Validar mes
  if (verifyIsFiled(monthInput, monthErrorDiv)) {
    if (parseInt(monthInput.value) > 0 && parseInt(monthInput.value) <= 12) {
      showError(monthInput, monthErrorDiv, "", false);
      monthValidation = true;
    } else {
      showError(monthInput, monthErrorDiv, "Month incorrect");
      monthValidation = false;
    }
  }
  //validar anio
  if (verifyIsFiled(yearInput, yearErrorDiv)) {
    if (parseInt(yearInput.value) >= 22 && parseInt(yearInput.value) <= 27) {
      showError(yearInput, yearErrorDiv, "", false);
      yearValidation = true;
    } else {
      showError(yearInput, yearErrorDiv, "Wrong Year");
      yearValidation = true;
    }
  }
  //validar cvc
  if (verifyIsFiled(cvcInput, cvcErrorDiv)) {
    if (cvcInput.value.length == 3) {
      showError(cvcInput, cvcErrorDiv, "", false);
      cvcValidation = true;
    } else {
      showError(cvcInput, cvcErrorDiv, "Wrong CVC");
      cvcValidation = true;
    }
  }
  //Validacion de todos
  if (
    nameValidation &&
    numberValidation &&
    monthValidation &&
    yearValidation &&
    cvcValidation
  ) {
    console.log("bien todod");
    formSection.style.display = "none";
    thanksSection.style.display = "block";
  }
});
