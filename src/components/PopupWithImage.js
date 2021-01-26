import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._image = this._popup.querySelector('.photo__image');
        this._text = this._popup.querySelector('.photo__text');
    }

    open(data) {
        super.open();
        this._image.src = data.link;
        this._image.alt = data.name;
        this._text.textContent = data.name;
    }

}