// open popup functionality
let name = document.querySelector("#username");
let job = document.querySelector("#job")
let nameInput = document.querySelector("#name-input");
let jobInput = document.querySelector("#job-input");
let popup = document.querySelector("#popup");
let formElement = document.querySelector("#popup-form");
// open popup functionality
let editButton = document.querySelector("#profile-edit");


// close popup functionality
let closePopup = document.querySelector("#profile-close");


function setInfo() {
    nameInput.value = name.textContent;
    jobInput.value = job.textContent;
}

function togglePopup() {
    popup.classList.toggle("popup_opened");
    if (popup.classList.contains("popup_opened")) {
        setInfo();
    }
}


function formSubmitHandler(evt) {
    evt.preventDefault();

    name.textContent = nameInput.value;
    job.textContent = jobInput.value;

    togglePopup();
}
editButton.addEventListener("click", togglePopup);
closePopup.addEventListener("click", togglePopup);
formElement.addEventListener('submit', formSubmitHandler);