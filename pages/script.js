const userName = document.querySelector('.profile__title');
const userJob = document.querySelector('.profile__text')
const nameInput = document.querySelector('.name-input');
const jobInput = document.querySelector('.jobi-nput');

const nameMesto = document.querySelector('.name-mesto');
const imageMesto = document.querySelector('.image-mesto');

//const forms = document.forms;
const profileForm = document.querySelector('.profile-form');
const cardForm = document.querySelector('.card-form');

const popupEditProfile = document.querySelector('.popup_edit');
const profileClosePopupButton = document.querySelector('.popup__close');
const profileOpenPopupButton = document.querySelector('.profile__edit');

const popupAddCard = document.querySelector('.popup_add-card');
const cardOpenPopupButton = document.querySelector('.profile__add')
const cardClosePopupButton = document.querySelector('#cardCloseButton');

const elementPopup = document.querySelector('.elementpopup');
const elementPopupImage = document.querySelector('.elementpopup__image');
const elementPopupText = document.querySelector('.elementpopup__text');
const elementPopupClose = document.querySelector('.elementpopup__close');


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


const elementTemplate = document.querySelector('.element-template').content;
const elementSection = document.querySelector('.elements');


function setProfileInfo() {
    nameInput.value = userName.textContent;
    jobInput.value = userJob.textContent;
}

function togglePopup(popup) {
    popup.classList.toggle('popup_opened');
}

function handleAddCard(popup) {
    togglePopup(popup);
}

function handleEditProfile(popup) {
    togglePopup(popup);
    setProfileInfo();
}

function profileFormSubmitHandler(evt) {
    evt.preventDefault();
    userName.textContent = nameInput.value;
    userJob.textContent = jobInput.value;
    console.log("debug profile form edit values=", nameInput.value, jobInput.value);
    togglePopup(popupEditProfile);
}

function cardFormSubmitHandler(evt) {
    evt.preventDefault();
    addCard(nameMesto.value, imageMesto.value);
    console.log("debug card form add values=", nameMesto.value, imageMesto.value);
    togglePopup(popupAddCard);
}

function addCard(name, link) {
    console.log("debug addCard name=", name, link);
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
        elementPopup.classList.toggle('elementpopup_opened');
        elementPopupImage.src = this.src;
        elementPopupText.textContent = this.alt;
    });
    elementText.textContent = name;
    elementSection.prepend(card);
}


// инициализируем карточ по умолчанию
initialCards.forEach(card => addCard(card.name, card.link));

elementPopupClose.addEventListener('click', function() { elementPopup.classList.toggle('elementpopup_opened'); });
profileOpenPopupButton.addEventListener('click', function() { handleEditProfile(popupEditProfile); });
profileClosePopupButton.addEventListener('click', function() { handleEditProfile(popupEditProfile); });

cardClosePopupButton.addEventListener('click', function() { handleAddCard(popupAddCard); });
cardOpenPopupButton.addEventListener('click', function() { handleAddCard(popupAddCard); });

profileForm.addEventListener('submit', function(evt) { profileFormSubmitHandler(evt); });
cardForm.addEventListener('submit', function(evt) { cardFormSubmitHandler(evt); });