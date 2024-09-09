import './index.css'; // добавьте импорт главного файла стилей
import { initialCards } from './components/cards.js';
import {createCardElement, deleteCard, likeCard} from './components/card.js';
import {openPopup, clickOverlay, closePopup} from './components/modal.js';

const overlayPopups = document.querySelectorAll('.popup');
const popupProfile = document.querySelector('.popup_type_edit');
const profileEditBtn = document.querySelector('.profile__edit-button');
const profileAddBtn = document.querySelector('.profile__add-button');
const formProfile = document.forms["edit-profile"];
const profileTitle = document.querySelector('.profile__title');
const profileDesc = document.querySelector('.profile__description');
const popupAddCard = document.querySelector('.popup_type_new-card');
const elementsArray = document.querySelectorAll('.popup__close');

const placeList  = document.querySelector('.places__list'); //куда будем вставлять
const popupCardImage = document.querySelector('.popup_type_image');
const popupImage = popupCardImage.querySelector('.popup__image');
const popupImageCaption = popupCardImage.querySelector('.popup__caption');

const formPlace = document.querySelector('[name="new-place"]');
const placeName = document.querySelector('.popup__input_type_card-name');
const linkPlace = document.querySelector('.popup__input_type_url');

function OpenImagePopup(objImg) {
  popupImage.src = objImg.link;
  popupImage.alt = objImg.name;
  popupImageCaption.textContent = objImg.name;
  openPopup(popupCardImage);
}

// @todo: Вывести карточки на страницу
initialCards.forEach((elem) => {
  const card = createCardElement(elem, deleteCard, likeCard, OpenImagePopup);
  placeList.append(card);
})

overlayPopups.forEach((item) => {
  item.addEventListener('click', clickOverlay);
}
);

profileEditBtn.addEventListener('click', () => {
  openPopup(popupProfile);
  formProfile.elements.name.value = profileTitle.textContent;
  formProfile.elements.description.value = profileDesc.textContent;
});

profileAddBtn.addEventListener('click', () => {
  openPopup(popupAddCard);
});

elementsArray.forEach((elem) => {
    elem.addEventListener('click', closePopup)
});

function SubmitProfileForm(evt) {
    evt.preventDefault();
    profileTitle.textContent = formProfile.elements.name.value;
    profileDesc.textContent = formProfile.elements.description.value;
    closePopup(evt);
}

formProfile.addEventListener('submit', SubmitProfileForm);

function SubmitPlaceForm(evt) {
  evt.preventDefault();
  const places = {
    name: placeName.value,
    link: linkPlace.value
  }
  const card = createCardElement(places, deleteCard, likeCard, OpenImagePopup);
  placeList.prepend(card);
  formPlace.reset();
  closePopup(evt);
}

formPlace.addEventListener('submit', SubmitPlaceForm);












