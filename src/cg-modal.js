export default class CgModal {
  constructor(options) {
    const deafultOptions = {
      selector: ".js-modal", // Selector of modals [default = .js-modal]
      openButton: ".js-open-modal-btn", // Selector of open button [default = .js-open-modal-btn]
      closeButton: ".js-close-modal-btn", // Selector of close button [default = .js-close-modal-btn]
      contentClass: "js-modal-content", // Class of content wrapper [default = js-modal-content]
      effect: null, // Effect of opening or closing modals (fade, transformBottom, transformLeft, transformTop, transformRight, scaleCenter) [default = null]
      speed: 300, // Transition (ms) [default = 300]
      position: "center", // Position of modal (center, left, right) [default - center]
      beforeOpen: () => {}, // Event before open modal
      afterOpen: () => {}, // Event after open modal
      beforeClose: () => {}, // Event before close modal
      afterClose: () => {}, // Event after close modal
      onOpenBtnClick: () => {}, // Event at moment of click on open button
    };

    this._activeClass = "active";
    this.options = Object.assign(deafultOptions, options);
    this.modals = null;
    this.documentBody = document.body;

    this.init();
  }

  init() {
    this.modals = document.querySelectorAll(`${this.options.selector}`);

    if (!this.modals) {
      console.error(`Не найден элемент с селектором "${this.options.selector}"`);
    } else {
      this.modals.forEach((modal) => {
        // Add class of effect
        if (this.hasEffect(this.options.effect)) {
          modal.classList.add(`${this.options.effect}`);
        }

        // Add tech class for modal, need for correct work for animations effect, positions, etc.
        !modal.classList.contains("js-modal") ? modal.classList.add("js-modal") : "";

        // Add class of modal position
        modal.classList.add(`${this.options.position}`);

        // Set speed of animations
        if (this.options.speed && this._isNumeric(this.options.speed)) {
          modal.style.setProperty("--speed", parseFloat(this.options.speed / 1000) + "s");
        }
      });

      this._eventsHandler();
    }
  }

  _eventsHandler() {
    // Click event for open modal buttons
    const openModalButtons = document.querySelectorAll(`${this.options.openButton}`);

    if (openModalButtons) {
      openModalButtons.forEach((btn) => {
        btn.addEventListener("click", (e) => {
          this.options.onOpenBtnClick();

          e.stopPropagation();
          this.open(`${e.currentTarget.dataset.openModal}`);
        });
      });
    } else {
      console.error(`Не найден элемент с селектором "${this.options.openButton}"`);
    }

    this.modals.forEach((modal) => {
      // Click event for close modal button
      const closeModalButtons = modal.querySelectorAll(`${this.options.closeButton}`);

      if (closeModalButtons) {
        closeModalButtons.forEach((btn) => {
          btn.addEventListener("click", (e) => {
            e.stopPropagation();
            this.close(modal);
          });
        });
      }

      // Stop propagation for modal content wrapper, for not closing active modal by clicking on this wrapper
      const modalContent = modal.querySelector(`.${this.options.contentClass}`);

      if (modalContent) {
        !modalContent.classList.contains("js-modal-content") ? modalContent.classList.add("js-modal-content") : "";

        modalContent.addEventListener("click", (e) => {
          e.stopPropagation();
        });
      } else {
        console.error(`Не найден элемент ".${this.options.contentClass}"`);
      }
    });

    // Click event for document.body => close active modal
    this.documentBody.addEventListener("click", () => {
      if (this.hasActiveModal() !== false) {
        this.closeActive();
      }
    });

    // Press "Escape" on keyboard to close modal
    document.onkeydown = (e) => {
      if (this.hasActiveModal() !== false) {
        e = e || window.event;
        if (e.keyCode == 27) {
          this.closeActive();
        }
      }
    };
  }

  // Open modal by data-attribute (data-modal)
  open(modalId) {
    this.options.beforeOpen();

    const modal = document.querySelector(`[data-modal=${modalId}]`);

    if (modal) {
      modal.classList.add(`${this._activeClass}`);
      this.documentBody.style.overflow = "hidden";

      this.options.afterOpen();
    } else {
      console.error(`Не найдено соответствующее окно с атрибутом равным ${modalId}`);
    }
  }

  // Close modal by Node Element
  close(modal) {
    this.options.beforeClose();

    modal.classList.remove(`${this._activeClass}`);
    this.documentBody.style.overflow = "";

    this.options.afterClose();
  }

  // Close active modal
  closeActive() {
    const hasActiveModal = this.hasActiveModal();
    hasActiveModal !== false ? this.close(hasActiveModal) : "";
  }

  // Check if there is active modal window
  hasActiveModal() {
    return document.querySelector(`${this.options.selector}.${this._activeClass}`)
      ? document.querySelector(`${this.options.selector}.${this._activeClass}`)
      : false;
  }

  // function helper
  _isNumeric(number) {
    return !isNaN(parseFloat(number)) && isFinite(number);
  }

  // Check if options have correct effect property
  hasEffect(string) {
    const effects = ["fade", "transformLeft", "transformRight", "transformTop", "transformBottom", "scaleCenter"];

    if (string && effects.indexOf(string.toString().trim()) != -1) {
      return true;
    }
    return false;
  }
}
