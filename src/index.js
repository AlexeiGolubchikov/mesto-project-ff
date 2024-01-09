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

//сохранение введенных данных профиля
function saveNewDataProfile(evt) {
    evt.preventDefault();
    renderLoading(true, formEditProfile);
    editUserData(formEditName.value, formEditJob.value)
      .then((userData) => {
        profileName.textContent = userData.name;
        profileJob.textContent = userData.about;
        closePopup(popupEditProfile);
      })
      .catch((err) =>
            console.log(err)
      )
      .finally(() => {
        renderLoading(false, formEditProfile);
      });
};
formEditProfile.addEventListener('submit', saveNewDataProfile);

// функция открытия попапа с картинкой
export function showImage(name, link) {
  captionPopupImage.textContent = name;
  popupCard.src = link;
  popupCard.alt = name;
  openPopup(popupImageOfCard);
};

//функция уведомления пользователя о процессе загрузки
export function renderLoading(isLoading, form) {
  const buttonSave = form.querySelector('.form__button');
  buttonSave.textContent = isLoading ? 'Сохранение...' : 'Сохранить';
};

//функция добавления новой карточки
function addCard(evt) {
  evt.preventDefault();
  renderLoading(true, formAddCard);
  postNewCard(formAddTitleCard.value, formAddLinkCard.value)
    .then((cardData) => {
      cards.prepend(createCard(cardData, deleteCard, showImage, profileId, toggleLikeButton));
    })
    .catch((err) =>
      console.log(err)
    )
    .finally(() => {
      renderLoading(false, formAddCard);
    });
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
  updateAvatar(formEditUrlAvatar.value)
    .then((userData) => {
      buttonEditAvatar.src = userData.avatar;
    })
    .catch((err) =>
      console.log(err)
    )
    .finally(() => {
      renderLoading(false, formEditAvatar);
    });
  closePopup(popupEditAvatar);
  formEditAvatar.reset();
};
formEditAvatar.addEventListener('submit', saveNewAvatar);