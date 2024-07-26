// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content; //что будем вставлять
// @todo: DOM узлы
const placeList  = document.querySelector('.places__list'); //куда будем вставлять
const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true); // клонируем

// @todo: Функция удаления карточки
function deleteCard(card) {
  card.remove();
}

// @todo: Функция создания карточки
function createCardElement(object, removeCardElement) {
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true); // клонируем
  cardElement.querySelector('.card__image').src = object.link;
  cardElement.querySelector('.card__image').alt = object.name;
  const removeButton = cardElement.querySelector('.card__delete-button');
  removeButton.addEventListener('click', () => {
    removeCardElement(cardElement);
  });

  return cardElement;
}

// @todo: Вывести карточки на страницу
initialCards.forEach((elem) => {
  const card = createCardElement(elem, deleteCard);
  placeList.append(card);
})








