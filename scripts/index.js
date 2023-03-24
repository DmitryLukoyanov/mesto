//>>>>>>>>> Объявление переменных в глобальной области видимости
const templateCard = document.querySelector('.template__card').content;
const elementsList = document.querySelector('.elements__list');
const popupImage = document.querySelector('.lightbox-popup');
const popupImageCloseButton = popupImage.querySelector('.popup__close-btn');
const popupImageLink = popupImage.querySelector('.popup__image');
const popupImageCaption = popupImage.querySelector('.popup__image-caption');

//>>>>>>>>>>>>>> Добавить карточку нового места
function uploadInitialCards(item/*, toBegin*/) {
  const templateCardGallery = templateCard.cloneNode(true);
  const imageLinkTemplateCard = templateCardGallery.querySelector('.elements__img').src = item.link;
  const imageAltTemplateCard = templateCardGallery.querySelector('.elements__img').alt;
  const titleTemplateCard = templateCardGallery.querySelector('.elements__title').textContent = item.name;

  // //>>>>>>>>>>>> Добавление лайка
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
  /*popupImageLink.setAttribute('alt', 'Картинка');*/

  popupImageOpenButton.addEventListener('click', function() {
    popupImageCaption.textContent = titleTemplateCard;
    popupImageLink.src = imageLinkTemplateCard;
    popupImageLink.alt = imageAltTemplateCard;
    openPopup(popupImage);
  })

  return templateCardGallery;
}

popupImageCloseButton.addEventListener('click', function() {
    closePopup(popupImage);
  });

initialCards.forEach(function(item) {
  const cardList = uploadInitialCards(item);
  elementsList.append(cardList);
});

// >>>>>>>>>>>>>>>> Функции открытия закрытия формы
function openPopup(popUpToOpen) {
    popUpToOpen.classList.add('popup_opened');
  };

function closePopup(popUpToClose) {
  popUpToClose.classList.remove('popup_opened');
}

// >>>>>>>>>>>>>>>>  Попап редактирования профиля
const popupEditProfile = document.querySelector('.editProfile-popup');
const buttonCloseEditProfile = popupEditProfile.querySelector('.popup__close-btn');
const buttonOpenEditProfile = document.querySelector('.profile-info__edit-btn');

buttonOpenEditProfile.addEventListener('click', function(){
  nameInput.value = nameProfileInfo.textContent;
  descriptionInput.value = descriptionProfileInfo.textContent;
  openPopup(popupEditProfile);
});
buttonCloseEditProfile.addEventListener('click', function() {
  closePopup(popupEditProfile);
});

// Поля ФОРМЫ редактирования профиля
const formElement = popupEditProfile.querySelector('.edit-form');
const nameProfileInfo = document.querySelector('.profile-info__title');
const descriptionProfileInfo = document.querySelector('.profile-info__description');
const nameInput = formElement.querySelector('.edit-form__input_type_name');
const descriptionInput = formElement.querySelector('.edit-form__input_type_description');

// Записать значения из полей формы в заголовки страницы (при клике)
function handleFormSubmit (e) {
  e.preventDefault();
  nameProfileInfo.textContent = nameInput.value;
  descriptionProfileInfo.textContent = descriptionInput.value;
  closePopup(popupEditProfile);
}
formElement.addEventListener('submit', handleFormSubmit);

//  >>>>>>>>>>>>>>>> Поля формы добавления карточки места
const popupNewCard = document.querySelector('.addCard-popup');
const popupNewCardCloseButton = popupNewCard.querySelector('.popup__close-btn');
const popupNewCardOpenButton = document.querySelector('.profile__add-card-btn');
const cardName = document.querySelector('.edit-form__input_card_name');
const cardLink = document.querySelector('edit-form__input_card_link');

popupNewCardOpenButton.addEventListener('click', function() {
  openPopup(popupNewCard);
});

popupNewCardCloseButton.addEventListener('click', function() {
  closePopup(popupNewCard);
})

// Поля формы добавления карточки места
const formCard = popupNewCard.querySelector('.edit-form');
const cardNameInput = formCard.querySelector('.edit-form__input_card_name');
const cardLinkInput = formCard.querySelector('.edit-form__input_card_link');

// >>>>>> Функция добавдения новой карточки
function addNewCardPlace(e) {
  e.preventDefault();

  const newCard = uploadInitialCards({
    name: cardNameInput.value,
    link: cardLinkInput.value
  })

  elementsList.prepend(newCard);
  closePopup(popupNewCard);
  e.target.reset();
}
formCard.addEventListener('submit', addNewCardPlace);
