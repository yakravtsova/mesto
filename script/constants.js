const editFormElement = document.querySelector('.popup__form_feature_edit');
const editButton = document.querySelector('.profile__edit-button');
const editPopup = document.querySelector('.popup_feature_edit');
const editCloseButton = document.querySelector('.popup__close-button_feature_edit');
const nameInput = document.querySelector('.popup__form-input_input_username');
const aboutInput = document.querySelector('.popup__form-input_input_about');
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');
const addFormElement = document.querySelector('.popup__form_feature_add');
const addButton = document.querySelector('.profile__add-button');
const addPopup = document.querySelector('.popup_feature_add');
const addSaveButton = document.querySelector('.popup__add-form-button');
const addCloseButton = document.querySelector('.popup__close-button_feature_add');
const addPlace = document.querySelector('.popup__form-input_input_place');
const addImageLink = document.querySelector('.popup__form-input_input_image-link');
const viewCloseButton = document.querySelector('.popup__close-button_feature_view');
const elementTemplate = document.querySelector('.element__template').content;
const elementsList = document.querySelector('.elements__list');

const formSettings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__form-input',
  submitButtonSelector: '.popup__form-button',
  inactiveButtonClass: 'popup__form-button_disabled',
  inputErrorClass: 'popup__form-input_type_error'
}

export {editFormElement, editButton, editPopup, editCloseButton, nameInput, aboutInput, profileName, profileAbout, addFormElement, addButton, addPopup, addSaveButton,
addCloseButton, addPlace, addImageLink, viewCloseButton, elementTemplate, elementsList, formSettings}