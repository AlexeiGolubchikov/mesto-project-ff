import { cards, showImage, captionPopupImage, popupCard } from "../index.js";

function toggleLikeButton(evt) {
    evt.target.classList.toggle('element__like_active');
};

//функция удаления карточек
function deleteCard(evt) {
    const item = evt.target.closest('.element');
    item.remove();
};

//функция создания карточки при загрузке страницы
export function createCard(item) {
    const elementTemplate = document.querySelector('#element-template').content;
    const cardElement = elementTemplate.querySelector('.element').cloneNode(true);
    const imageCardElement = cardElement.querySelector('.element__image');
    cardElement.querySelector('.element__title').textContent = item.name;
    imageCardElement.src = item.link;
    imageCardElement.alt = item.name;
    cards.prepend(cardElement);
    cardElement.querySelector('.element__like').addEventListener('click', toggleLikeButton);
    cardElement.querySelector('.element__delete').addEventListener('click', deleteCard);
    imageCardElement.addEventListener('click', () => {
      captionPopupImage.textContent = item.name;
      popupCard.src = item.link;
      popupCard.alt = item.name;
      showImage(item.name, item.link);
    });
    return cardElement;
  };