const userName = document.querySelector('.profile__title');
const userJob = document.querySelector('.profile__text')
const nameInput = document.querySelector('.nameinput');
const jobInput = document.querySelector('.jobinput');
// popupadd
const nameMesto = document.querySelector('.namemesto');
const imageMesto = document.querySelector('.imagemesto');
//const popup = document.querySelector('.popup');
const forms = document.forms;
// edit profile popup
const popupEdit = document.querySelector('.popup_edit');
// add card popup
const popupAdd = document.querySelector('.popup_addcard');
//const popups = document.querySelectorAll('.profile');
// edit profile form
const profileForm = document.querySelector('.profileform');
// add card form
const cardForm = document.querySelector('.cardform');
// card popup button functionality
const cardButton = document.querySelector('.profile__add')
    // open popup functionality
const editButton = document.querySelector('.profile__edit');
// close popup functionality
const closePopup = document.querySelector('.popup__close');
// card close functionality
const cardCloseButton = document.querySelector('#cardCloseButton');
// image popup functionality
const elementPopup = document.querySelector('.elementpopup');
const elementPopupImage = document.querySelector('.elementpopup__image');
const elementPopupText = document.querySelector('.elementpopup__text');
const elementPopupClose = document.querySelector('.elementpopup__close');

// объявляем перменную для добавления карточек на страницу при загрузке;
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

//объявляем переменную для template
const elementTemplate = document.querySelector('.element-template').content;
//объявляем переменную куда буду вставлять template
const elementSection = document.querySelector('.elements');

//popup profile

function setProfileInfo() {
    nameInput.value = userName.textContent;
    jobInput.value = userJob.textContent;
}

function togglePopup(form) {
    if (form === 'popup_edit') {
        popupEdit.classList.toggle('popup_opened');
        if (popupEdit.classList.contains('popup_opened')) {
            setProfileInfo();
        }
    } else if (form === 'popup_add') {
        popupAdd.classList.toggle('popup_opened');
        if (popupAdd.classList.contains('popup_opened')) {
            addCard(nameMesto.value, imageMesto.value, 'new');
        }
    }
}

function formSubmitHandler(evt, form) {
    evt.preventDefault();

    if (form === 'popup_edit') {
        userName.textContent = nameInput.value;
        userJob.textContent = jobInput.value;
        togglePopup(form);
    } else if (form === 'popup_add') {
        togglePopup(form);
    }


}


function deleteCard(name) {
    let i = 0;
    for (i = 0; i < initialCards.length; i++) {
        if (initialCards[i]['name'] === name) {
            const card = document.querySelector(`#card${i}`);
            card.style.display = 'none';
        }
    }
}

function addCard(name, link, mod) {
    if (this.count === undefined) {
        this.count = 0;
    } else {
        this.count += 1;
    }
    const card = elementTemplate.cloneNode(true);
    const div = card.querySelector('.element');
    const img = card.querySelector('.element__image');
    const text = card.querySelector('.element__text');
    const deleteButton = card.querySelector('.element__delete');
    const likeButton = card.querySelector('.element__like');
    deleteButton.addEventListener('click', function() { deleteCard(name); }, false);
    likeButton.addEventListener('click', function() { this.classList.toggle('element__like_active'); });
    div.id = 'card' + this.count;
    img.src = link;
    img.alt = name;
    img.addEventListener('click', function() {
        elementPopup.classList.toggle('elementpopup_opened');
        //elementPopup.style.display = 'flex';
        elementPopupImage.src = this.src;
        elementPopupText.textContent = this.alt;
    });
    text.textContent = name;
    elementSection.append(card);
    if (mod === 'new') {
        initialCards.push({ name: name, link: link });
    }
}


// инициализируем карточ по умолчанию
initialCards.forEach(card => addCard(card.name, card.link, "initial"));

//elementLikeButton.addEventListener('click', function() { elementLikeButton.classList.toggle('element__like_active'); });
elementPopupClose.addEventListener('click', function() { elementPopup.classList.toggle('elementpopup_opened'); });
editButton.addEventListener('click', function() { togglePopup('popup_edit'); });
closePopup.addEventListener('click', function() { togglePopup('popup_edit'); });
cardCloseButton.addEventListener('click', function() { togglePopup('popup_add'); });
cardButton.addEventListener('click', function() { togglePopup('popup_add'); });
profileForm.addEventListener('submit', function(evt) { formSubmitHandler(evt, 'popup_edit'); });
cardForm.addEventListener('submit', function(evt) { formSubmitHandler(evt, 'popup_add'); });