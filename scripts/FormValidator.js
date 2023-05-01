class FormValidator {
  constructor(config, form) {
    this._form = form;
    this._inputSelector = config.inputSelector
    this._submitButtonSelector = config.submitButtonSelector
    this._activeButtonClass = config.activeButtonClass
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._formButton = this._form.querySelector(this._submitButtonSelector);
  }

  enableValidation() {
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._disableButton(this._formButton);
    });
    this._setEventListeners(); // для каждого инпута внутри формы устанавливаем слушатель
  };

  _setEventListeners() {
    const formInputs = Array.from(this._form.querySelectorAll(this._inputSelector));
    this._disableButton();
    formInputs.forEach(input => {
      input.addEventListener('input', () => {
        this._checkInputValidity(input);
        if (this._hasInvalidInput(formInputs)) {
          this._disableButton();
        } else {
          this._enableButton();
        }
      });
    });
  };

  _showInputError(input, errorMessage) {
    const currentInputErrorContainer = this._form.querySelector(`#${input.id}-error`);
    input.classList.add(this._inputErrorClass);
    currentInputErrorContainer.textContent = errorMessage;
    currentInputErrorContainer.classList.add(this._errorClass);
  };

  _hideInputError(input) {
    const currentInputErrorContainer = this._form.querySelector(`#${input.id}-error`);
    input.classList.remove(this._inputErrorClass);
    currentInputErrorContainer.textContent = '';
    currentInputErrorContainer.classList.remove(this._errorClass);
  };

  _checkInputValidity(input) {
    if (!input.validity.valid) {
        this._showInputError(input, input.validationMessage);
     } else {
        this._hideInputError(input);
     };
  };

 _hasInvalidInput(formInputs) {
   return formInputs.some(item => !item.validity.valid);
 };

 _enableButton() {
   this._formButton.classList.remove(this._inactiveButtonClass);
   this._formButton.classList.add(this._activeButtonClass);
   this._formButton.removeAttribute('disabled');
 };

 _disableButton() {
   this._formButton.classList.add(this._inactiveButtonClass);
   this._formButton.classList.remove(this._activeButtonClass);
   this._formButton.setAttribute('disabled', true);
 };

 cleaneErrorMessage() {
  this._form.querySelectorAll(this._inputSelector).forEach((input) => {
    if (!input.validity.valid) {
      this._hideInputError(input)
      }
    })
   }
}

export default FormValidator;
