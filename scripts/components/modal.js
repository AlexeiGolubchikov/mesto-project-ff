import { closePopupPressEscape } from "../index.js";
//функция открытия модального окна
function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closePopupPressEscape);
};
  
//функция закрытия модального окна
function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closePopupPressEscape);
};

export {openPopup, closePopup};