const closePopup = (popup) => {
  document.removeEventListener('keydown', handleEscUp);
  popup.removeEventListener('click', closePopupButtonOverlay);
  popup.classList.remove('popup_opened');
}

const openPopup = (popup) => {
  document.addEventListener('keydown', handleEscUp);
  popup.addEventListener('click', closePopupButtonOverlay);
  popup.classList.add('popup_opened');
}

const handleEscUp = (evt) => {
  if (evt.key === 'Escape') {
    const activePopup = document.querySelector('.popup_opened');
    closePopup(activePopup);
  }
}

const closePopupButtonOverlay = (evt) => {
  if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close-button')) {
    closePopup(evt.currentTarget);
  }
}

export {closePopup, openPopup}
