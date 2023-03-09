const popupElement = document.querySelector('.popup');
const popupCloseButton = popupElement.querySelector('.popup__close-btn');
const popupOpenButton = document.querySelector('.profile-info__edit-btn');
const formElement = document.querySelector('.edit-form');
let nameProfileInfo = document.querySelector('.profile-info__title');
let descriptionProfileInfo = document.querySelector('.profile-info__description');
let nameInput = formElement.querySelector('.edit-form__input_type_name');
let descriptionInput = formElement.querySelector('.edit-form__input_type_description');


const popupOpened = function () {
  popupElement.classList.add('popup_opened');
  nameInput.value = nameProfileInfo.textContent;
  descriptionInput.value = descriptionProfileInfo.textContent;
};

const popupClosed = function () {
  popupElement.classList.remove('popup_opened');
};

popupOpenButton.addEventListener('click', popupOpened);
popupCloseButton.addEventListener('click', popupClosed);

function handleFormSubmit (evt) {
  evt.preventDefault();

  nameProfileInfo.textContent = nameInput.value;
  descriptionProfileInfo.textContent = descriptionInput.value;
  popupClosed();
}
formElement.addEventListener('submit', handleFormSubmit);
