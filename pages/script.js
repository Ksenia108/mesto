let userName = document.querySelector('.profile__title');
let userJob = document.querySelector('.profile__text')
let nameInput = document.querySelector('[name="name-input"]');
let jobInput = document.querySelector('[name="job-input"]');
let popup = document.querySelector('.popup');
let popupForm = document.querySelector('[name="popup-form"]');
// open popup functionality
let editButton = document.querySelector('[name="profile-edit"]');

// close popup functionality
let closePopup = document.querySelector('[name="profile-close"]')

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


editButton.addEventListener("click", togglePopup);
closePopup.addEventListener("click", togglePopup);
popupForm.addEventListener('submit', formSubmitHandler);