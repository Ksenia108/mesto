export const userName = document.querySelector('.profile__title');
export const userJob = document.querySelector('.profile__text');
export const nameInput = document.querySelector('.popup__input_text_profile-person');
export const jobInput = document.querySelector('.popup__input_text_profile-job');

export const placeNameInput = document.querySelector('.popup__input_text_card-name');
export const imageSrcInput = document.querySelector('.popup__input_text_card-image');

export const profileForm = document.querySelector('.profile-form');
export const cardForm = document.querySelector('.card-form');

export const popupEditProfile = document.querySelector('.popup_edit');
export const profileClosePopupButton = document.querySelector('.popup__input_btn_profile-close');
export const profileOpenPopupButton = document.querySelector('.popup__profile-open-button');

export const popupAddCard = document.querySelector('.popup_add-card');
export const cardOpenPopupButton = document.querySelector('.popup__add-card-open-button');
export const cardClosePopupButton = document.querySelector('.popup__input_btn_card-close');

export const elementPopupClose = document.querySelector('.popup__close');
//export const elementPopupClose = document.querySelector('.popup__input_btn_photo-close');

export const elementTemplate = '.element-template';
export const elementSection = document.querySelector('.elements');

export const formSelector = '.profile-form';
export const formSelector2 = '.card-form'
export const inputSelector = '.popup__input';
export const submitButtonSelector = '.popup__save';
export const inactiveButtonClass = 'popup__save_disabled';
export const inputErrorClass = 'popup__input_type_error';
export const errorClass = 'popup__error_visible';

export const initialCards = [{
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