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
const addCloseButton = document.querySelector('.popup__close-button_feature_add');
const addPlace = document.querySelector('.popup__form-input_input_place');
const addImageLink = document.querySelector('.popup__form-input_input_image-link');
const viewPopup = document.querySelector('.popup_feature_view');
const viewCloseButton = document.querySelector('.popup__close-button_feature_view');
const elementTemplate = document.querySelector('.element__template').content;
const elementsList = document.querySelector('.elements__list');
const removeButton = document.querySelector('.element__remove-button');
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

function renderElement(card) {
  //функция возвращает одну новую карточку по шаблону, но не выводит её на страницу
  const element = elementTemplate.querySelector('.element').cloneNode(true);
  element.querySelector('.element__image').src = card.link;
  element.querySelector('.element__title').textContent = card.name;
  element.querySelector('.element__image').alt = card.name;
  return element;
}
//создадим массив карточек
const elementsArray = initialCards.map(renderElement);
//размещаем исходные карточки на странице
elementsArray.forEach((item) => elementsList.append(item));

function openPopupHandler(popup) {
    popup.classList.add('popup_opened');
}

function closePopupHandler(popup) {
  popup.classList.remove('popup_opened');
}

function editFormSubmitHandler(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileAbout.textContent = aboutInput.value;
    closePopupHandler(editPopup);
}

function addFormSubmitHandler(evt) {
  evt.preventDefault();
  //создаём объект с названием достопримечательности и ссылкой на картинку
  let place = {};
  place.name = addPlace.value;
  place.link = addImageLink.value;
  //создаём и сразу выводим новую карточку на страницу в начало списка карточек
  elementsList.prepend(renderElement(place));
  closePopupHandler(addPopup);
}

editButton.addEventListener('click', function() {
    openPopupHandler(editPopup);
    //при открытии попапа редактирования профиля поля формы заняты исходными данными пользователя
    nameInput.value = profileName.textContent;
    aboutInput.value = profileAbout.textContent;
});

addButton.addEventListener('click', () => {
  openPopupHandler(addPopup);
  //при открытии попапа добавления карточки поля формы пустые
  addPlace.value = '';
  addImageLink.value = '';
});

editCloseButton.addEventListener('click', () => closePopupHandler(editPopup));
addCloseButton.addEventListener('click', () => closePopupHandler(addPopup));
viewCloseButton.addEventListener('click', () => closePopupHandler(viewPopup));

editFormElement.addEventListener('submit', editFormSubmitHandler);
addFormElement.addEventListener('submit', addFormSubmitHandler);
//обработчик событий для контейнера с карточками
document.querySelector('.elements').addEventListener('click', (evt) => {
  const element = evt.target.closest('.element');
  if (!element) {
    return;
  }
  //удаление карточки
  if (evt.target.classList.contains('element__remove-button')) {
    element.remove();
  }
  //лайк
  else if (evt.target.classList.contains('element__like-button')) {
    evt.target.classList.toggle('element__like-button_active');
  }
  //просмотр фотографии
  else if (evt.target.classList.contains('element__image')) {
    openPopupHandler(viewPopup);
    document.querySelector('.popup__view-image').src = element.querySelector('.element__image').src;
    document.querySelector('.popup__view-image').alt = element.querySelector('.element__title').textContent;
    document.querySelector('.popup__image-caption').textContent = element.querySelector('.element__title').textContent;
  }
});

  