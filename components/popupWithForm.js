import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
    constructor(popupSelector, submitForm) {
        super(popupSelector);
        this._handleFormSubmit = submitForm;
        this._form = this._popup.querySelector('.popup__form');
        this._submitButton = this._popup.querySelector('.popup__save');
        this._inputList = this._form.querySelectorAll('.popup__input');
    }

    setSubmitBtnText(text) {
        this._submitButton.textContent = text;

    }

    _getInputValues() {
        this._formValues = {};
        this._inputList.forEach(input => {
            this._formValues[input.name] = input.value;
        });
        return this._formValues;
    }

    close() {
        super.close();
        this._form.reset();
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            this.setSubmitBtnText('Сохранение...');
            evt.preventDefault();
            this._handleFormSubmit(this._getInputValues());
        });
    }
}