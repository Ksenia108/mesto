import { Popup } from './popup.js';

export class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._image = document.querySelector('.popup_photo__image');
        this._text = document.querySelector('.popup_photo__text');
    }

    open(data) {
        super.open();
        this._image.src = data.link;
        this._image.alt = data.name;
        this._text.textContent = data.name;
    }

}