// open popup functionality
let editButton = document.querySelector("#profile-edit");
editButton.addEventListener("click", togglePopup);

// close popup functionality
let closePopup = document.querySelector("#profile-close");
closePopup.addEventListener("click", togglePopup);

function togglePopup() {
    let popup = document.querySelector("#popup");
    popup.classList.toggle("popup_opened");
    if (popup.classList.contains("popup_opened")) {
        setInfo();
    }
}

function setInfo() {
    let nameValue = document.querySelector("#username").textContent;
    let jobValue = document.querySelector("#job").textContent;
    document.querySelector("#name-input").value = nameValue;
    document.querySelector("#job-input").value = jobValue;
}

let formElement = document.querySelector("#popup-form");

function formSubmitHandler(evt) {
    evt.preventDefault();

    let nameInputValue = document.querySelector("#name-input").value;
    let jobInputValue = document.querySelector("#job-input").value;

    document.querySelector("#username").textContent = nameInputValue;
    document.querySelector("#job").textContent = jobInputValue;

    togglePopup();
}

formElement.addEventListener('submit', formSubmitHandler);