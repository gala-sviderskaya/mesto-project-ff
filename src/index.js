import './index.css';
import {createCardElement, deleteCard, isLiked, togglelikeCard, updateLikeCounts} from './components/card.js';
import {openPopup, closePopup} from './components/modal.js';
import {enableValidation, clearValidation } from './components/validation.js';
import {baseApi} from './components/api.js';

const popups = document.querySelectorAll('.popup');
const popupProfile = document.querySelector('.popup_type_edit');
const profileEditBtn = document.querySelector('.profile__edit-button');
const profileAddBtn = document.querySelector('.profile__add-button');
const formProfile = document.querySelector('[name="edit-profile"]');
const inputProfileName = formProfile.querySelector('.popup__input_type_name');
const inputProfileDesc = formProfile.querySelector('.popup__input_type_description');
const profileTitle = document.querySelector('.profile__title');
const profileDesc = document.querySelector('.profile__description');
const profileImage = document.querySelector('.profile__image');
const profileSubmitBtn = formProfile.querySelector('.popup__button');

const popupAddCard = document.querySelector('.popup_type_new-card');
const popupAvatar = document.querySelector('.popup_avatar');
const formAvatar = document.querySelector('[name="avatar"]');
const avatarSubmitBtn = formAvatar.querySelector('.popup__button');
const inputAvatarUrl = formAvatar.querySelector('.popup__input_type_avatar');


const placeList  = document.querySelector('.places__list');
const popupCardImage = document.querySelector('.popup_type_image');
const popupImage = popupCardImage.querySelector('.popup__image');
const popupImageCaption = popupCardImage.querySelector('.popup__caption');

const formPlace = document.querySelector('[name="new-place"]');
const placeName = document.querySelector('.popup__input_type_card-name');
const linkPlace = document.querySelector('.popup__input_type_url');
const placeSubmitBtn = formPlace.querySelector('.popup__button');

const popupConfirm = document.querySelector('.popup_confirm_deletion');
const formConfirm = document.querySelector('[name="confirm_deletion"]');

export const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

export function openImagePopup(objImg) {
  popupImage.src = objImg.link;
  popupImage.alt = objImg.name;
  popupImageCaption.textContent = objImg.name;
  openPopup(popupCardImage);
}

popups.forEach((popup) => {
  const closeButton = popup.querySelector('.popup__close');
  closeButton.addEventListener('click', () => closePopup(popup));
  popup.addEventListener('mousedown', (event) => {
    if (event.target === event.currentTarget) {
      closePopup(popup);
    } // Устанавливаем слушатель оверлея
  });
  popup.classList.add('popup_is-animated');
});

profileEditBtn.addEventListener('click', () => {
  inputProfileName.value = profileTitle.textContent;
  inputProfileDesc.value = profileDesc.textContent;
  openPopup(popupProfile);
  profileSubmitBtn.textContent = 'Сохранить';
  clearValidation(formProfile, validationConfig);
});

profileAddBtn.addEventListener('click', () => {
  openPopup(popupAddCard);
  formPlace.reset();
  clearValidation(formPlace, validationConfig);
  placeSubmitBtn.textContent = 'Сохранить';
});

profileImage.addEventListener('click', () => {
  openPopup(popupAvatar);
  formAvatar.reset();
  clearValidation(formAvatar, validationConfig);
  avatarSubmitBtn.textContent = 'Сохранить';
})



function submitAvatarForm(popup, evt) {
    evt.preventDefault();
    baseApi.updateAvatar({
      avatar: inputAvatarUrl.value
    }).then ((avatarData) => {
      profileImage.setAttribute('style', `background-image: url(${avatarData.avatar})`);
      closePopup(popup);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      avatarSubmitBtn.textContent = 'Сохранение...';
    });
}

formAvatar.addEventListener('submit', (evt) => submitAvatarForm(popupAvatar, evt));

const submitConfirmForm = (id, cardElement, evt) => {
  evt.preventDefault();
  baseApi.deleteCard(id)
  .then(() => {
    deleteCard(cardElement);
    closePopup(popupConfirm);
  })
  .catch((err) => {
    console.log(err);
  });
}

function submitProfileForm(popup, evt) {
    evt.preventDefault();
    baseApi.updateProfile({
      name: inputProfileName.value,
      about: inputProfileDesc.value
    }).then ((userInfoObject) => {
      profileTitle.textContent = userInfoObject.name;
      profileDesc.textContent = userInfoObject.about;
      closePopup(popup);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      profileSubmitBtn.textContent = 'Сохранение...';
    });
}

formProfile.addEventListener('submit', (evt) => submitProfileForm(popupProfile, evt));

function submitPlaceForm(popup, evt) {
  evt.preventDefault();
  const place = {
    name: placeName.value,
    link: linkPlace.value,
    likes: []
  }
  baseApi.createCard(place)
    .then((newCardData) => {
      const profileID = newCardData.owner._id;
      placeList.prepend(renderCard(newCardData,profileID));
      closePopup(popup);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      placeSubmitBtn.textContent = 'Сохранение...';
    })
}

formPlace.addEventListener('submit', (evt) => submitPlaceForm(popupAddCard, evt));
enableValidation(validationConfig);

const renderCard = (cardData,profileID) => {
  //placeList.append(
    return createCardElement(
      cardData,
      {
        handleDeleteCard: (id, cardElement) => {
          openPopup(popupConfirm);
          formConfirm.addEventListener('submit', (evt) => submitConfirmForm(id, cardElement, evt));
        },
        handleLikeCard: (cardElement, cardData) => {
          if(!isLiked(cardElement)) {
            baseApi.setLike(cardData._id)
            .then((cardObj) => {
              togglelikeCard(cardElement);
              updateLikeCounts(cardElement, cardObj);
            })
            .catch((err) => {
              console.log(err);
            })
          } else {
            baseApi.delLike(cardData._id)
            .then((cardObj) => {
              togglelikeCard(cardElement);
             updateLikeCounts(cardElement, cardObj);
            })
            .catch((err) => {
              console.log(err);
            })
          }
        },
        handleClickCard: (cardData) => {
          openImagePopup(cardData);
        },
        profileID
      })
  //);
}

Promise.all([baseApi.getUserInfo(), baseApi.getListCards()])
.then(([userData, listCards]) => {
  profileTitle.textContent = userData.name;
  profileDesc.textContent = userData.about;
  profileImage.setAttribute('style', `background-image: url(${userData.avatar})`);
  const profileID = userData._id
  listCards.forEach((cardData) => {
    placeList.append(renderCard(cardData,profileID));
  });
})
.catch((err) => {
  console.log(err);
});










