const userName = document.querySelector('.profile__title');
const userJob = document.querySelector('.profile__text');
const nameInput = document.querySelector('.popup__input_text_profile-person');
const jobInput = document.querySelector('.popup__input_text_profile-job');

const nameMesto = document.querySelector('.popup__input_text_card-name');
const imageMesto = document.querySelector('.popup__input_text_card-image');

const profileForm = document.querySelector('.profile-form');
const cardForm = document.querySelector('.card-form');

const popupEditProfile = document.querySelector('.popup_edit');
const profileClosePopupButton = document.querySelector('.popup__input_btn_profile-close');
const profileOpenPopupButton = document.querySelector('.popup__profile-open-button');

const popupAddCard = document.querySelector('.popup_add-card');
const cardOpenPopupButton = document.querySelector('.popup__add-card-open-button');
const cardClosePopupButton = document.querySelector('.popup__input_btn_card-close');

const elementPopup = document.querySelector('.popup_photo');
const elementPopupImage = document.querySelector('.popup_photo__image');
const elementPopupText = document.querySelector('.popup_photo__text');
const elementPopupClose = document.querySelector('.popup__input_btn_photo-close');

const elementTemplate = document.querySelector('.element-template').content;
const elementSection = document.querySelector('.elements');

function createCard(name, link) {
    const card = elementTemplate.cloneNode(true);
    const element = card.querySelector('.element');
    const elementImg = card.querySelector('.element__image');
    const elementText = card.querySelector('.element__text');
    const deleteButton = card.querySelector('.element__delete');
    const likeButton = card.querySelector('.element__like');
    deleteButton.addEventListener('click', function() { element.style.display = 'none'; });
    likeButton.addEventListener('click', function() { this.classList.toggle('element__like_active'); });
    elementImg.src = link;
    elementImg.alt = name;
    elementImg.addEventListener('click', function() {
        elementPopup.classList.toggle('open-popup');
        elementPopupImage.src = this.src;
        elementPopupImage.alt = this.alt;
        elementPopupText.textContent = this.alt;
    });
    elementText.textContent = name;
    //   if (mode === 'initial') {
    //       elementSection.append(card);
    //   } else {
    //       elementSection.prepend(card);
    //   }
    return card;
}

function addInitCard(name, link) {
    const card = createCard(name, link);
    elementSection.append(card);
}

function addNewCard(name, link) {
    const card = createCard(name, link);
    elementSection.prepend(card);
}

function togglePopup(popup) {
    popup.classList.toggle('open-popup');
}

function profileFormSubmitHandler(evt) {
    evt.preventDefault();
    userName.textContent = nameInput.value;
    userJob.textContent = jobInput.value;
    togglePopup(popupEditProfile);
}

function cardFormSubmitHandler(evt) {
    evt.preventDefault();
    addNewCard(nameMesto.value, imageMesto.value);
    togglePopup(popupAddCard);
}

function initCards(cardList) {
    cardList.forEach(card => addInitCard(card.name, card.link));
}

function createCard(name, link) {
    const card = elementTemplate.cloneNode(true);
    const element = card.querySelector('.element');
    const elementImg = card.querySelector('.element__image');
    const elementText = card.querySelector('.element__text');
    const deleteButton = card.querySelector('.element__delete');
    const likeButton = card.querySelector('.element__like');
    deleteButton.addEventListener('click', function() { element.style.display = 'none'; });
    likeButton.addEventListener('click', function() { this.classList.toggle('element__like_active'); });
    elementImg.src = link;
    elementImg.alt = name;
    elementImg.addEventListener('click', function() {
        togglePopup(elementPopup);
        elementPopupImage.src = this.src;
        elementPopupImage.alt = this.alt;
        elementPopupText.textContent = this.alt;
    });
    elementText.textContent = name;
    return card;
}

initCards(initialCards);

elementPopupClose.addEventListener('click', function() { togglePopup(elementPopup); });
profileOpenPopupButton.addEventListener('click', function() { togglePopup(popupEditProfile); });
profileClosePopupButton.addEventListener('click', function() { togglePopup(popupEditProfile); });

cardClosePopupButton.addEventListener('click', function() { togglePopup(popupAddCard); });
cardOpenPopupButton.addEventListener('click', function() { togglePopup(popupAddCard); });

profileForm.addEventListener('submit', function(evt) { profileFormSubmitHandler(evt); });
cardForm.addEventListener('submit', function(evt) { cardFormSubmitHandler(evt); });