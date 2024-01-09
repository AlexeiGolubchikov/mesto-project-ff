import { deleteMyCard, deleteLikeCard, putLikeCard } from "./api.js";

//функция обработчика лайка
export function toggleLikeButton(evt) {
  evt.target.classList.toggle('element__like_active');
};

//функция определения лайка пользователя
function isLikedByUser(item, profileId) {
  return item.likes.some((item) => item._id === profileId);
};

//функция удаления карточек
export function deleteCard(evt) {
  const item = evt.target.closest('.element');
  item.remove();
};

//функция заполнения количества лайков
function fillLikesCount(element, item) {
  element.textContent = item.likes.length;
};

//функция создания карточки
export function createCard(item, deleteCard, showImage, profileId, toggleLikeButton) {
  const elementTemplate = document.querySelector('#element-template').content;
  const cardElement = elementTemplate.querySelector('.element').cloneNode(true);
  const imageCardElement = cardElement.querySelector('.element__image');
  const buttonLike = cardElement.querySelector('.element__like');
  const sumLike = cardElement.querySelector('.element__like-count');
  const buttonDeleteCard = cardElement.querySelector('.element__delete');
  fillLikesCount(sumLike, item);
  cardElement.querySelector('.element__title').textContent = item.name;
  imageCardElement.src = item.link;
  imageCardElement.alt = item.name;

  if ((isLikedByUser(item, profileId))) {
    buttonLike.classList.add('element__like_active');
  };
  
  cardElement.querySelector('.element__like').addEventListener('click', (evt) => {
    const isLiked = (buttonLike.classList.contains('element__like_active')) ? true : false;
    const likeMethod = isLiked ? deleteLikeCard : putLikeCard;
    likeMethod(item._id)
      .then((item) => {
        toggleLikeButton(evt);
        fillLikesCount(sumLike, item);
      })
      .catch((err) => 
        console.log(err)
      );
  });
  
  if (profileId !== item.owner._id) {
    buttonDeleteCard.remove();
  } else {
    buttonDeleteCard.addEventListener("click", (evt) => {
      deleteMyCard(item._id)
        .then(() => {
          deleteCard(evt);
        })
        .catch((err) =>
          console.log(err)
        );
    });
  };
  
  imageCardElement.addEventListener('click', () => {
    showImage(item.name, item.link);
  });
  return cardElement;
};  