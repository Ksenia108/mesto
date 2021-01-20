export class Card {
    constructor({ data, handleCardClick }, cardSelector) {
        this._data = data;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
    }

    _getTemplate() {
        const _cardElement = document
            .querySelector(this._cardSelector)
            .content
            .cloneNode(true);

        return _cardElement;
    }

    generateCard() {
        const _element = this._getTemplate();
        const _elementText = _element.querySelector('.element__text');
        this._elementImg = _element.querySelector('.element__image');
        this._elementImg.alt = this._data.name;
        this._elementImg.src = this._data.link;
        _elementText.textContent = this._data.name;
        this._setEventListeners(_element);

        return _element;
    }

    _like(event) {
        event.target.classList.toggle('element__like_active');
    }

    _delete(event) {
        event.target.parentElement.remove();
    }

    _setEventListeners(element) {
        const deleteButton = element.querySelector('.element__delete');
        const likeButton = element.querySelector('.element__like');
        this._elementImg.addEventListener('click', () => {
            this._handleCardClick(this._data);
        });

        likeButton.addEventListener('click', this._like);
        deleteButton.addEventListener('click', this._delete);
    }
}