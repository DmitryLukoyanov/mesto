//>>>>>>>>> Объявление переменных в глобальной области видимости
const templateCard = document.querySelector('.template__card').content;
const elementsList = document.querySelector('.elements__list');
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
  const formInPopup = popUpToClose.querySelector(enableValidationConfig.formSelector);
  popUpToClose.classList.remove('popup_opened');
  popUpToClose.removeEventListener('click', closePopupOverlay);
  document.removeEventListener('keydown', closePopupByEsc);
};

//>>>>>>>>>>>>>> Добавить карточку нового места
function createCard(item) {
  const templateCardGallery = templateCard.cloneNode(true);
  const imageLinkTemplateCard = templateCardGallery.querySelector('.elements__img');
  const titleTemplateCard = templateCardGallery.querySelector('.elements__title');

  imageLinkTemplateCard.src = item.link;
  imageLinkTemplateCard.alt = item.name;
  titleTemplateCard.textContent = item.name;

  //>>>>>>>>>>>> Добавление лайка
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
  imageLinkTemplateCard.addEventListener('click', function() {
    popupImageCaption.textContent = item.name;
    popupImageLink.src = item.link;
    popupImageLink.alt = item.name;
    openPopup(popupImage);
  });
  return templateCardGallery;
};

popupImageCloseButton.addEventListener('click', function() {
    closePopup(popupImage);
  });

initialCards.forEach(function(item) {
    const cardList = createCard(item);
    elementsList.append(cardList);
});

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

//>>>>>>>>>>>  Попап редактирования профиля
const popupEditProfile = document.querySelector('.editProfile-popup');
const buttonCloseEditProfile = popupEditProfile.querySelector('.popup__close-btn');
const buttonOpenEditProfile = document.querySelector('.profile-info__edit-btn');

buttonOpenEditProfile.addEventListener('click', function() {
  cleaneErrorMessage(popupEditProfile);
  nameInput.value = nameProfileInfo.textContent;
  descriptionInput.value = descriptionProfileInfo.textContent;
  openPopup(popupEditProfile);
});
buttonCloseEditProfile.addEventListener('click', function() {
  closePopup(popupEditProfile);
});

//>>>>>>>>> Поля формы редактирования профиля
const formEditProfile = popupEditProfile.querySelector('.edit-form');
const nameProfileInfo = document.querySelector('.profile-info__title');
const descriptionProfileInfo = document.querySelector('.profile-info__description');
const nameInput = formEditProfile.querySelector('.edit-form__input_type_name');
const descriptionInput = formEditProfile.querySelector('.edit-form__input_type_description');

//>>>>>>>>> Записать значения из полей формы в заголовки страницы (при клике)
function submitEditProfileForm (e) {
  e.preventDefault();
  nameProfileInfo.textContent = nameInput.value;
  descriptionProfileInfo.textContent = descriptionInput.value;
  closePopup(popupEditProfile);
};
formEditProfile.addEventListener('submit', submitEditProfileForm);

//>>>>>>>>>> Поля формы добавления карточки места
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

//>>>>>>> Поля формы добавления карточки места
const formCard = popupNewCard.querySelector('.edit-form');
const cardNameInput = formCard.querySelector('.edit-form__input_card_name');
const cardLinkInput = formCard.querySelector('.edit-form__input_card_link');

//>>>>>>> Функция добавдения новой карточки
function addNewCardPlace(e) {
  e.preventDefault();

  const newCard = createCard({
    name: cardNameInput.value,
    link: cardLinkInput.value
  })

  elementsList.prepend(newCard);
  closePopup(popupNewCard);
  e.target.reset();
};
formCard.addEventListener('submit', addNewCardPlace);
