import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor({selector, handleFormSubmit}) {
    super(selector);
    this._handleFormSubmit = handleFormSubmit;
  }

  _getInputValues() {
    const inputs = Array.from(this._popup.querySelectorAll('.popup__form-input'));
    const data = {};
    inputs.forEach(input => {
      data[input.name] = input.value;
    });
    return data;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form = this._popup.querySelector('.popup__form');
    this._form.addEventListener('submit', evt => this._handleFormSubmit(evt));
  }

  close() {
    super.close();
    this._form.reset();
  }
}