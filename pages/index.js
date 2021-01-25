import './index.css';
import { Card } from '../components/card.js';
import { FormValidator } from '../components/formValidator.js';
import { PopupWithImage } from '../components/popupWithImage.js';
import { PopupConfirm } from '../components/popupConfirm.js';
import { Section } from '../components/section.js';
import { PopupWithForm } from '../components/popupWithForm.js';
import { UserInfo } from '../components/userInfo.js';
import { Api } from '../components/api.js';

const profileOpenPopupButton = document.querySelector('.profile__edit');
const cardOpenPopupButton = document.querySelector('.profile__add');
const avatarOpenPopupButton = document.querySelector('.profile__pen');

const elementTemplate = '.element-template';
const elementSection = '.elements';

const formSelector = '.profile-form';
const formSelector2 = '.card-form';
const formSelector3 = '.avatar-form';
const inputSelector = '.popup__input';
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
let userId = '';

const validationSettings = {
    inputSelector: inputSelector,
    submitButtonSelector: submitButtonSelector,
    inactiveButtonClass: inactiveButtonClass,
    inputErrorClass: inputErrorClass,
    errorClass: errorClass
};

const handleProfileFormSubmit = (formValues) => {
    api.updateUserInfo(formValues.name, formValues.about)
        .then((result) => {
            popupEditProfile.close();
            profileInfo.setUserInfo(result);
        })
        .catch((error) => {
            console.log('handleProfileFormSubmit error=', error)
        })
        .finally(() => {
            popupEditProfile.setSubmitBtnText('Сохранить');
        })
}

const handleCardFormSubmit = (formValues) => {
    const name = formValues.placeName;
    const link = formValues.placeImage;
    api.addCard(name, link)
        .then((result) => {
            popupAddCard.close();
            cardList.renderer(result);
        })
        .catch((error) => {
            console.log('handleCardFormSubmit error=', error)
        })
        .finally(() => {
            popupAddCard.setSubmitBtnText('Создать');
        })
}
const handleAvatarFormSubmit = (formValues) => {
    api.updateUserAvatar(formValues.avatar)
        .then((result) => {
            popupEditAvatar.close();
            profileInfo.setUserAvatar(result);
        })
        .catch((error) => {
            console.log('handleAvatarFormSubmit error=', error)
        })
        .finally(() => {
            popupEditAvatar.setSubmitBtnText('Сохранить');
        })

}


const popupEditProfile = new PopupWithForm(popupSelector, handleProfileFormSubmit);
profileOpenPopupButton.addEventListener('click', popupEditProfile.open);
popupEditProfile.setEventListeners();

const popupAddCard = new PopupWithForm(popupSelector2, handleCardFormSubmit);
cardOpenPopupButton.addEventListener('click', popupAddCard.open);
popupAddCard.setEventListeners();

const profileInfo = new UserInfo({ nameSelector: '.profile__title', jobSelector: '.profile__text' });

const imagePopup = new PopupWithImage(popupSelector3);
imagePopup.setEventListeners();

const popupEditAvatar = new PopupWithForm(popupSelector4, handleAvatarFormSubmit);
avatarOpenPopupButton.addEventListener('click', popupEditAvatar.open);
popupEditAvatar.setEventListeners();

const handleCardClick = (data) => {
    imagePopup.open(data);
}

const api = new Api(baseUrl, authToken);

const popupConfirm = new PopupConfirm(popupSelector5);
popupConfirm.setEventListeners();
const cardList = new Section({
    renderer: (item) => {
        const card = new Card({
            data: item,
            userid: userId,
            handleLikeClick: (id, isLiked) => {
                if (isLiked) {
                    //отправляем запрос снятия лайка
                    api.deleteCardLike(id)
                        .then((result) => {
                            //вызываем метод карточки для обновления отображения лайков
                            card.setLikes(result.likes);
                        })
                        .catch((error) => {
                            console.log("delete card likes error=", error);
                        })
                } else {
                    //отправляем запрос на установку лайка
                    api.addCardLike(id)
                        .then((result) => {
                            //вызываем метод карточки для обновления отображения лайков
                            card.setLikes(result.likes);
                        })
                        .catch((error) => {
                            console.log("add card likes error=", error);
                        })
                }
            },
            handleDeleteClick: (id) => {   //задаем действие, которое будет выполняться при подтверждении удаления
                popupConfirm.setSubmitAction(() => {  
                    api.deleteCard(id)
                        .then((result) => {
                            card.remove(id);
                            popupConfirm.close();    
                        })
                        .catch((error) => {
                            console.log('handleDeleteClick error', error);
                        })  
                });
                popupConfirm.open();
            },
            handleCardClick: handleCardClick
        }, elementTemplate);
        const cardElement = card.generateCard();
        cardList.addItem(cardElement);
    }
}, elementSection);


Promise.all([api.getUserData(), api.getInitialCards()])
    .then((results) => {
        profileInfo.setUserAvatar(results[0]);
        profileInfo.setUserInfo(results[0]);
        userId = results[0]._id;
        cardList.render(results[1]);
    })
    .catch((error) => {
        console.log('promise.all error = ', error);
    });



new FormValidator(validationSettings, formSelector).enableValidation();
new FormValidator(validationSettings, formSelector2).enableValidation();
new FormValidator(validationSettings, formSelector3).enableValidation();