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
const cards = document.querySelector('.elements');
const formEditProfile = document.forms.editProfile;
const formAddCard = document.forms.addCard;
const formEditAvatar = document.forms.editAvatar;
const formEditUrlAvatar = formEditAvatar.elements.addLinkAvatar;
const formEditName = formEditProfile.elements.name;
const formEditJob = formEditProfile.elements.job;
const formAddTitleCard = formAddCard.elements.addTitleCard;
const formAddLinkCard = formAddCard.elements.addLinkCard;

const validationConfig = {
  formSelector: '.form',
  inputSelector: '.form__field',
  submitButtonSelector: '.form__button',
  inactiveButtonClass: 'form__button_inactive',
  inputErrorClass: 'form__field_type_error',
  errorClass: 'input-error_active'
};

export {
  validationConfig, buttonEditProfile, buttonAddCard, buttonEditAvatar, popupEditProfile, popupAddCard, 
  popupEditAvatar, popupImageOfCard, captionPopupImage, popupCard, profileName, profileJob, cards, formEditProfile, 
  formAddCard, formEditAvatar, formEditUrlAvatar, formEditName, formEditJob, formAddTitleCard, formAddLinkCard
};