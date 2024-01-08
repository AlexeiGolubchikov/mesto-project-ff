//функция закрытия модального окна через нажатие на клавишу Escape
function closePopupPressEscape(evt) {
    if (evt.key === "Escape") {
      const openedPopup = document.querySelector('.popup_opened');
      closePopup(openedPopup);
    };
  };

//функция закрытия модального окна через крестик или через клик на оверлей
export const closePopupByClick = evt => {
    if (evt.target.classList.contains('popup_opened') || evt.target.classList.contains('popup__close')) { 
       closePopup(evt.currentTarget); 
     }; 
};

//функция открытия модального окна
export function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closePopupPressEscape);
};
  
//функция закрытия модального окна
export function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closePopupPressEscape);
};