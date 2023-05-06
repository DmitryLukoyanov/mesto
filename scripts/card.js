class Card {
  constructor(card, template, handleCardClick) {
    this._title = card.name;
    this._image = card.link;
    this._template = template;
    this._popupImage = document.querySelector('.lightbox-popup');
    this._popupImageLink = this._popupImage.querySelector('.popup__image');
    this._popupImageCaption = this._popupImage.querySelector('.popup__image-caption');
    this._handleCardClick = handleCardClick;
  };

  _setEventListeners() {
    this._btnDelete.addEventListener('click', this._deleteCard);
    this._btnLike.addEventListener('click', this._likeToggler);
    this._imgElement.addEventListener('click', () => {
      this._handleCardClick(this._title, this._image);
    });
  };

  _likeToggler(e) {
    e.currentTarget.classList.toggle('elements__like_active');
  };

  _deleteCard(e) {
    const cardItem = e.currentTarget.closest('.elements__card');
    cardItem.remove();
  };

  _getTemplate() {
    const cardElement = document
    .querySelector(this._template)
    .content
    .cloneNode(true);

    return cardElement;
  };

  createCard() {
    this._element = this._getTemplate();
    this._btnLike = this._element.querySelector('.elements__like');
    this._btnDelete = this._element.querySelector('.elements__delete');
    this._imgElement = this._element.querySelector('.elements__img');
    this._setEventListeners();
    this._imgElement.src = this._image;
    this._imgElement.alt = "card place";
    this._element.querySelector('.elements__title').textContent = this._title;
    return this._element;
  };
};

export default Card;
