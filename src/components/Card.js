import { cards } from "../index.js";

//функция обработчика лайка
function toggleLikeButton(evt) {
    evt.target.classList.toggle('element__like_active');
};

//слушатель обработчика лайка
 export function likeCardEventListener(element) {
  element.querySelector('.element__like').addEventListener('click', toggleLikeButton);
}

//функция удаления карточек
export function deleteCard(evt) {
    const item = evt.target.closest('.element');
    item.remove();
};

//слушатель удаления карточек
export function deleteCardEventListener(element) {
  element.querySelector('.element__delete').addEventListener('click', deleteCard)
};

//функция создания карточки при загрузке страницы
export function createCard(item, deleteCardEventListener, likeCardEventListener, showImage) {
    const elementTemplate = document.querySelector('#element-template').content;
    const cardElement = elementTemplate.querySelector('.element').cloneNode(true);
    const imageCardElement = cardElement.querySelector('.element__image');
    cardElement.querySelector('.element__title').textContent = item.name;
    imageCardElement.src = item.link;
    imageCardElement.alt = item.name;
    cards.prepend(cardElement); 
    likeCardEventListener(cardElement);
    deleteCardEventListener(cardElement);
    imageCardElement.addEventListener('click', () => {
      showImage(item.name, item.link);
    });
    return cardElement;
  };  