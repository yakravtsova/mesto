import {editFormElement, editButton, editPopup, addFormElement, addButton, addPopup, elementsList, formSettings} from './constants.js';
import {initialCards} from './data.js';
import Card from './Card.js';
import {fillEditForm, openPopup, handleProfileFormSubmit, handleAddingFormSubmit} from './utils.js';
import FormValidator from './FormValidator.js';

//перебор массива данных для карточек
initialCards.forEach(item => {
  //генерирование карточки
  const cardElement = new Card(item, '.element__template').generate();
  //размещение карточки на странице
  elementsList.append(cardElement);
});

//форма редактирования профиля сразу заполняется исходными данными пользователя
fillEditForm();

//массив всех форм
const formList = Array.from(document.querySelectorAll('.popup__form'));

//на каждую форму навешивается валидация
formList.forEach((formElement) => {
  const formValidator = new FormValidator(formSettings, formElement);
  formValidator.enableValidation();
});

editButton.addEventListener('click', () => {
    fillEditForm();
    openPopup(editPopup);
});

addButton.addEventListener('click', () => openPopup(addPopup));

editFormElement.addEventListener('submit', handleProfileFormSubmit);
addFormElement.addEventListener('submit', handleAddingFormSubmit);


  