import {editFormElement, editButton, editPopup, nameInput, aboutInput, profileName, profileAbout, addFormElement, addButton, addPopup, 
  addPlace, addImageLink, elementsList, formSettings} from './constants.js';
import {initialCards} from './data.js';
import Card from './Card.js';
import {closePopup, openPopup} from './utils.js';
import FormValidator from './FormValidator.js';

const fillEditForm = () => {
  nameInput.value = profileName.textContent;
  aboutInput.value = profileAbout.textContent;
}

const getCard = (data) => {
  return new Card(data, '.element__template').generate();
}
  
//перебор массива данных для карточек
initialCards.forEach(item => {
  //генерирование карточки
  const cardElement = getCard(item);
  //размещение карточки на странице
  elementsList.append(cardElement);
});

//форма редактирования профиля сразу заполняется исходными данными пользователя
fillEditForm();

const formValidators = {};

const enableValidation = (formSettings) => {
  const formList = Array.from(document.querySelectorAll(formSettings.formSelector));
  formList.forEach((formElement) => {
    const formValidator = new FormValidator(formSettings, formElement);
    formValidators[formElement.name] = formValidator;
    formValidator.enableValidation();
  });
}

enableValidation(formSettings);

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
elementsList.prepend(getCard(place));
closePopup(addPopup);
//очищаем форму
addFormElement.reset();
formValidators[addFormElement.name].disableButton();
}

editButton.addEventListener('click', () => {
    fillEditForm();
    openPopup(editPopup);
});

addButton.addEventListener('click', () => openPopup(addPopup));

editFormElement.addEventListener('submit', handleProfileFormSubmit);
addFormElement.addEventListener('submit', handleAddingFormSubmit);


  