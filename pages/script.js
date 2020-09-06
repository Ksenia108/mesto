let userName = document.querySelector('.profile__title');
let userJob = document.querySelector('.profile__text')
let nameInput = document.querySelector('.nameinput');
let jobInput = document.querySelector('.jobinput');
let popup = document.querySelector('.popup');
let forms = document.forms;
//let popups = document.querySelectorAll('.profile');
let popupForm = document.querySelector('.popup__container');
// open popup functionality
let editButton = document.querySelector('.profile__edit');
// close popup functionality
let closePopup = document.querySelector('.profile__close');

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
// объявляем перменную для добавления карточек на страницу при загрузке;
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
    popup.classList.toggle("popup_opened");
    if (popup.classList.contains("popup_opened")) {
        setInfo();
    }
}

function formSubmitHandler(evt) {
    evt.preventDefault();

    userName.textContent = nameInput.value;
    userJob.textContent = jobInput.value;

    togglePopup();
}

function add_card(name, link) {
    const card = elementTemplate.cloneNode(true);
    const img = card.querySelector('.element__image');
    const text = card.querySelector('.element__text');
    img.src = link;
    img.alt = name;
    text.textContent = name;
    elementSection.append(card);
}

// инициализируем карточ по умолчанию
initialCards.forEach(card => add_card(card.name, card.link));

//popup profile end
//function init_form (item, index) {
// if (item[index].profile_edit.editButton())
// item[index].addEventListener('submit', formSubmitHandler);
// item[index].addEventListener('click', togglePopup);

//}

//function init_elements () {
//   let x = document.createElement('div')

//}

//forms.forEach(init_form)


editButton.addEventListener('click', togglePopup);
closePopup.addEventListener('click', togglePopup);
popupForm.addEventListener('submit', formSubmitHandler);
popupForm2.addEventListener('submit', formSubmitHandler);