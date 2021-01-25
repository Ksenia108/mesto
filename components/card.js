export class Card {
    constructor({ data, userid, handleLikeClick, handleDeleteClick, handleCardClick }, cardSelector) {
        this._data = data;
        this._cardId = data._id;
        this._userId = userid;
        this._ownerId = data.owner._id;
        this._likes = data.likes;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
        this._handleDeleteClick = handleDeleteClick.bind(this);
        this._handleLikeClick = handleLikeClick.bind(this);
    }

    remove(id) {
        document.getElementById(id).parentNode.remove();
    }

    setLikes(likes) {
        this._likes = likes;
        this._likeCountElement.textContent = likes.length;
        if (this.isLiked()) {
            this._likeButton.classList.add('element__like_active');
        } else {
            this._likeButton.classList.remove('element__like_active');
        }
    }

    isLiked() {
        if (this._likes.some(e => e._id === this._userId)) {
            return true;
        } else {
            return false;
        }
    }

    _isOwner() {
        if (this._ownerId === this._userId) {
            return true;
        } else {
            return false;
        }
    }

    _getTemplate() {
        const _cardElement = document
            .querySelector(this._cardSelector)
            .content
            .cloneNode(true);

        return _cardElement;
    }

    generateCard() {
        this._element = this._getTemplate();
        const _elementText = this._element.querySelector('.element__text');
        this._elementImg = this._element.querySelector('.element__image');
        this._likeButton = this._element.querySelector('.element__like');
        this._deleteButton = this._element.querySelector('.element__delete');
        this._elementImg.id = this._cardId;
        this._elementImg.alt = this._data.name;
        this._elementImg.src = this._data.link;
        _elementText.textContent = this._data.name;
        this._likeCountElement = this._element.querySelector('.element__number');
        this._setEventListeners(this._element);
        this.setLikes(this._likes);
        return this._element;
    }

    _setEventListeners(element) {
        this._elementImg.addEventListener('click', () => {
            this._handleCardClick(this._data);
        });
        this._likeButton.addEventListener('click', () => { this._handleLikeClick(this._cardId, this.isLiked()); });
        if (this._isOwner()) {
            this._deleteButton.addEventListener('click', () => { this._handleDeleteClick(this._cardId, element); });
        } else {
            this._deleteButton.remove();
        }
    }
}