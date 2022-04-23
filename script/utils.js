import {/*editFormElement, editButton,*/ editPopup, /*editCloseButton,*/ nameInput, aboutInput, profileName, profileAbout, addFormElement, /*addButton, */addPopup, addSaveButton,
  /*addCloseButton,*/ addPlace, addImageLink, /*viewPopup, viewCloseButton, elementTemplate,*/ elementsList, /*popupViewImage, popupImageCaption*/} from './constants.js';
import Card from './Card.js';

const closePopup = (popup) => {
  document.removeEventListener('keydown', handleEscUp);
  popup.removeEventListener('click', closePopupButtonOverlay);
  popup.classList.remove('popup_opened');
}

const handleEscUp = (evt) => {
  if (evt.key === 'Escape') {
    const activePopup = document.querySelector('.popup_opened');
    closePopup(activePopup);
  }
}

const closePopupButtonOverlay = (evt) => {
  if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close-button')) {
    closePopup(evt.currentTarget);
  }
}

const openPopup = (popup) => {
  document.addEventListener('keydown', handleEscUp);
  popup.addEventListener('click', closePopupButtonOverlay);
  popup.classList.add('popup_opened');
}

const handleProfileFormSubmit = (evt) => {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileAbout.textContent = aboutInput.value;
    closePopup(editPopup);
}

const handleAddingFormSubmit = (evt) => {
  evt.preventDefault();
  //создаём объект с названием достопримечательности и ссылкой на картинку
  const place = {
    name: addPlace.value,
    link: addImageLink.value
  };
  //создаём и сразу выводим новую карточку на страницу в начало списка карточек
  elementsList.prepend(new Card(place, '.element__template').generate());
  closePopup(addPopup);
  //очищаем форму
  addFormElement.reset();
  addSaveButton.classList.add('popup__form-button_disabled');
  addSaveButton.disabled = true;
}

const fillEditForm = () => {
  nameInput.value = profileName.textContent;
  aboutInput.value = profileAbout.textContent;
}

export {fillEditForm, openPopup, handleProfileFormSubmit, handleAddingFormSubmit}
