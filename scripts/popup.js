export class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
        this._closeBtn = this._popup.querySelector('.popup__close');
        this._popupContainer = this._popup.querySelector('.popup__form');
        this._escHandler = this._handleEscClose.bind(this);
    }
    open() {
        console.log('open');
        document.addEventListener('keydown', this._escHandler);
        this._popup.classList.toggle('open-popup');
    }
    close() {
        console.log('close');
        document.removeEventListener('keydown', this._escHandler);
        this._popup.removeEventListener('click', this.close);
        this._popupContainer.removeEventListener('click', this._preventBubbling);
        this._popup.classList.toggle('open-popup');
    }

    _handleEscClose(evt) {
        console.log('escclose');
        if (evt.keyCode === 27) {
            this.close();
        }
    }

    _preventBubbling(event) {
        event.stopImmediatePropagation();
    }

    setEventListeners() {
        this._closeBtn.addEventListener('click', this.close.bind(this));
        this._popupContainer.addEventListener('click', this._preventBubbling.bind(this));
        this._popup.addEventListener('click', this.close.bind(this));
    }
}