import { cards } from "../constants.js";
import { deleteNewCard, deleteLikeCard, putLikeCard } from "./api.js";

//функция обработчика лайка
export function toggleLikeButton(evt) {
  evt.target.classList.toggle('element__like_active');
};

//функция определения лайка пользователя
function likeUser(item, profileId) {
  return item.likes.some((item) => item._id === profileId);
};

//функция удаления карточек
export function deleteCard(evt) {
  const item = evt.target.closest('.element');
  item.remove();
};

//счетчик количества лайков
function countLike(element, item) {
  element.textContent = item.likes.length;
};

//функция создания карточки при загрузке страницы
export function createCard(item, deleteCard, showImage, profileId, toggleLikeButton) {
  const elementTemplate = document.querySelector('#element-template').content;
  const cardElement = elementTemplate.querySelector('.element').cloneNode(true);
  const imageCardElement = cardElement.querySelector('.element__image');
  const buttonLike = cardElement.querySelector('.element__like');
  const sumLike = cardElement.querySelector('.element__like-count');
  const buttonDeleteCard = cardElement.querySelector('.element__delete');
  countLike(sumLike, item);
  cardElement.querySelector('.element__title').textContent = item.name;
  imageCardElement.src = item.link;
  imageCardElement.alt = item.name;
  cards.prepend(cardElement);
  
  if ((likeUser(item, profileId))) {
    buttonLike.classList.add('element__like_active');
  } else {
    buttonLike.classList.remove('element__like_active');
  }

  cardElement.querySelector('.element__like').addEventListener('click', (evt) => {
    if (likeUser(item, profileId)) {
      toggleLikeButton(evt);
      deleteLikeCard(item._id)
        .then((item) => {
          countLike(sumLike, item)
        });
    } else {
      toggleLikeButton(evt);
      putLikeCard(item._id)
        .then((item) => {
          countLike(sumLike, item)
        });
    };
  });
      
  if (profileId !== item.owner._id) {
    buttonDeleteCard.remove();
  } else {
    buttonDeleteCard.addEventListener("click", (evt) => {
      deleteNewCard(item._id);
      deleteCard(evt);
    });
  };
  
  imageCardElement.addEventListener('click', () => {
    showImage(item.name, item.link);
  });
  return cardElement;
};  