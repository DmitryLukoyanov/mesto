//>>>>>>>>> Объявление переменных в глобальной области видимости
const templateCard = document.querySelector('.template__card').content;
const elementsList = document.querySelector('.elements__list');
const popupImage = document.querySelector('.lightbox-popup');
const popupImageCloseButton = popupImage.querySelector('.popup__close-btn');
const popupImageLink = popupImage.querySelector('.popup__image');
const popupImageCaption = popupImage.querySelector('.popup__image-caption');

// >>>>>>>>>>>>>>>> Функции открытия и закрытия попапов
function openPopup(popUpToOpen, needToClear) {
  popUpToOpen.classList.add('popup_opened');
  document.addEventListener('keydown', (evt)=>{
      closePopupByEsc(evt, needToClear);
    });
  popUpToOpen.addEventListener('click', closePopupOverlay);
};

function closePopup(popUpToClose, needToClear) {
  const formInPopup = popUpToClose.querySelector(enableValidationConfig.formSelector);
  if(needToClear) {
    cardNameInput.value = '';
    cardLinkInput.value = '';
  };

  cleaneErrorMessage(formInPopup);
  popUpToClose.classList.remove('popup_opened');
  popUpToClose.removeEventListener('click', closePopupOverlay);
};

//>>>>>>>>>>>>>> Добавить карточку нового места
function createCard(item) {
  const templateCardGallery = templateCard.cloneNode(true);
  const imageLinkTemplateCard = templateCardGallery.querySelector('.elements__img').src = item.link;
  const imageAltTemplateCard = templateCardGallery.querySelector('.elements__img').alt;
  const titleTemplateCard = templateCardGallery.querySelector('.elements__title').textContent = item.name;

  ////>>>>>>>>>>>> Добавление лайка
  const buttonLikeCard = templateCardGallery.querySelector('.elements__like');
    buttonLikeCard.addEventListener('click', function (e) {
    buttonLikeCard.classList.toggle('elements__like_active');
  });

  //>>>>>>>>>>> Удаление карточки
  const buttonDeleteCard = templateCardGallery.querySelector('.elements__delete');
  buttonDeleteCard.addEventListener('click', function() {
    const cardItem = buttonDeleteCard.closest('.elements__card');
    cardItem.remove();
  })

  //>>>>>>>>> Попап с увеличенной картинкой
  const popupImageOpenButton = templateCardGallery.querySelector('.elements__img');
  popupImageOpenButton.addEventListener('click', function() {
    popupImageCaption.textContent = titleTemplateCard;
    popupImageLink.src = imageLinkTemplateCard;
    popupImageLink.alt = imageAltTemplateCard;
    openPopup(popupImage);
  })
  return templateCardGallery;
};

popupImageCloseButton.addEventListener('click', function() {
    closePopup(popupImage);
  });

initialCards.forEach(function(item) {
  const cardList = createCard(item);
  elementsList.append(cardList);
});


// >>>>>>> Закрытие попапа кнопкой ESC
const closePopupByEsc = (evt, needToClear) => {
  const popupActive = document.querySelector('.popup_opened');
  const isPopupOpened = (evt.key === 'Escape') && popupActive && popupActive.classList.contains('popup_opened')

  if (isPopupOpened) {
    closePopup(popupActive, needToClear);
  };
};

// >>>>>>>>>> Закрытие попапа кликом на оверлей
const closePopupOverlay = (evt) => {
  if (evt.target === evt.currentTarget) {
    const popupActive = document.querySelector('.popup_opened');
    closePopup(popupActive);
  }
};

// >>>>>>>>>>>>>>>>  Попап редактирования профиля
const popupEditProfile = document.querySelector('.editProfile-popup');
const buttonCloseEditProfile = popupEditProfile.querySelector('.popup__close-btn');
const buttonOpenEditProfile = document.querySelector('.profile-info__edit-btn');

buttonOpenEditProfile.addEventListener('click', function() {
  //cleaneErrorMessage();
  nameInput.value = nameProfileInfo.textContent;
  descriptionInput.value = descriptionProfileInfo.textContent;
  openPopup(popupEditProfile);
});
buttonCloseEditProfile.addEventListener('click', function() {
  closePopup(popupEditProfile);
});

// Поля формы редактирования профиля
const formEditProfile = popupEditProfile.querySelector('.edit-form');
const nameProfileInfo = document.querySelector('.profile-info__title');
const descriptionProfileInfo = document.querySelector('.profile-info__description');
const nameInput = formEditProfile.querySelector('.edit-form__input_type_name');
const descriptionInput = formEditProfile.querySelector('.edit-form__input_type_description');

// Записать значения из полей формы в заголовки страницы (при клике)
function submitEditProfileForm (e) {
  e.preventDefault();
  nameProfileInfo.textContent = nameInput.value;
  descriptionProfileInfo.textContent = descriptionInput.value;
  closePopup(popupEditProfile);
}
formEditProfile.addEventListener('submit', submitEditProfileForm);

//  >>>>>>>>>>>>>>>> Поля формы добавления карточки места
const popupNewCard = document.querySelector('.addCard-popup');
const popupNewCardCloseButton = popupNewCard.querySelector('.popup__close-btn');
const popupNewCardOpenButton = document.querySelector('.profile__add-card-btn');
const cardName = document.querySelector('.edit-form__input_card_name');
const cardLink = document.querySelector('edit-form__input_card_link');

popupNewCardOpenButton.addEventListener('click', function() {
  openPopup(popupNewCard, true);
});

popupNewCardCloseButton.addEventListener('click', function() {
  closePopup(popupNewCard, true);
});

// Поля формы добавления карточки места
const formCard = popupNewCard.querySelector('.edit-form');
const cardNameInput = formCard.querySelector('.edit-form__input_card_name');
const cardLinkInput = formCard.querySelector('.edit-form__input_card_link');

// >>>>>> Функция добавдения новой карточки
function addNewCardPlace(e) {
  e.preventDefault();

  const newCard = createCard({
    name: cardNameInput.value,
    link: cardLinkInput.value
  })

  elementsList.prepend(newCard);
  closePopup(popupNewCard);
  e.target.reset();

}
formCard.addEventListener('submit', addNewCardPlace);
