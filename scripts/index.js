import { Card } from './card.js';
import { FormValidator } from './formValidator.js';

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

const elementTemplate = '.element-template';
const elementSection = document.querySelector('.elements');

const formSelector = '.profile-form';
const formSelector2 = '.card-form'
const inputSelector = '.popup__input';
const submitButtonSelector = '.popup__save';
const inactiveButtonClass = 'popup__save_disabled';
const inputErrorClass = 'popup__input_type_error';
const errorClass = 'popup__error_visible';

const initialCards = [{
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

const validationSettings = {
    inputSelector: inputSelector,
    submitButtonSelector: submitButtonSelector,
    inactiveButtonClass: inactiveButtonClass,
    inputErrorClass: inputErrorClass,
    errorClass: errorClass
};

const setProfileInfo = () => {
    nameInput.value = userName.textContent;
    jobInput.value = userJob.textContent;
}

const togglePopup = (popup) => {
    popup.classList.toggle('open-popup');
}

const createCard = (name, link) => {
    const card = new Card(link, name, elementTemplate);
    const cardElement = card.generateCard();
    return cardElement;
}

const addInitCard = (name, link) => {
    const card = createCard(name, link);
    elementSection.append(card);
}

const addNewCard = (name, link) => {
    const card = createCard(name, link);
    elementSection.prepend(card);
}

const handleProfileFormSubmit = (evt) => {
    evt.preventDefault();
    userName.textContent = nameInput.value;
    userJob.textContent = jobInput.value;
    togglePopup(popupEditProfile);
}

const handleCardFormSubmit = (evt) => {
    evt.preventDefault();
    addNewCard(placeNameInput.value, imageSrcInput.value);
    togglePopup(popupAddCard);
}

const initCards = (cardList) => {
    cardList.forEach(card => addInitCard(card.name, card.link));
}

const closePopup = () => {
    const activePopup = document.querySelector('.open-popup');
    const popupContainer = activePopup.querySelector('.popup__form');

    activePopup.removeEventListener('click', closePopup);
    document.removeEventListener('keydown', closePopupOnEsc);
    popupContainer.removeEventListener('click', preventBubbling);
    togglePopup(activePopup);
}

const closePopupOnEsc = (evt) => {
    const activePopup = document.querySelector('.open-popup');
    if (evt.keyCode === 27) {
        closePopup(activePopup);
    }
}

const preventBubbling = (event) => {
    event.stopImmediatePropagation();
}

export const openPopup = (popup) => {
    const popupContainer = popup.querySelector('.popup__form');
    togglePopup(popup);
    popupContainer.addEventListener('click', preventBubbling);
    popup.addEventListener('click', closePopup);
    document.addEventListener('keydown', closePopupOnEsc);
}

const handleEditProfile = () => {
    openPopup(popupEditProfile);
    setProfileInfo();
}

initCards(initialCards);

elementPopupClose.addEventListener('click', closePopup);

profileOpenPopupButton.addEventListener('click', function() { handleEditProfile(popupEditProfile); });
profileClosePopupButton.addEventListener('click', closePopup);

cardOpenPopupButton.addEventListener('click', function() { openPopup(popupAddCard); });
cardClosePopupButton.addEventListener('click', closePopup);


profileForm.addEventListener('submit', handleProfileFormSubmit);

cardForm.addEventListener('submit', handleCardFormSubmit);

new FormValidator(validationSettings, formSelector).enableValidation();
new FormValidator(validationSettings, formSelector2).enableValidation();