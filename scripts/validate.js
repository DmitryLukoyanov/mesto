// const enableValidationConfig = {
//   formSelector: '.edit-form',
//   inputSelector: '.edit-form__input',
//   submitButtonSelector: '.edit-form__save-btn',
//   inactiveButtonClass: 'edit-form__save-btn_invalid',
//   activeButtonClass: 'edit-form__save-btn_valid', //дополнительное свойство
//   inputErrorClass: 'edit-form__input_error', // это класс инпута когда он становится красным при вводе невалидных данных, подчеркивается красной линией
//   errorClass: 'edit-form__error_visible' //это класс который надо наложить контейнеру с ошибкой, чтобы он стал видимым (то есть display поменялся)
//   //оба эти класса не должны быть прописаны изначально они как popup_opened добавляются
// };

// const enableValidation = ({ formSelector, ...rest }) => {
//   const forms = Array.from(document.querySelectorAll(formSelector));
//   forms.forEach(form => {
//     //>>>>>>>> слушатель на отправку каждой формы
//     form.addEventListener('submit', (evt) => {
//         evt.preventDefault();
//         const formButton = form.querySelector(rest.submitButtonSelector);
//         disableButton(formButton, rest);
//     });
//     setEventListeners(form, rest); // для каждого инпута внутри формы устанавливаем слушатель
//   });
// };

// const setEventListeners = (formToValidate, { inputSelector, submitButtonSelector, ...rest}) => {
//   const formInputs = Array.from(formToValidate.querySelectorAll(inputSelector));
//   const formButton = formToValidate.querySelector(submitButtonSelector);
//   disableButton(formButton, rest);

//   formInputs.forEach(input => {
//     input.addEventListener('input', () => {
//       checkInputValidity(formToValidate, input); //прежнее значение input
//       if (hasInvalidInput(formInputs)) {
//         disableButton(formButton, rest);
//       } else {
//         enableButton(formButton, rest);
//       }
//     });
//   });
// };

//Новые функции для инпутов и вывода ошибок
//   const showInputError = (formToValidate, input, errorMessage) => {
//     console.log('showInputError');
//     const currentInputErrorContainer = formToValidate.querySelector(`#${input.id}-error`);
//     input.classList.add(enableValidationConfig.inputErrorClass);
//     currentInputErrorContainer.textContent = errorMessage;
//     currentInputErrorContainer.classList.add(enableValidationConfig.errorClass);
// };

//   const hideInputError = (formToValidate, input) => {
//     console.log('hideInputError');
//     const currentInputErrorContainer = formToValidate.querySelector(`#${input.id}-error`);
//     input.classList.remove(enableValidationConfig.inputErrorClass);
//     currentInputErrorContainer.textContent = '';
//     console.log(currentInputErrorContainer);
//     currentInputErrorContainer.classList.remove(enableValidationConfig.errorClass);
// };

// //Функция проверки полей на валидность
// const checkInputValidity = (formToValidate, input) => {
//    if (!input.validity.valid) {
//     showInputError(formToValidate, input, input.validationMessage);
//     } else {
//       hideInputError(formToValidate, input);
//     };
// };

// const hasInvalidInput = (formInputs) => {
//   return formInputs.some(item => !item.validity.valid);
// };

// const enableButton = (button, { inactiveButtonClass, activeButtonClass }) => {
//   button.classList.remove(inactiveButtonClass);
//   button.classList.add(activeButtonClass);
//   button.removeAttribute('disabled');
// };

// const disableButton = (button, { inactiveButtonClass, activeButtonClass }) => {
//   button.classList.add(inactiveButtonClass);
//   button.classList.remove(activeButtonClass);
//   button.setAttribute('disabled', true);
// };

// enableValidation(enableValidationConfig);

// const cleaneErrorMessage = (formToValidate) => {
//     formToValidate.querySelectorAll(enableValidationConfig.inputSelector).forEach((input) => {
//       if (!input.validity.valid) {
//         hideInputError(formToValidate, input)
//       }
//     })
//   };
