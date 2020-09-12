const formSelector = '.popup__container';
const inputSelector = '.popup__input';
const submitButtonSelector = '.popup__save';
const inactiveButtonClass = 'popup__save_disabled';
const inputErrorClass = 'popup__input_type_error';
const errorClass = 'popup__error_visible';

const showInputError = (formElement, inputElement, errorMessage, args) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    // input type error
    inputElement.classList.add(args.inputErrorClass);
    // span erorr message
    errorElement.textContent = errorMessage;
    errorElement.classList.add(args.errorClass);
};

const hideInputError = (formElement, inputElement, args) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(args.inputErrorClass);
    errorElement.classList.remove(args.errorClass);
    errorElement.textContent = '';
};

const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
}

const checkInputValidity = (formElement, inputElement, args) => {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, args);
    } else {
        hideInputError(formElement, inputElement, args);
    }
};

const toggleButtonState = (inputList, submitButtonElement, inactiveButtonClass) => {
    if (hasInvalidInput(inputList)) {
        submitButtonElement.classList.add(inactiveButtonClass);
    } else {
        submitButtonElement.classList.remove(inactiveButtonClass);
    }
}

const setEventListeners = (formElement, inputList, submitButtonElement, args) => {
    formElement.addEventListener('submit', function(evt) {
        evt.preventDefault();
    });
    toggleButtonState(inputList, submitButtonElement, args.inactiveButtonClass);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function() {
            checkInputValidity(formElement, inputElement, args);
            toggleButtonState(inputList, submitButtonElement, args.inactiveButtonClass);
        });
    });
};


const enableValidation = (args) => {
    const formsElement = document.querySelectorAll(args.formSelector);

    formsElement.forEach((formElement) => {
        const inputList = Array.from(formElement.querySelectorAll(args.inputSelector));
        const submitButtonElement = formElement.querySelector(args.submitButtonSelector);
        setEventListeners(formElement, inputList, submitButtonElement, args);
    });
};

enableValidation({
    formSelector: formSelector,
    inputSelector: inputSelector,
    submitButtonSelector: submitButtonSelector,
    inactiveButtonClass: inactiveButtonClass,
    inputErrorClass: inputErrorClass,
    errorClass: errorClass
});