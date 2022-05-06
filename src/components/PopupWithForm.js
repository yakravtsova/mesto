import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor({selector, handleFormSubmit}) {
    super(selector);
    this._handleFormSubmit = handleFormSubmit;
  }

  _getInputValues() {
    const data = {};
    this._inputList.forEach(input => {
      data[input.name] = input.value;
    });
    return data;
  }

  setEventListeners() {
    super.setEventListeners();
    this._inputList = Array.from(this._popup.querySelectorAll('.popup__form-input'));
    this._form = this._popup.querySelector('.popup__form');
    this._form.addEventListener('submit', (evt, info) => {
      this._handleFormSubmit(evt, this._getInputValues());
    });
  }

  setInputValues(data) {
    this._inputList.forEach(input => {
      input.value = data[input.name];
    });
  }

  close() {
    super.close();
    this._form.reset();
  }
}