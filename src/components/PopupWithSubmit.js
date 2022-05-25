import Popup from './Popup.js';

export default class PopupWithSubmit extends Popup {

  setSubmitAction(submitAction) {
    this._handlePopupSubmit = submitAction;
  }

  setEventListeners() {
    super.setEventListeners();
    const submitButton = this._popup.querySelector('.popup__confirm-button');
    submitButton.addEventListener('click', evt => {
      evt.preventDefault();
      this._handlePopupSubmit();
    });
  }
}