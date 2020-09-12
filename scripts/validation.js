const formSelector = '.popup__container';
const inputSelector = '.popup__input';
const submitButtonSelector = '.popup__save';
const inactiveButtonClass = 'popup__save_disabled';
const inputErrorClass = 'popup__input_type_error';
const errorClass = 'popup__error_visible';

const showInputError = (formElement, inputElement, errorMessage, inputErrorClass, errorClass) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    // input type error
    inputElement.classList.add(inputErrorClass);
    // span erorr message
    errorElement.textContent = errorMessage;
    errorElement.classList.add(errorClass);
};

const hideInputError = (formElement, inputElement, inputErrorClass, errorClass) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(inputErrorClass);
    errorElement.classList.remove(errorClass);
    errorElement.textContent = '';
};

const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
}

const checkInputValidity = (formElement, inputElement, inputErrorClass, errorClass) => {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, inputErrorClass, errorClass);
    } else {
        hideInputError(formElement, inputElement, inputErrorClass, errorClass);
    }
};

const toggleButtonState = (inputList, buttonElement) => {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add('popup__save_disabled');
    } else {
        buttonElement.classList.remove('popup__save_disabled');
    }
}

const setEventListeners = (formElement, inputList, buttonElement, inactiveButtonClass, inputErrorClass, errorClass) => {
    formElement.addEventListener('submit', function(evt) {
        evt.preventDefault();
    });
    toggleButtonState(inputList, buttonElement, inactiveButtonClass);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function() {
            checkInputValidity(formElement, inputElement, inputErrorClass, errorClass);
            toggleButtonState(inputList, buttonElement, inactiveButtonClass);
        });
    });
};


const enableValidation = (args) => {
    const formsElement = document.querySelectorAll(args['formSelector']);
    const inputSelector = args['inputSelector'];
    const submitButtonSelector = args['submitButtonSelector'];
    const inactiveButtonClass = args['inactiveButtonClass'];
    const inputErrorClass = args['inputErrorClass'];
    const errorClass = args['errorClass'];
    formsElement.forEach((formElement) => {
        const inputList = Array.from(formElement.querySelectorAll(inputSelector));
        const submitButtonElement = formElement.querySelector(submitButtonSelector);
        setEventListeners(formElement, inputList, submitButtonElement, inactiveButtonClass, inputErrorClass, errorClass);
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