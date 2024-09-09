function keyHandler(element, evt) {
  if (evt.key === 'Escape') {
    closePopup(element);
  }
}

function openPopup(element) {
  element.classList.add('popup_is-opened');
  document.addEventListener('keydown', (evt) => keyHandler(element, evt));
}

function closePopup(popup) {
  popup.classList.remove('popup_is-opened');
   document.removeEventListener('keydown', (evt) => keyHandler(popup, evt));
}

export {openPopup, closePopup};
