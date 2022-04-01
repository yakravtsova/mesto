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
const viewPopup = document.querySelector('.popup_feature_view');
const viewCloseButton = document.querySelector('.popup__close-button_feature_view');
const elementTemplate = document.querySelector('.element__template').content;
const elementsList = document.querySelector('.elements__list');
const popupViewImage = document.querySelector('.popup__view-image');
const popupImageCaption = document.querySelector('.popup__image-caption');

function renderElement(card) {
  //функция возвращает одну новую карточку по шаблону, но не выводит её на страницу
  const element = elementTemplate.querySelector('.element').cloneNode(true);
  const elementImage = element.querySelector('.element__image');
  elementImage.src = card.link;
  elementImage.alt = card.name;
  element.querySelector('.element__title').textContent = card.name;
  //удаление карточки
  element.querySelector('.element__remove-button').addEventListener('click', () => element.remove());
  //лайк
  element.querySelector('.element__like-button').addEventListener('click', (evt) => evt.target.classList.toggle('element__like-button_active'));
  //просмотр фотографии
  elementImage.addEventListener('click', (evt) => {
    openPopup(viewPopup);
    popupViewImage.src = evt.target.src;
    popupViewImage.alt = evt.target.alt;
    popupImageCaption.textContent = evt.target.alt;
  })
  return element;
}
//создадим массив карточек
const elementsArray = initialCards.map(renderElement);
//размещаем исходные карточки на странице
elementsArray.forEach((item) => elementsList.append(item));
//сразу заполним форму редактирования профиля исходными данными пользователя
fillEditForm();

function openPopup(popup) {
  document.addEventListener('keydown', handleEscUp);
  popup.addEventListener('click', closePopupButtonOverlay);
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  document.removeEventListener('keydown', handleEscUp);
  popup.removeEventListener('click', closePopupButtonOverlay);
  popup.classList.remove('popup_opened');
}

function closePopupButtonOverlay(evt) {
  if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close-button')) {
    closePopup(evt.currentTarget);
  }
}

function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileAbout.textContent = aboutInput.value;
    closePopup(editPopup);
}

function handleAddingFormSubmit(evt) {
  evt.preventDefault();
  //создаём объект с названием достопримечательности и ссылкой на картинку
  const place = {
    name: addPlace.value,
    link: addImageLink.value
  };
  //создаём и сразу выводим новую карточку на страницу в начало списка карточек
  elementsList.prepend(renderElement(place));
  closePopup(addPopup);
  //очищаем форму
  addFormElement.reset();
  addSaveButton.classList.add('popup__form-button_disabled');
  addSaveButton.disabled = true;
}

function fillEditForm() {
  nameInput.value = profileName.textContent;
  aboutInput.value = profileAbout.textContent;
}

function handleEscUp(evt) {
  if (evt.key === 'Escape') {
    const activePopup = document.querySelector('.popup_opened');
    closePopup(activePopup);
  }
}

editButton.addEventListener('click', () => {
    fillEditForm();
    openPopup(editPopup);
});

addButton.addEventListener('click', () => openPopup(addPopup));

editFormElement.addEventListener('submit', handleProfileFormSubmit);
addFormElement.addEventListener('submit', handleAddingFormSubmit);


  