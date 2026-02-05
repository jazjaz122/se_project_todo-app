export default class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
    this._closeButton = this._popupElement.querySelector(".popup__close");

    this._handleEscapeClose = (evt) => {
      if (evt.key === "Escape") {
        this.close();
      }
    };

    this._handleOverlayClose = (evt) => {
      if (evt.target === this._popupElement) {
        this.close();
      }
    };
  }

  open() {
    this._popupElement.classList.add("popup_visible");
    document.addEventListener("keydown", this._handleEscapeClose);
  }

  close() {
    this._popupElement.classList.remove("popup_visible");
    document.removeEventListener("keydown", this._handleEscapeClose);
  }

  setEventListeners() {
    this._closeButton.addEventListener("click", () => this.close());
    this._popupElement.addEventListener("click", this._handleOverlayClose);
  }
}
