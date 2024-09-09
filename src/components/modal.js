function keyHandler(evt) {
  if (evt.key === 'Escape') {
    const pOpened = document.querySelector('.popup_is-opened');
    if (pOpened) {
      pOpened.classList.remove('popup_is-opened');
    }
  }
}

function openPopup(element) {
  element.classList.add('popup_is-opened');
  document.addEventListener('keydown', keyHandler);
}

function clickOverlay(evt) {
  if (evt.target.closest('.popup') && evt.target.classList.contains('popup_is-opened')) {
    evt.target.classList.remove('popup_is-opened');
  }
}

function closePopup(evt) {
  const popupElement = evt.target.closest('.popup');
  if(popupElement || (evt.type === 'submit')) {
    popupElement.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', keyHandler);
  }
}

export {openPopup, clickOverlay, closePopup};
