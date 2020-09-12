const userName = document.querySelector('.profile__title');
const userJob = document.querySelector('.profile__text');
const nameInput = document.querySelector('.popup__input_text_profile-person');
const jobInput = document.querySelector('.popup__input_text_profile-job');

const placeNameInput = document.querySelector('.popup__input_text_card-name');
const imageSrcInput = document.querySelector('.popup__input_text_card-image');

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

function setProfileInfo() {
    nameInput.value = userName.textContent;
    jobInput.value = userJob.textContent;
}

function togglePopup(popup) {
    popup.classList.toggle('open-popup');
}

function createCard(name, link) {
    const card = elementTemplate.cloneNode(true);
    const element = card.querySelector('.element');
    const elementImg = card.querySelector('.element__image');
    const elementText = card.querySelector('.element__text');
    const deleteButton = card.querySelector('.element__delete');
    const likeButton = card.querySelector('.element__like');

    deleteButton.addEventListener('click', function() { element.remove(); });
    likeButton.addEventListener('click', function() { likeButton.classList.toggle('element__like_active'); });
    elementImg.src = link;
    elementImg.alt = name;
    elementImg.addEventListener('click', function() {
        openPopup(elementPopup);
        elementPopupImage.src = link;
        elementPopupImage.alt = name;
        elementPopupText.textContent = name;
    });
    elementText.textContent = name;
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

function profileFormSubmitHandler(evt) {
    evt.preventDefault();
    userName.textContent = nameInput.value;
    userJob.textContent = jobInput.value;
    togglePopup(popupEditProfile);
}

function cardFormSubmitHandler(evt) {
    evt.preventDefault();
    addNewCard(placeNameInput.value, imageSrcInput.value);
    togglePopup(popupAddCard);
}

function initCards(cardList) {
    cardList.forEach(card => addInitCard(card.name, card.link));
}

function closePopup() {
    const activePopup = document.querySelector('.open-popup');
    const popupContainer = activePopup.querySelector('.popup__form');

    activePopup.removeEventListener('click', closePopup);
    document.removeEventListener('keydown', closePopupOnEsc);
    popupContainer.removeEventListener('click', preventBubbling);
    togglePopup(activePopup);
}

function closePopupOnEsc(evt) {
    const activePopup = document.querySelector('.open-popup');
    if (evt.keyCode == 27) {
        closePopup(activePopup);
    }
}

function preventBubbling(event) {
    event.stopImmediatePropagation();
}

function openPopup(popup) {
    const popupContainer = popup.querySelector('.popup__form');
    togglePopup(popup);
    // prevent bubbling
    popupContainer.addEventListener('click', preventBubbling);
    // overlay click close
    popup.addEventListener('click', closePopup);
    // escape
    document.addEventListener('keydown', closePopupOnEsc);
}

function handleEditProfile() {
    openPopup(popupEditProfile);
    setProfileInfo();
}


initCards(initialCards);


elementPopupClose.addEventListener('click', closePopup);

profileOpenPopupButton.addEventListener('click', function() { handleEditProfile(popupEditProfile); });
profileClosePopupButton.addEventListener('click', closePopup);

cardOpenPopupButton.addEventListener('click', function() { openPopup(popupAddCard); });
cardClosePopupButton.addEventListener('click', closePopup);


profileForm.addEventListener('submit', profileFormSubmitHandler);

cardForm.addEventListener('submit', cardFormSubmitHandler);