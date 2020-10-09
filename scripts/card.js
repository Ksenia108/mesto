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
        const _elementImg = _element.querySelector('.element__image');
        const _elementText = _element.querySelector('.element__text');
        _elementImg.alt = this._title;
        _elementImg.src = this._image;
        _elementText.textContent = this._title;
        this._setEventListeners(_element);

        return _element;
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

        likeButton.addEventListener('click', this._like);
        deleteButton.addEventListener('click', this._delete);

    }
}