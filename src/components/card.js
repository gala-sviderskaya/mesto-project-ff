
// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content; //что будем вставлять

export const isLiked = (cardElement) => {
  const cardLikeBtn = cardElement.querySelector('.card__like-button');
  return cardLikeBtn.classList.contains('card__like-button_is-active');
}

// @todo: Функция удаления карточки
export function deleteCard(card) {
  card.remove();
}

export function togglelikeCard(card) {
  const cardLikeBtn = card.querySelector('.card__like-button');
  cardLikeBtn.classList.toggle('card__like-button_is-active');
}

export function updateLikeCounts(card, cardObj) {
  const cardLikesCount = card.querySelector('.card__likes-count');
  cardLikesCount.textContent = cardObj.likes.length;
}

// @todo: Функция создания карточки
export  function createCardElement (
  cardData,
  { onDeleteCard, handleLikeCard, handleClickCard, profileID }
)
{
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true); // клонируем
  const cardImage = cardElement.querySelector('.card__image');
  const cardLikesCount = cardElement.querySelector('.card__likes-count');
  const removeButton = cardElement.querySelector('.card__delete-button');
  const cardLikeBtn = cardElement.querySelector('.card__like-button');

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardElement.querySelector('.card__title').textContent = cardData.name;

  if (cardData.likes.some(like => like._id == profileID)) {
    cardLikeBtn.classList.add('card__like-button_is-active');
  }

  if (cardData.likes === undefined) {
    cardLikesCount.textContent = '0';
  } else {
    cardLikesCount.textContent = cardData.likes.length;
  }

  if(cardData.owner._id!==profileID) {
    cardElement.querySelector('.card__delete-button').disabled = true;
  }

  removeButton.addEventListener('click', () => {
    onDeleteCard(cardData._id, cardElement);
  });

  cardLikeBtn.addEventListener('click', () => {
     handleLikeCard(cardElement, cardData, profileID);
  });

  cardImage.addEventListener('click', () => {
    handleClickCard(cardData);
  });

  return cardElement;
}

