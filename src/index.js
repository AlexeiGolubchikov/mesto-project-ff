import '../pages/index.css';
import {initialCards, validationConfig} from "./constants.js";
import {createCard, deleteCardEventListener, likeCardEventListener} from "./components/Card.js";
import { openPopup, closePopup,closePopupByClick } from "./components/modal.js";
import { enableValidation } from "./validation.js" ;
import { getInitialCards, getUserData } from './components/api.js';
const buttonEditProfile = document.querySelector('.profile__edit-button');
const buttonAddCard = document.querySelector('.profile__add-button');
const buttonEditAvatar = document.querySelector('.profile__avatar');
const popupEditProfile = document.querySelector('.popup_type_edit');
const popupAddCard = document.querySelector('.popup_type_add');
const popupEditAvatar = document.querySelector('.popup_type_edit-avatar');
const popupImageOfCard = document.querySelector('.popup_type_image');
const captionPopupImage = document.querySelector('.popup__caption');
const popupCard = document.querySelector('.popup__image');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
export const cards = document.querySelector('.elements');
const formEditProfile = document.forms.editProfile;
const formAddCard = document.forms.addCard;
const formEditAvatar = document.forms.editAvatar;
const formEditUrlAvatar = formEditAvatar.elements.addLinkAvatar;
const formEditName = formEditProfile.elements.name;
const formEditJob = formEditProfile.elements.job;
const formAddTitleCard = formAddCard.elements.addTitleCard;
const formAddLinkCard = formAddCard.elements.addLinkCard;

//закрытие модального окна через крестик или через клик на оверлей
const popups = document.querySelectorAll('.popup');
popups.forEach((popup) => {
  popup.addEventListener('mouseup', (evt) => {
    closePopupByClick(evt);
  });
});


//открытие формы редактирования профиля
buttonEditProfile.addEventListener('click', () => {
  openPopup(popupEditProfile);
  formEditName.value = profileName.textContent;
  formEditJob.value = profileJob.textContent;
});

//открытие формы добавления карточки
buttonAddCard.addEventListener('click', () => {
  openPopup(popupAddCard);
});

//открытие формы редактирования аватара
buttonEditAvatar.addEventListener('click', () => {
  openPopup(popupEditAvatar);
});

//функция изменения аватара пользователя
function saveNewAvatar(evt) {
  evt.preventDefault();
  const imageAvatar = document.querySelector('.profile__avatar');
  imageAvatar.src = formEditUrlAvatar.value;
  closePopup(popupEditAvatar);
  formEditAvatar.reset();
}
formEditAvatar.addEventListener('submit', saveNewAvatar);

//сохранение введенных данных в форму редактирования профиля
function saveNewDataProfile(evt) {
    evt.preventDefault();
    profileName.textContent = formEditName.value;
    profileJob.textContent = formEditJob.value;
    closePopup(popupEditProfile);
};
formEditProfile.addEventListener('submit', saveNewDataProfile);

// функция открытия попапа с картинкой
export function showImage(name, link) {
  captionPopupImage.textContent = name;
  popupCard.src = link;
  popupCard.alt = name;
  openPopup(popupImageOfCard);
}

//initialCards.forEach(function(item) {
//  const card = createCard(item, deleteCardEventListener, likeCardEventListener, showImage)
//  cards.append(card)
//});

//добавление новой карточки
function addCard(evt) {
  evt.preventDefault();
  const cardData = {
    name: formAddTitleCard.value,
    link: formAddLinkCard.value
  };
  createCard(cardData, deleteCardEventListener, likeCardEventListener, showImage)
  closePopup(popupAddCard);
  formAddCard.reset();
}
formAddCard.addEventListener('submit', addCard);

enableValidation(validationConfig);

getUserData()
  .then((result) => {
    buttonEditAvatar.src = result.avatar;
    profileName.textContent = result.name;
    profileJob.textContent = result.about;
  })
  .catch((err) => {
    console.log(err);
  });

getInitialCards()
  .then((result) => {
    result.forEach(function(item) {
      const card = createCard(item, deleteCardEventListener, likeCardEventListener, showImage)
      cards.append(card)
    });
  })
  .catch((err) => {
    console.log(err);
  }); 

