let userName = document.querySelector("username");
let userJob = document.querySelector("job")
let nameInput = document.querySelector("name-input");
let jobInput = document.querySelector("job-input");
let popup = document.querySelector("popup");
let popupForm = document.querySelector("popup-form");
// open popup functionality
let editButton = document.querySelector("profile-edit");

// close popup functionality
let closePopup = document.querySelector("profile-close");


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