
// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content; //что будем вставлять
// @todo: DOM узлы



// @todo: Функция удаления карточки
function deleteCard(card) {
  card.remove();
}

function likeCard(card) {
  card.classList.toggle('card__like-button_is-active');
}



// @todo: Функция создания карточки
function createCardElement(object, removeCardElement, likeCallback, openImageCallback) {
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true); // клонируем
  const cardImage = cardElement.querySelector('.card__image');
  cardImage.src = object.link;
  cardImage.alt = object.name;
  cardElement.querySelector('.card__title').textContent = object.name;
  const removeButton = cardElement.querySelector('.card__delete-button');
  const cardLikeBtn = cardElement.querySelector('.card__like-button');

  removeButton.addEventListener('click', () => {
    removeCardElement(cardElement);
  });

  cardLikeBtn.addEventListener('click', () => {
    likeCallback(cardLikeBtn);
  })

  cardImage.addEventListener('click', () => {
    openImageCallback(object);
  });

  return cardElement;
}

export {createCardElement, deleteCard, likeCard};
