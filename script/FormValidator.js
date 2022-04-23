export default class FormValidator {
  constructor (formSettings, formElement) {
    this._formSelector = formSettings.formSelector;
    this._inputSelector = formSettings.inputSelector;
    this._submitButtonSelector = formSettings.submitButtonSelector;
    this._inactiveButtonClass = formSettings.inactiveButtonClass;
    this._inputErrorClass = formSettings.inputErrorClass;
    this._formElement = formElement;
  }

  _showInputError = (inputElement) => {
    //нашли поле с ошибкой
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    //добавили класс ошибки и вывели сообщение
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
  }
  
  _hideInputError = (inputElement) => {
    //нашли поле
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    //убрали класс ошибки и сообщение
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.textContent = '';
  }
  
  //проверка корректности поля ввода
  _checkInputValidity = (inputElement) => {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    }
    else {
      this._hideInputError(inputElement);
    };
  }
  
  //проверка на наличие невалидных полей. Если хоть одно поле с ошибкой, будет возвращено true
  _hasInvalidInput = () => {
    return this._inputElements.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }
  
  //если есть поля с ошибками, нужно сделать кнопку сабмита неактивной и добавить соответствующий класс, и наоборот
  _toggleButtonState = () => {
    if (this._hasInvalidInput()) {
      this._buttonElement.classList.add(this._inactiveButtonClass);
      this._buttonElement.disabled = true;
    }
    else {
      this._buttonElement.classList.remove(this._inactiveButtonClass);
      this._buttonElement.disabled = false;
    }
  }
  
  _setEventListeners = () => {
    //создали массивы полей ввода и кнопок формы
    this._inputElements = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);
    //уже перед первым вводом проверили поля формы на валидность, активировали или деактивировали кнопку сабмита
    this._toggleButtonState();
    //на каждое поле повесили слушателя ввода, который отслеживает валидность полей и следит за состоянием кнопки сабмита
    this._inputElements.forEach((inputElement) => {
      //this._inputElement = inputElement;
        inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }
  
  //нашли все формы в документе и на каждую повесили слушатели ввода
  enableValidation = () => {
    this._formElement.addEventListener('submit', evt => evt.preventDefault());
      this._setEventListeners();
  }
}