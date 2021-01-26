const profileOpenPopupButton = document.querySelector('.profile__edit');
const cardOpenPopupButton = document.querySelector('.profile__add');
const avatarOpenPopupButton = document.querySelector('.profile__avatar');

const elementTemplate = '.element-template';
const elementSection = '.elements';

const formSelector = '.profile-form';
const formSelector2 = '.card-form';
const formSelector3 = '.avatar-form';
const inputSelector = '.popup__input';
const inputName = document.querySelector('.popup__input_text_profile-person');
const inputJob = document.querySelector('.popup__input_text_profile-job');
const submitButtonSelector = '.popup__save';
const inactiveButtonClass = 'popup__save_disabled';
const inputErrorClass = 'popup__input_type_error';
const errorClass = 'popup__error_visible';

const popupSelector = '.popup_edit';
const popupSelector2 = '.popup_add-card';
const popupSelector3 = '.popup_photo';
const popupSelector4 = '.popup_avatar';
const popupSelector5 = '.popup_confirm';

const baseUrl = 'https://mesto.nomoreparties.co/v1/cohort-19';
const authToken = 'abb0a1b8-f6dc-41f2-b723-c1cae74558f9';

const validationSettings = {
    inputSelector: inputSelector,
    submitButtonSelector: submitButtonSelector,
    inactiveButtonClass: inactiveButtonClass,
    inputErrorClass: inputErrorClass,
    errorClass: errorClass
};

export { profileOpenPopupButton, cardOpenPopupButton, avatarOpenPopupButton, elementTemplate, elementSection, formSelector, formSelector2, formSelector3, popupSelector, popupSelector2, popupSelector3, popupSelector4, popupSelector5, baseUrl, authToken, validationSettings, inputName, inputJob };