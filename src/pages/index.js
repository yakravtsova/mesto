import {editButton, editPopupSelector, nameInput, aboutInput, profileNameSelector, profileAboutSelector, addFormElement, addButton, addPopupSelector, 
  elementsListSelector, viewPopupSelector, initialCards, formSettings} from '../utils/constants.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import './index.css';

const userInfo = new UserInfo(profileNameSelector, profileAboutSelector);

//функция заполняет поля редактирования профиля исходными данными
const fillEditForm = ({username, about}) => {
  nameInput.value = username;
  aboutInput.value = about;
}

//попап просмотра карточки
const viewPopup = new PopupWithImage(viewPopupSelector);
viewPopup.setEventListeners();

//функция генерирует разметку карточки
const getCard = (item) => {
  const card = new Card({
    data: item,
    handleCardClick: item => viewPopup.open(item)
  }, 
  '.element__template');
  return card.generate();
}

//разметка секции с карточками
const cardList = new Section(
  {items: initialCards,
  renderer: item => {
    const cardElement = getCard(item);
    cardList.setItemEnd(cardElement);
    }
  },
  elementsListSelector
);
//отрисовка секции на странице
cardList.renderItems();

//форма редактирования профиля сразу заполняется исходными данными пользователя
fillEditForm(userInfo.getUserInfo());

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

//попап редактирования информации о пользователе
const editPopup = new PopupWithForm({
  selector: editPopupSelector,
  handleFormSubmit: (evt) => {
    evt.preventDefault();
    const userData = editPopup._getInputValues();
    userInfo.setUserInfo(userData);
    editPopup.close();
  }
});
editPopup.setEventListeners();

//попап добавления карточки
const addPopup = new PopupWithForm({
  selector: addPopupSelector,
  handleFormSubmit: (evt) => {
    evt.preventDefault();
    //создаём объект с названием достопримечательности и ссылкой на картинку
    const place = addPopup._getInputValues();
    //создаём и сразу выводим новую карточку на страницу в начало списка карточек
    cardList.setItemStart(getCard(place));
    addPopup.close();
    //очищаем форму
    addFormElement.reset();
    formValidators[addFormElement.name].disableButton();
    }
});
addPopup.setEventListeners();

editButton.addEventListener('click', () => {
  fillEditForm(userInfo.getUserInfo());
  editPopup.open();
});

addButton.addEventListener('click', () => addPopup.open());