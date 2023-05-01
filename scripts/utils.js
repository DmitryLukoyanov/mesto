const popupImage = document.querySelector('.lightbox-popup');
const popupImageCloseButton = popupImage.querySelector('.popup__close-btn');
const popupImageLink = popupImage.querySelector('.popup__image');
const popupImageCaption = popupImage.querySelector('.popup__image-caption');

//>>>>>>>>>>>>> Функции открытия и закрытия попапов
function openPopup(popUpToOpen) {
  popUpToOpen.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupByEsc);
  popUpToOpen.addEventListener('click', closePopupOverlay);
};

function closePopup(popUpToClose) {
  popUpToClose.classList.remove('popup_opened');
  popUpToClose.removeEventListener('click', closePopupOverlay);
  document.removeEventListener('keydown', closePopupByEsc);
};

//>>>>>>> Закрытие попапа кнопкой ESC
function closePopupByEsc(evt) {
  if (evt.key === 'Escape') {
    const popupActive = document.querySelector('.popup_opened');
    closePopup(popupActive);
  }
};

//>>>>>>>>> Закрытие попапа кликом на оверлей
const closePopupOverlay = (evt) => {
  if (evt.target === evt.currentTarget) {
    closePopup(evt.currentTarget);
  };
};

export {openPopup, closePopup, closePopupByEsc, closePopupOverlay};
