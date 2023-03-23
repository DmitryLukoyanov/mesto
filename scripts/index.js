// >>>>>>>>>>>>>>>> Добавление карточек из массива initialCards
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const templateCard = document.querySelector('.template__card').content;
const elementsList = document.querySelector('.elements__list');

//>>>>>>>>>>>>>> Добавить карточку нового места
function addCard(item, toBegin) {
  const addTemplateCard = templateCard.cloneNode(true);
  const addElementsImageLink = addTemplateCard.querySelector('.elements__img').src = item.link;
  const addElementsTitle = addTemplateCard.querySelector('.elements__title').textContent = item.name;

  // //>>>>>>>>>>>> Добавление лайка
  const likeButton = addTemplateCard.querySelector('.elements__like');
    likeButton.addEventListener('click', function (e) {
    likeButton.classList.toggle('elements__like_active');
  });

  //>>>>>>>>>>> Удаление карточки
  const deleteButton = addTemplateCard.querySelector('.elements__delete');
  deleteButton.addEventListener('click', function() {
    const cardItem = deleteButton.closest('.elements__card');
    cardItem.remove();
  })

  //>>>>>>>>> Попап с увеличенной картинкой

  const popupImage = document.querySelector('.lightbox-popup');
  const popupImageOpenButton = addTemplateCard.querySelector('.elements__img');
  const popupImageCloseButton = popupImage.querySelector('.popup__close-btn');
  const popupImageLink = popupImage.querySelector('.popup__image');
  const popupImageCaption = popupImage.querySelector('.popup__image-caption');

  popupImageOpenButton.addEventListener('click', function() {
    console.log('Open popup image');
    popupImageCaption.textContent = addElementsTitle;
    popupImageLink.src = addElementsImageLink;
    popupOpened(popupImage);
  })

  popupImageCloseButton.addEventListener('click', function() {
    console.log('Close popup image');
    popupClosed(popupImage);
  });

  if(toBegin === true) {
    elementsList.prepend(addTemplateCard);
  } else {
    elementsList.append(addTemplateCard);
  }
}
initialCards.forEach(addCard);

// >>>>>>>>>>>>>>>> Функции открытия закрытия формы
function popupOpened(popUpToOpen) {
  if(popUpToOpen) {
    popUpToOpen.classList.add('popup_opened');
  }
};

function popupClosed(popUpToClose) {
  popUpToClose.classList.remove('popup_opened');
}

// >>>>>>>>>>>>>>>>  Попап редактирования профиля
const editProfilePopup = document.querySelector('.editProfile-popup');
const editProfileCloseButton = editProfilePopup.querySelector('.popup__close-btn');
const editProfileOpenButton = document.querySelector('.profile-info__edit-btn');

editProfileOpenButton.addEventListener('click', function(){
  popupOpened(editProfilePopup);
});
editProfileCloseButton.addEventListener('click', function() {
  popupClosed(editProfilePopup);
});

// Поля ФОРМЫ редактирования профиля
const formElement = editProfilePopup.querySelector('.edit-form');
const nameProfileInfo = document.querySelector('.profile-info__title');
const descriptionProfileInfo = document.querySelector('.profile-info__description');
const nameInput = formElement.querySelector('.edit-form__input_type_name');
const descriptionInput = formElement.querySelector('.edit-form__input_type_description');

// Записать внутрь полей формы значения из заголовков страницы
nameInput.value = nameProfileInfo.textContent;
descriptionInput.value = descriptionProfileInfo.textContent;

// Записать значения из полей формы в заголовки страницы (при клике)
function handleFormSubmit (e) {
  e.preventDefault();

  nameProfileInfo.textContent = nameInput.value;
  descriptionProfileInfo.textContent = descriptionInput.value;
  popupClosed(editProfilePopup);
}
formElement.addEventListener('submit', handleFormSubmit);

//  >>>>>>>>>>>>>>>> Поля формы добавления карточки места
const addCardPopup = document.querySelector('.addCard-popup');
const addCardPopupCloseBtn = addCardPopup.querySelector('.popup__close-btn');
const addCardPopupOpenBtn = document.querySelector('.profile__add-card-btn');
let cardName = document.querySelector('.edit-form__input_card_name');
let cardLink = document.querySelector('edit-form__input_card_link');

addCardPopupOpenBtn.addEventListener('click', function() {
  popupOpened(addCardPopup);
});

addCardPopupCloseBtn.addEventListener('click', function() {
  popupClosed(addCardPopup);
})

// Поля формы добавления карточки места
const addCardForm = addCardPopup.querySelector('.edit-form');
const cardNameInput = addCardForm.querySelector('.edit-form__input_card_name');
const cardLinkInput = addCardForm.querySelector('.edit-form__input_card_link');

// Записать значения из полей формы В карточку нового места
function addNewCardPlace(e) {
  e.preventDefault();
  const cardName = cardNameInput.value;
  const cardLink = cardLinkInput.value;
    const newCard = {
    name: cardName,
    link: cardLink
  }
  addCard(newCard, true);
  popupClosed(addCardPopup);
}
addCardForm.addEventListener('submit', addNewCardPlace);




