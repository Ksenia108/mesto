import './index.css';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupConfirm } from '../components/PopupConfirm.js';
import { Section } from '../components/Section.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';
import { Api } from '../components/Api.js';
import { profileOpenPopupButton, cardOpenPopupButton, avatarOpenPopupButton, elementTemplate, elementSection, formSelector, formSelector2, formSelector3, popupSelector, popupSelector2, popupSelector3, popupSelector4, popupSelector5, baseUrl, authToken, validationSettings, inputName, inputJob } from '../utils/constants.js';
let userId = '';

const createCard = (item) => {
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
                    .then(() => {
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
    return card;
}

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
profileOpenPopupButton.addEventListener('click', () => {
    popupEditProfile.open();
    inputName.value = profileInfo.getUserInfo().userName;
    inputJob.value = profileInfo.getUserInfo().userJob;
    profileValidator.resetValidation();
});
popupEditProfile.setEventListeners();

const popupAddCard = new PopupWithForm(popupSelector2, handleCardFormSubmit);
cardOpenPopupButton.addEventListener('click', () => {
    popupAddCard.open();
    addCardValidator.resetValidation();
});
popupAddCard.setEventListeners();

const profileInfo = new UserInfo({ nameSelector: '.profile__title', jobSelector: '.profile__text', avatarSelector: '.profile__image' });

const imagePopup = new PopupWithImage(popupSelector3);
imagePopup.setEventListeners();

const popupEditAvatar = new PopupWithForm(popupSelector4, handleAvatarFormSubmit);
avatarOpenPopupButton.addEventListener('click', () => {
    popupEditAvatar.open();
    avatarValidator.resetValidation();
});
popupEditAvatar.setEventListeners();

const handleCardClick = (data) => {
    imagePopup.open(data);
}

const api = new Api(baseUrl, authToken);

const popupConfirm = new PopupConfirm(popupSelector5);
popupConfirm.setEventListeners();

const cardList = new Section({
    renderer: (item) => {
        const card = createCard(item);
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



const profileValidator = new FormValidator(validationSettings, formSelector)
profileValidator.enableValidation();

const addCardValidator = new FormValidator(validationSettings, formSelector2)
addCardValidator.enableValidation();

const avatarValidator = new FormValidator(validationSettings, formSelector3)
avatarValidator.enableValidation();