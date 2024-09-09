import './index.css'; // добавьте импорт главного файла стилей
import { initialCards } from './components/cards.js';
import {createCardElement, deleteCard, likeCard} from './components/card.js';
import {openPopup, closePopup} from './components/modal.js';

const popups = document.querySelectorAll('.popup');
const popupProfile = document.querySelector('.popup_type_edit');
const profileEditBtn = document.querySelector('.profile__edit-button');
const profileAddBtn = document.querySelector('.profile__add-button');
const formProfile = document.forms["edit-profile"];
const profileTitle = document.querySelector('.profile__title');
const profileDesc = document.querySelector('.profile__description');
const popupAddCard = document.querySelector('.popup_type_new-card');

const placeList  = document.querySelector('.places__list'); //куда будем вставлять
const popupCardImage = document.querySelector('.popup_type_image');
const popupImage = popupCardImage.querySelector('.popup__image');
const popupImageCaption = popupCardImage.querySelector('.popup__caption');

const formPlace = document.querySelector('[name="new-place"]');
const placeName = document.querySelector('.popup__input_type_card-name');
const linkPlace = document.querySelector('.popup__input_type_url');

function openImagePopup(objImg) {
  popupImage.src = objImg.link;
  popupImage.alt = objImg.name;
  popupImageCaption.textContent = objImg.name;
  openPopup(popupCardImage);
}

initialCards.forEach((elem) => {
  const card = createCardElement(elem, deleteCard, likeCard, openImagePopup);
  placeList.append(card);
})

popups.forEach((popup) => {
  const closeButton = popup.querySelector('.popup__close'); // Находим в попапе кнопку крестик
  closeButton.addEventListener('click', () => closePopup(popup)); // Устанавливаем слушатель на крестик
  popup.addEventListener('mousedown', (event) => {
    if (event.target === event.currentTarget) {
      closePopup(popup);
    } // Устанавливаем слушатель оверлея
  });
  popup.classList.add('popup_is-animated'); // Добавляем модификатор для плавного открытия и закрытия попапов
}
);

profileEditBtn.addEventListener('click', () => {
  openPopup(popupProfile);
  formProfile.elements.name.value = profileTitle.textContent;
  formProfile.elements.description.value = profileDesc.textContent;
});

profileAddBtn.addEventListener('click', () => openPopup(popupAddCard));

function submitProfileForm(popup, evt) {
    evt.preventDefault();
    profileTitle.textContent = formProfile.elements.name.value;
    profileDesc.textContent = formProfile.elements.description.value;
    closePopup(popup);
}

formProfile.addEventListener('submit', (evt) => submitProfileForm(popupProfile, evt));

function submitPlaceForm(popup, evt) {
  evt.preventDefault();
  const places = {
    name: placeName.value,
    link: linkPlace.value
  }
  const card = createCardElement(places, deleteCard, likeCard, openImagePopup);
  placeList.prepend(card);
  formPlace.reset();
  closePopup(popup);
}

formPlace.addEventListener('submit', (evt) => submitPlaceForm(popupAddCard, evt));













