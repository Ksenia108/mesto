import '../pages/index.css';
import { Card } from '../components/card.js';
import { FormValidator } from '../scripts/formValidator.js';
import { PopupWithImage } from '../scripts/popupWithImage.js';
import { Section } from '../components/section.js';
import { PopupWithForm } from '../scripts/popupWithForm.js';
import { UserInfo } from '../components/userInfo.js';

const profileOpenPopupButton = document.querySelector('.profile__edit');

const cardOpenPopupButton = document.querySelector('.profile__add');

const elementTemplate = '.element-template';
const elementSection = '.elements';

const formSelector = '.profile-form';
const formSelector2 = '.card-form'
const inputSelector = '.popup__input';
const submitButtonSelector = '.popup__save';
const inactiveButtonClass = 'popup__save_disabled';
const inputErrorClass = 'popup__input_type_error';
const errorClass = 'popup__error_visible';

const popupSelector = '.popup_edit';
const popupSelector2 = '.popup_add-card';
const popupSelector3 = '.popup_photo';

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

const handleProfileFormSubmit = (formValues) => {
    popupEditProfile.close();
    profileInfo.getUserInfo();
    profileInfo.setUserInfo(formValues);
}
const handleCardFormSubmit = (formValues) => {
    popupAddCard.close();
    cardList.renderer({ name: formValues.placeName, link: formValues.placeImage });
}

const popupEditProfile = new PopupWithForm(popupSelector, handleProfileFormSubmit);
profileOpenPopupButton.addEventListener('click', popupEditProfile.open.bind(popupEditProfile)); //добавление обработчика события открытия попапа
popupEditProfile.setEventListeners();

const popupAddCard = new PopupWithForm(popupSelector2, handleCardFormSubmit);
cardOpenPopupButton.addEventListener('click', popupAddCard.open.bind(popupAddCard));
popupAddCard.setEventListeners();

const profileInfo = new UserInfo({ nameSelector: '.profile__title', jobSelector: '.profile__text' });

const imagePopup = new PopupWithImage(popupSelector3);
imagePopup.setEventListeners();

const handleCardClick = (data) => {
    imagePopup.open(data);
}

const cardList = new Section({
    data: initialCards,
    renderer: (item) => {
        const card = new Card({ data: item, handleCardClick: handleCardClick }, elementTemplate, handleCardClick);
        const cardElement = card.generateCard();
        cardList.addItem(cardElement);
    }
}, elementSection);

cardList.render();

new FormValidator(validationSettings, formSelector).enableValidation();
new FormValidator(validationSettings, formSelector2).enableValidation();