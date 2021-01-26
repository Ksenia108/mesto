export class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
        this._closeBtn = this._popup.querySelector('.popup__close');
        this._popupContainer = this._popup.querySelector('.popup__form');
        this._escHandler = this._handleEscClose.bind(this);
        this.open = this.open.bind(this);
        this._closeHandler = this.close.bind(this);
        this._overlayHandler = this._handleClickOnOverlay.bind(this);
    }
    open() {
        document.addEventListener('keydown', this._escHandler);
        this._popup.classList.add('open-popup');
    }
    close() {
        document.removeEventListener('keydown', this._escHandler);
        this._popup.classList.remove('open-popup');
    }

    _handleEscClose(evt) {
        const ESC = 27;
        if (evt.keyCode === ESC) {
            this.close();
        }
    }

    _handleClickOnOverlay(evt) {
        if (evt.target === evt.currentTarget) {
            this.close();
        }
    }

    setEventListeners() {
        this._closeBtn.addEventListener('click', this._closeHandler);
        this._popup.addEventListener('click', this._overlayHandler);
    }
}