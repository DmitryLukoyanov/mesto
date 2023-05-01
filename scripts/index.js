import {
  openPopup,
  closePopup,
  closePopupByEsc,
  closePopupOverlay
 } from "./utils.js";
import Card from "./card.js";
import FormValidator from "./FormValidator.js";

//>>>>>>>>> Объявление переменных в глобальной области видимости
const formPlace = document.querySelector('.edit-form_new');
const formEdit = document.querySelector('.edit-form_profile')
const elementsList = document.querySelector('.elements__list');

const enableValidationConfig = {
  formSelector: '.edit-form',
  inputSelector: '.edit-form__input',
  submitButtonSelector: '.edit-form__save-btn',
  inactiveButtonClass: 'edit-form__save-btn_invalid',
  activeButtonClass: 'edit-form__save-btn_valid', //дополнительное свойство
  inputErrorClass: 'edit-form__input_error', // это класс инпута когда он становится красным при вводе невалидных данных, подчеркивается красной линией
  errorClass: 'edit-form__error_visible' //это класс который надо наложить контейнеру с ошибкой, чтобы он стал видимым (то есть display поменялся)
  //оба эти класса не должны быть прописаны изначально они как popup_opened добавляются
};

const formPlaceValidator = new FormValidator( enableValidationConfig, formPlace);
const formEditValidator = new FormValidator( enableValidationConfig, formEdit);
formPlaceValidator.enableValidation();
formEditValidator.enableValidation();

//>>>>>> Универсальный обработчик крестиков
const closeButtons = document.querySelectorAll('.popup__close-btn');
closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => {
    closePopup(popup);
  });
});

//>>>>>> Добавдение карточек из начального массива
initialCards.forEach(function(item) {
    const card = new Card(item, ".template__card")._element;
    elementsList.append(card);
});

//>>>>>>>>>>>  Попап редактирования профиля
const popupEditProfile = document.querySelector('.editProfile-popup');
const buttonCloseEditProfile = popupEditProfile.querySelector('.popup__close-btn');
const buttonOpenEditProfile = document.querySelector('.profile-info__edit-btn');

buttonOpenEditProfile.addEventListener('click', function() {
  formEditValidator.cleaneErrorMessage();
  nameInput.value = nameProfileInfo.textContent;
  descriptionInput.value = descriptionProfileInfo.textContent;
  openPopup(popupEditProfile);
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

//>>>>>>> Поля формы добавления карточки места
const formCard = popupNewCard.querySelector('.edit-form');
const cardNameInput = formCard.querySelector('.edit-form__input_card_name');
const cardLinkInput = formCard.querySelector('.edit-form__input_card_link');

//>>>>>>> Функция добавдения новой карточки
function addNewCardPlace(e) {
  e.preventDefault();

  const newCard = new Card({
    name: cardNameInput.value,
    link: cardLinkInput.value
  }, ".template__card");
  elementsList.prepend(newCard._element);
  closePopup(popupNewCard);
  e.target.reset();
};
formCard.addEventListener('submit', addNewCardPlace);
