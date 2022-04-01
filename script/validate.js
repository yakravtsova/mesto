const showInputError = (formElement, inputElement, errorMessage, inputErrorClass) => {
  //нашли поле с ошибкой
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  //добавили класс ошибки и вывели сообщение
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
}

const hideInputError = (formElement, inputElement, inputErrorClass) => {
  //нашли поле
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  //убрали класс ошибки и сообщение
  inputElement.classList.remove(inputErrorClass);
  errorElement.textContent = '';
}

//проверка корректности поля ввода
const checkInputValidity = (formElement, inputElement, {inputErrorClass}) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, inputErrorClass);
  }
  else {
    hideInputError(formElement, inputElement, inputErrorClass);
  };
}

//проверка на наличие невалидных полей. Если хоть одно поле с ошибкой, будет возвращено true
const hasInvalidInput = (inputElements) => {
  return inputElements.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

//если есть поля с ошибками, нужно сделать кнопку сабмита неактивной и добавить соответствующий класс, и наоборот
const toggleButtonState = (inputElements, buttonElement, inactiveButtonClass) => {
  if (hasInvalidInput(inputElements)) {
    buttonElement.classList.add(inactiveButtonClass);
    buttonElement.disabled = true;
  }
  else {
    buttonElement.classList.remove(inactiveButtonClass);
    buttonElement.disabled = false;
  }
}

const setEventListeners = (formElement, {inputSelector, submitButtonSelector, inactiveButtonClass, ...rest}) => {
  //создали массив полей ввода формы
  const inputElements = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(submitButtonSelector);
  //уже перед первым вводом проверили поля формы на валидность, активировали или деактивировали кнопку сабмита
  toggleButtonState(inputElements, buttonElement, inactiveButtonClass);
  //на каждое поле повесили слушателя ввода, который отслеживает валидность полей и следит за состоянием кнопки сабмита
  inputElements.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, rest);
      toggleButtonState(inputElements, buttonElement, inactiveButtonClass);
    });
  });
}

//нашли все формы в документе и на каждую повесили слушатели ввода
const enableValidation = ({formSelector, ...rest}) => {
  const formList = Array.from(document.querySelectorAll(formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', evt => 
      evt.preventDefault());
    setEventListeners(formElement, rest);
  });
}

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__form-input',
  submitButtonSelector: '.popup__form-button',
  inactiveButtonClass: 'popup__form-button_disabled',
  inputErrorClass: 'popup__form-input_type_error',
});