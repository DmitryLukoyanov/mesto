import {
  openPopup
 } from "./utils.js";

class Card {
  constructor(card, template) {
    this._title = card.name;
    this._image = card.link;
    this._template = template;
    this._setEventListeners();
  };

  _setEventListeners() {
    const createdCard = this.createCard()
    const btnLike = createdCard.querySelector('.elements__like');
    btnLike.addEventListener('click', this._likeToggler);

    const btnDelete = createdCard.querySelector('.elements__delete');
    btnDelete.addEventListener('click', this._deleteCard);

    const imgElement = createdCard.querySelector('.elements__img');
    imgElement.addEventListener('click', this._zoomImage);
  };

  _likeToggler(e) {
    e.currentTarget.classList.toggle('elements__like_active');
  };

  _deleteCard(e) {
    const cardItem = e.currentTarget.closest('.elements__card');
    cardItem.remove();
  };

  _zoomImage = () => {
    const popupImage = document.querySelector('.lightbox-popup');
    const popupImageLink = popupImage.querySelector('.popup__image');
    const popupImageCaption = popupImage.querySelector('.popup__image-caption');

    popupImageCaption.textContent = this._title;
      popupImageLink.src = this._image;
      console.log(this);
      popupImageLink.alt = this._title;
      openPopup(popupImage);
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
    this._element.querySelector('.elements__img').src = this._image;

    this._element.querySelector('.elements__img').alt = "card place";
    this._element.querySelector('.elements__title').textContent = this._title;
    return this._element;
  }
};

export default Card;
