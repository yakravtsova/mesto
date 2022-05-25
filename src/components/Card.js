export default class Card {

  constructor({data, handleCardClick, handleLikeClick, handleDeleteIconClick}, selector) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._id = data._id;
    this._card = data;
    this._likes = data.likes;
    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._handleDeleteIconClick = handleDeleteIconClick;
    this._selector = selector;
  }

  _getElement = () => {
    const cardElement = document.querySelector(this._selector).content.querySelector('.element').cloneNode(true);
    return cardElement;
  }


  _setEventListeners = () => {
    //удаление карточки
    this._element.querySelector('.element__remove-button').addEventListener('click', () => this._handleDeleteIconClick(this._id));
    //лайк
    this._likeButton.addEventListener('click', evt => this._handleLikeClick(this._id, evt));
    //просмотр
    this._element.querySelector('.element__image').addEventListener('click', () => {
      const item = {
        name: this._name,
        link: this._link
      };
      this._handleCardClick(item);
    });
  }

  removeElement = () => {
    this._element.remove();
    this._element = null;
  }

  likeElement = (evt) => {
    evt.target.classList.toggle('element__like-button_active');
    
  }

  isLiked = (userId) => {
    if (this._likes) {
      const arrayOfId = this._likes.map(item => item._id);
      return arrayOfId.includes(userId)  
    }
    else return false
  }

  isOwner = (userId) => {
    return (this._card.owner._id === userId)
  }

  likeQuantity = (likes) => {
    this._likes = likes;
    this._elementLikes.textContent = likes.length;
  }

  generate = (userId) => {
    this._element = this._getElement();
    const elementImg = this._element.querySelector('.element__image');
    elementImg.src = this._link;
    elementImg.alt = this._name;
    this._likeButton = this._element.querySelector('.element__like-button');
    if (this.isLiked(userId)) {
      this._likeButton.classList.add('element__like-button_active');
    }
    this._elementLikes = this._element.querySelector('.element__likes');    
    this._elementLikes.textContent = this._likes.length;
    if (!this.isOwner(userId)) {
      this._element.querySelector('.element__remove-button').classList.add('element__remove-button_passive');
    }
    this._element.querySelector('.element__title').textContent = this._name;
    this._setEventListeners();
    return this._element;
  }
}