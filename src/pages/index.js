import {editButton, editPopupSelector, editFormElement, editSubmitButton, profileNameSelector, profileAboutSelector, profileAvatarSelector, editAvatarPopupSelector, 
  editAvatarButton, editAvatarFormElement, editAvatarSubmitButton, errorPopupSelector, addFormElement, addButton, addCardSubmitButton, addPopupSelector, deletePopupSelector,
  elementsListSelector, viewPopupSelector, formSettings} from '../utils/constants.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithSubmit from '../components/PopupWithSubmit.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import './index.css';

const api = new Api(
  'https://mesto.nomoreparties.co/v1/cohort-41/',
  {
    authorization: 'b8aeb463-fbfe-4685-9e4b-4554e6130bfc',
    'Content-Type': 'application/json'
  }
);

const userInfo = new UserInfo(profileNameSelector, profileAboutSelector, profileAvatarSelector);

const viewPopup = new PopupWithImage(viewPopupSelector);
viewPopup.setEventListeners();

const errorPopup = new PopupWithSubmit(errorPopupSelector);
errorPopup.setSubmitAction(_ => {
  errorPopup.close()
});
errorPopup.setEventListeners();

const renderLoading = (isLoading, button) => {
  if (isLoading) {
    button.value = 'Сохранение...'
  }
  else {
    button.value = 'Сохранить'
  }
}

const editAvatarPopup = new PopupWithForm({
  selector: editAvatarPopupSelector,
  handleFormSubmit: (evt, avatar) => {
    evt.preventDefault();
    renderLoading(true, editAvatarSubmitButton);
    api.editAvatar(avatar)
    .then(data => {
      userInfo.setAvatar(data);
      editAvatarPopup.close();
    })
    .catch(err => {
      editAvatarPopup.close();
      errorPopup.open()
    })
    .finally(() => renderLoading(false, editAvatarSubmitButton));
  }
});
editAvatarPopup.setEventListeners();


api.getAllData()
.then(allData => {
  const [userData, allCardsData] = allData;

  const deleteCardPopup = new PopupWithSubmit(deletePopupSelector);
  deleteCardPopup.setEventListeners();

  //функция генерирует разметку карточки
  const getCard = (item) => {
    const card = new Card({
      data: item,
      handleCardClick: item => viewPopup.open(item),
      handleLikeClick: (cardId, evt) => {
        if (card.isLiked(userData._id)) {
          api.deleteLikeCard(cardId)
          .then(data => {
            card.likeElement(evt);
            card.likeQuantity(data.likes)
          })
          .catch(err => errorPopup.open())
        }
        else {
          api.likeCard(cardId)
          .then(data => {
            card.likeElement(evt);
            card.likeQuantity(data.likes)
          })
          .catch(err => errorPopup.open())
        }
      },
      handleDeleteIconClick: cardId => {
        deleteCardPopup.setSubmitAction(_ => {
          api.deleteCard(cardId)
          .then(data => {
            card.removeElement();
            deleteCardPopup.close();
          })
          .catch(err => {
            deleteCardPopup.close();
            errorPopup.open()
          })
        });
        deleteCardPopup.open();
      }
    }, 
    '.element__template');
    return card.generate(userData._id);
  }

  //вывод всех карточек на страницу
  const cardList = new Section(
    {items: allCardsData,
    renderer: item => {
      const cardElement = getCard(item);
      cardList.setItemEnd(cardElement);
      }
    },
    elementsListSelector
  );
  //отрисовка секции на странице
  cardList.renderItems();

  

  //вывод на страницу информации о пользователе
  userInfo.setUserInfo(userData);
  userInfo.setAvatar(userData);
  
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
    handleFormSubmit: (evt, userData) => {
      evt.preventDefault();
      renderLoading(true, editSubmitButton);
      api.editUserData(userData)
      .then(data => {
        userInfo.setUserInfo(data);
        editPopup.close()
      })
      .catch(err => {
        editPopup.close();
        errorPopup.open()
      })
      .finally(() => renderLoading(false, editSubmitButton));
    }
  });
  editPopup.setEventListeners();

  //попап добавления карточки
  const addPopup = new PopupWithForm({
    selector: addPopupSelector,
    handleFormSubmit: (evt, place) => {
      evt.preventDefault();
      renderLoading(true, addCardSubmitButton);
      api.addCard(place)
      //создаём и сразу выводим новую карточку на страницу в начало списка карточек
      .then(data => {
        cardList.setItemStart(getCard(data));
        addPopup.close()
      })
      .catch(err => errorPopup.open())
      .finally(() => renderLoading(false, addCardSubmitButton));
    }
  });
  addPopup.setEventListeners();


  addButton.addEventListener('click', () => {
    formValidators[addFormElement.name].resetValidation();
    addPopup.open()
  });

  editAvatarButton.addEventListener('click', () => {
    formValidators[editAvatarFormElement.name].resetValidation();
    editAvatarPopup.open();
  });

  editButton.addEventListener('click', () => {
    formValidators[editFormElement.name].resetValidation();
    editPopup.setInputValues(userInfo.getUserInfo());
    editPopup.open();
  });
})
.catch(err => errorPopup.open());