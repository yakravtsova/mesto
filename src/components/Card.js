export default class Card {

  constructor({data, handleCardClick}, selector) {
    this._name = data.name;
    this._link = data.link;
    this._handleCardClick = handleCardClick;
    this._selector = selector;
  }

  _getElement = () => {
    const cardElement = document.querySelector('.element__template').content.querySelector('.element').cloneNode(true);
    return cardElement;
  }


  _setEventListeners = () => {
    //удаление карточки
    this._element.querySelector('.element__remove-button').addEventListener('click', this._removeElement);
    //лайк
    this._element.querySelector('.element__like-button').addEventListener('click', evt => this._likeElement(evt));
    //просмотр
    this._element.querySelector('.element__image').addEventListener('click', () => {
      const item = {
        name: this._name,
        link: this._link
      };
      this._handleCardClick(item);
    });
  }

  _removeElement = () => {
    this._element.remove();
    this._element = null;
  }

  _likeElement = (evt) => {
    evt.target.classList.toggle('element__like-button_active');
  }

  generate = () => {
    this._element = this._getElement();
    const elementImg = this._element.querySelector('.element__image');
    elementImg.src = this._link;
    elementImg.alt = this._name;
    this._element.querySelector('.element__title').textContent = this._name;
    this._setEventListeners();
    return this._element;
  }
}