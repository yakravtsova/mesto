const editButton = document.querySelector('.profile__edit-button');
const editPopupSelector = '.popup_feature_edit';
const editFormElement = document.querySelector('.popup__form_feature_edit');
const editSubmitButton = document.querySelector('.popup__edit-form-button');
const profileNameSelector = '.profile__name';
const profileAboutSelector = '.profile__about';
const profileAvatarSelector = '.profile__avatar';
const editAvatarPopupSelector = '.popup_feature_edit-avatar';
const editAvatarButton = document.querySelector('.profile__edit-avatar');
const editAvatarFormElement = document.querySelector('.popup__form_feature_edit-avatar');
const editAvatarSubmitButton = document.querySelector('.popup__edit-avatar-form-button');
const errorPopupSelector = '.popup_feature_error';
const addFormElement = document.querySelector('.popup__form_feature_add');
const addButton = document.querySelector('.profile__add-button');
const addCardSubmitButton = document.querySelector('.popup__add-form-button');
const deletePopupSelector = '.popup_feature_confirm';
const addPopupSelector = '.popup_feature_add';
const viewPopupSelector = '.popup_feature_view';
const elementsListSelector = '.elements__list';

const formSettings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__form-input',
  submitButtonSelector: '.popup__form-button',
  inactiveButtonClass: 'popup__form-button_disabled',
  inputErrorClass: 'popup__form-input_type_error'
}

export {editButton, editPopupSelector, editFormElement, editSubmitButton, profileNameSelector, profileAboutSelector, profileAvatarSelector, editAvatarPopupSelector, 
  editAvatarButton, editAvatarFormElement, editAvatarSubmitButton, errorPopupSelector, addFormElement, addButton, addCardSubmitButton, deletePopupSelector, addPopupSelector, 
  elementsListSelector, viewPopupSelector, formSettings}