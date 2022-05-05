import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  open({name, link}) {
    const popupViewImage = document.querySelector('.popup__view-image');
    popupViewImage.src = link;
    popupViewImage.alt = name;
    document.querySelector('.popup__image-caption').textContent = name;
    super.open();
  }
}