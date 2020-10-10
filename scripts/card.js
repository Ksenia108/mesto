import { openPopup } from './index.js';

export class Card {
    constructor(image, title, cardSelector) {
        this._image = image;
        this._title = title;
        this._cardSelector = cardSelector;
    }

    _getTemplate = () => {
        const _cardElement = document
            .querySelector(this._cardSelector)
            .content
            .cloneNode(true);

        return _cardElement;
    }

    generateCard = () => {
        const _element = this._getTemplate();
        const _elementText = _element.querySelector('.element__text');
        this._elementImg = _element.querySelector('.element__image');
        this._elementImg.alt = this._title;
        this._elementImg.src = this._image;
        _elementText.textContent = this._title;
        this._setEventListeners(_element);

        return _element;
    }

    _photoPopup = () => {
        const elementPopup = document.querySelector('.popup_photo');
        const elementPopupImage = document.querySelector('.popup_photo__image');
        const elementPopupText = document.querySelector('.popup_photo__text');

        openPopup(elementPopup);
        elementPopupImage.src = this._image;
        elementPopupImage.alt = this._title;
        elementPopupText.textContent = this._title;
    }

    _like = (event) => {
        event.target.classList.toggle('element__like_active');
    }

    _delete = (event) => {
        event.target.parentElement.remove();
    }

    _setEventListeners = (element) => {
        const deleteButton = element.querySelector('.element__delete');
        const likeButton = element.querySelector('.element__like');

        //const elementImg = element.querySelector('.element__image');

        this._elementImg.addEventListener('click', this._photoPopup); //function() { photoPopup(this._title, this._image); });

        likeButton.addEventListener('click', this._like);
        deleteButton.addEventListener('click', this._delete);

    }
}