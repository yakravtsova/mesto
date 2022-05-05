export default class Popup {
  constructor (selector) {
    this._popup = document.querySelector(selector)
  }

  
  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  _closePopupButtonOverlay(evt) {
    if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close-button')) {
     this.close();
    }
  }

  setEventListeners() {
    document.addEventListener('keydown', evt => this._handleEscClose(evt));
    this._popup.addEventListener('click', evt => this._closePopupButtonOverlay(evt));
  }

  close() {
    document.removeEventListener('keydown', this._handleEscClose);
    this._popup.removeEventListener('click', this._closePopupButtonOverlay);
    this._popup.classList.remove('popup_opened');
  }

  open() {
    this._popup.classList.add('popup_opened');
  }
}