import { Popup } from './popup.js';

export class PopupConfirm extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._popup = document.querySelector(popupSelector);
        this._form = this._popup.querySelector(".popup__form");
    }
    setSubmitAction(submitAction) { 
        this._handleSubmitCallback = submitAction; 
    }
    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleSubmitCallback();
        });
    }
}