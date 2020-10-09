export class FormValidator {
    constructor(args, formSelector) {
        this._args = args;
        this._formSelector = formSelector;
        this._valid = false;
    };

    _showInputError = (inputElement) => {
        const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.add(this._args.inputErrorClass);
        errorElement.textContent = inputElement.validationMessage;
        errorElement.classList.add(this._args.errorClass);
    };

    _hideInputError = (inputElement) => {
        const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.remove(this._args.inputErrorClass);
        errorElement.classList.remove(this._args.errorClass);
        errorElement.textContent = '';
    };

    _checkInputValidity = () => {
        this._valid = true;
        this._inputList.forEach((inputElement) => {
            if (!inputElement.validity.valid) {
                this._showInputError(inputElement);
                this._valid = false;
            } else {
                this._hideInputError(inputElement);
            }
        });
        this._toggleButtonState();
    };

    _toggleButtonState = () => {
        if (!this._valid) {
            this._submitButtonElement.classList.add(this._args.inactiveButtonClass);
        } else {
            this._submitButtonElement.classList.remove(this._args.inactiveButtonClass);
        }
    };

    _setEventListeners = () => {
        this._formElement.addEventListener('submit', function(evt) {
            evt.preventDefault();
        });

        this._toggleButtonState();
        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', this._checkInputValidity);
        });
    };


    enableValidation = () => {
        this._formElement = document.querySelector(this._formSelector);
        this._inputList = Array.from(this._formElement.querySelectorAll(this._args.inputSelector));
        this._submitButtonElement = this._formElement.querySelector(this._args.submitButtonSelector);
        this._setEventListeners();
    };
}