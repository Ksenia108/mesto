const userName = document.querySelector('.profile__title');
const userJob = document.querySelector('.profile__text')
const nameInput = document.querySelector('.nameinput');
const jobInput = document.querySelector('.jobinput');
// popupadd
const nameMesto = document.querySelector('.namemesto');
const imageMesto = document.querySelector('.imagemesto');

const popup = document.querySelector('.popup');
const forms = document.forms;
const popupEdit = document.querySelector('.popup_edit');
const popupAdd = document.querySelector('.popup_addCard');
//const popups = document.querySelectorAll('.profile');
const popupForm = document.querySelector('.popup__container');
// open popup functionality
const editButton = document.querySelector('.profile__edit');
// close popup functionality
const closePopup = document.querySelector('.popup__close');
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

function setInfo() {
    nameInput.value = userName.textContent;
    jobInput.value = userJob.textContent;
}

function togglePopup() {
    popup.classList.toggle('popup_opened');
    if (popup.classList.contains('popup_opened')) {
        setInfo();
    }
}

function formSubmitHandler(form) {
    evt.preventDefault();

    if (form === 'popup_edit') {
        userName.textContent = nameInput.value;
        userJob.textContent = jobInput.value;
    } else if (form === 'popup_add') {

    }

    togglePopup();
}


function deleteCard(name) {
    const i = 0;
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
    deleteButton.addEventListener('click', function() { deleteCard(name); }, false);
    div.id = 'card' + this.count;
    img.src = link;
    img.alt = name;
    text.textContent = name;
    elementSection.append(card);
    if (mod === 'new') {
        initialCards.push({ name: name, link: link });
    }
}

// инициализируем карточ по умолчанию
initialCards.forEach(card => addCard(card.name, card.link, "initial"));

//popup profile end
//function init_form (item, index) {
// if (item[index].profile_edit.editButton())
// item[index].addEventListener('submit', formSubmitHandler);
// item[index].addEventListener('click', togglePopup);

//}

//function init_elements () {
//   const x = document.createElement('div')

//}

//forms.forEach(init_form)


editButton.addEventListener('click', togglePopup);
closePopup.addEventListener('click', togglePopup);
popupForm.addEventListener('submit', function() { formSubmitHandler('popup_edit') });
popupForm.addEventListener('submit', function() { formSubmitHandler('popup_add') });