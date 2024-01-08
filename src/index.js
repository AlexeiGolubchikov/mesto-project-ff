import '../pages/index.css';
import { createCard, deleteCard, toggleLikeButton } from "./components/Card.js";
import { openPopup, closePopup,closePopupByClick } from "./components/modal.js";
import { enableValidation } from "./validation.js" ;
import { editUserData, getInitialCards, getUserData, postNewCard, updateAvatar } from './components/api.js';
import {
  validationConfig, buttonEditProfile, buttonAddCard, buttonEditAvatar, popupEditProfile, popupAddCard, 
  popupEditAvatar, popupImageOfCard, captionPopupImage, popupCard, profileName, profileJob, cards, formEditProfile, 
  formAddCard, formEditAvatar, formEditUrlAvatar, formEditName, formEditJob, formAddTitleCard, formAddLinkCard
} from "./constants.js";
let profileId;

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

//сохранение введенных данных в форму редактирования профиля
function saveNewDataProfile(evt) {
    evt.preventDefault();
    renderLoading(true, formEditProfile);
    profileName.textContent = formEditName.value;
    profileJob.textContent = formEditJob.value;
    closePopup(popupEditProfile);
    editUserData(formEditName, formEditJob, formEditProfile);
};
formEditProfile.addEventListener('submit', saveNewDataProfile);

// функция открытия попапа с картинкой
export function showImage(name, link) {
  captionPopupImage.textContent = name;
  popupCard.src = link;
  popupCard.alt = name;
  openPopup(popupImageOfCard);
};

//функция процесса загрузки
export function renderLoading(isLoading, form) {
  const buttonSave = form.querySelector('.form__button');
  if (isLoading) {
    buttonSave.textContent = 'Сохранение...';
  } else {
    buttonSave.textContent = 'Сохранить';
  };
};

//функция добавления новой карточки
function addCard(evt) {
  evt.preventDefault();
  renderLoading(true, formAddCard);
  const cardData = {
    likes: [],
    name: formAddTitleCard.value,
    link: formAddLinkCard.value,
    owner: {
      _id: profileId
    }
  };
  postNewCard(formAddTitleCard, formAddLinkCard, formAddCard);
  createCard(cardData, deleteCard, showImage, profileId, toggleLikeButton);
  closePopup(popupAddCard);
  formAddCard.reset();
};
formAddCard.addEventListener('submit', addCard);

enableValidation(validationConfig);


Promise.all([getUserData(),getInitialCards()])
  .then(([userData, initialCards]) => {
    profileId = userData._id;
    profileName.textContent = userData.name;
    profileJob.textContent = userData.about;
    buttonEditAvatar.src = userData.avatar;
    initialCards.forEach(function(item) {
      const card = createCard(item, deleteCard, showImage, profileId, toggleLikeButton);
      cards.append(card);
    });
  })
  .catch((err) =>
    console.log(err)
  );

  //открытие формы редактирования аватара
buttonEditAvatar.addEventListener('click', () => {
  openPopup(popupEditAvatar);
});

//функция изменения аватара пользователя
function saveNewAvatar(evt) {
  evt.preventDefault();
  renderLoading(true, formEditAvatar)
  buttonEditAvatar.src = formEditUrlAvatar.value;
  updateAvatar(formEditUrlAvatar, formEditAvatar);
  closePopup(popupEditAvatar);
  formEditAvatar.reset();
};
formEditAvatar.addEventListener('submit', saveNewAvatar);