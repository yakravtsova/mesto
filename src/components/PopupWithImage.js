import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);
    this._popupViewImage = this._popup.querySelector('.popup__view-image');
    this._popupImageCaption = this._popup.querySelector('.popup__image-caption');
  }
  open({name, link}) {
    this._popupViewImage.src = link;
    this._popupViewImage.alt = name;
    this._popupImageCaption.textContent = name;
    super.open();
  }
}