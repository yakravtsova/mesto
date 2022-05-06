const editButton = document.querySelector('.profile__edit-button');
const editPopupSelector = '.popup_feature_edit';
const editFormElement = document.querySelector('.popup__form_feature_edit');
const nameInput = document.querySelector('.popup__form-input_input_username');
const aboutInput = document.querySelector('.popup__form-input_input_about');
const profileNameSelector = '.profile__name';
const profileAboutSelector = '.profile__about';
const addFormElement = document.querySelector('.popup__form_feature_add');
const addButton = document.querySelector('.profile__add-button');
const addPopupSelector = '.popup_feature_add';
const viewPopupSelector = '.popup_feature_view';
const elementsListSelector = '.elements__list';

const initialCards = [
  {
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

const formSettings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__form-input',
  submitButtonSelector: '.popup__form-button',
  inactiveButtonClass: 'popup__form-button_disabled',
  inputErrorClass: 'popup__form-input_type_error'
}

export {editButton, editPopupSelector, editFormElement, nameInput, aboutInput, profileNameSelector, profileAboutSelector, addFormElement, addButton, addPopupSelector, 
  elementsListSelector, viewPopupSelector, initialCards, formSettings}