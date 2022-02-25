
let formElement = document.querySelector('.popup__form');
let nameInput = document.querySelector('.popup_input_username');
let aboutInput = document.querySelector('.popup_input_about');
let profileName = document.querySelector('.profile__name');
let profileAbout = document.querySelector('.profile__about');
let addButton = document.querySelector('.profile__add-button');
let editButton = document.querySelector('.profile__edit-button');
let popupCloseButton = document.querySelector('.popup__close-button');
let popup = document.querySelector('.popup');

function popupCloseHandler() {
    popup.classList.remove('popup_opened');
}

function formSubmitHandler (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileAbout.textContent = aboutInput.value;
    popupCloseHandler();
}

function popupOpenHandler() {
    popup.classList.add('popup_opened');
    nameInput.value = profileName.textContent;
    aboutInput.value = profileAbout.textContent;
}

editButton.addEventListener('click', popupOpenHandler);
formElement.addEventListener('submit', formSubmitHandler);
popupCloseButton.addEventListener('click', popupCloseHandler);