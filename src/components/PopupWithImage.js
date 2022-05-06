import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  open({name, link}) {
    this._popupViewImage.src = link;
    this._popupViewImage.alt = name;
    document.querySelector('.popup__image-caption').textContent = name;
    super.open();
  }
}