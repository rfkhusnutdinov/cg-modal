export default class CgModal {
  constructor(options) {
    const defaultOptions = {
      selector: ".modal", // Selector of modals [default = .modal]
      openButtonSelector: "[data-open-modal]", // Selector of open button [default = [data-open-modal]]
      closeButtonSelector: ".modal__close-btn", // Selector of close button [default = .close-modal-btn]
      contentClass: "modal__content", // Class of content wrapper [default = modal-content]
      wrapperClass: "modal__wrapper", // Class of wrapper [default = modal-wrapper]
      effect: null, // Effect of opening or closing modals (fade, transformBottom, transformLeft, transformTop, transformRight, scaleCenter) [default = null]
      speed: 300, // Transition (ms) [default = 300]
      position: "center", // Position of modal (center, left, right) [default - center]
      addTechClasses: true,
      on: {
        beforeOpen: function () {}, // Event before open modal
        afterOpen: function () {}, // Event after open modal
        beforeClose: function () {}, // Event before close modal
        afterClose: function () {}, // Event after close modal
        openBtnClick: function () {}, // Event at moment of click on open button
        update: function () {}, // Event at moment of update instance
      },
    };

    this._activeClass = "active";
    this.modals = null;
    this.documentBody = document.body;
    this.options = this._deepMerge(defaultOptions, options);

    this.init();
  }

  init() {
    this.modals = document.querySelectorAll(`${this.options.selector}`);

    if (!this.modals) {
      console.error(`Element "${this.options.selector}" not found`);
    } else {
      this.modals.forEach((modal) => {
        // Add class of effect
        if (this._hasEffect(this.options.effect)) {
          modal.classList.add(`${this.options.effect}`);
        }

        // Add tech classes for modal and wrapper, need for correct work for default plugin styles.
        if (this.options.addTechClasses === true) {
          !modal.classList.contains("cg-modal")
            ? modal.classList.add("cg-modal")
            : "";
          !modal
            .querySelector(`.${this.options.wrapperClass}`)
            .classList.contains("cg-modal-wrapper")
            ? modal
                .querySelector(`.${this.options.wrapperClass}`)
                .classList.add("cg-modal-wrapper")
            : "";
        }

        // Add class of modal position
        modal.classList.add(`${this.options.position}`);

        // Set speed of animations
        if (this.options.speed && this._isNumeric(this.options.speed)) {
          modal.style.setProperty(
            "--speed",
            parseFloat(this.options.speed / 1000) + "s"
          );
        }
      });

      this._eventsHandler();
    }
  }

  _eventsHandler() {
    // Click event for open modal buttons
    const openModalButtons = document.querySelectorAll(
      `${this.options.openButtonSelector}`
    );

    if (openModalButtons) {
      openModalButtons.forEach((btn) => {
        btn.addEventListener("click", (e) => {
          this.options.on.openBtnClick.call(this);

          e.stopPropagation();
          this.open(`${e.currentTarget.dataset.openModal}`);
        });
      });
    } else {
      console.error(
        `Не найден элемент с селектором "${this.options.openButtonSelector}"`
      );
    }

    this.modals.forEach((modal) => {
      // Click event for close modal button
      const closeModalButtons = modal.querySelectorAll(
        `${this.options.closeButtonSelector}`
      );

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
        if (this.options.addTechClasses === true) {
          !modalContent.classList.contains("cg-modal-content")
            ? modalContent.classList.add("cg-modal-content")
            : "";
        }

        modalContent.addEventListener("click", (e) => {
          e.stopPropagation();
        });
      } else {
        console.error(`Не найден элемент ".${this.options.contentClass}"`);
      }
    });

    // Click event for document.body => close active modal
    this.documentBody.addEventListener("click", () => {
      if (this._hasActiveModal() !== false) {
        this.closeActive();
      }
    });

    // Press "Escape" on keyboard to close modal
    document.onkeydown = (e) => {
      if (this._hasActiveModal() !== false) {
        e = e || window.event;
        if (e.keyCode == 27) {
          this.closeActive();
        }
      }
    };
  }

  // Open modal by data-attribute (data-modal)
  open(modalId) {
    this.options.on.beforeOpen.call(this);

    const modal = document.querySelector(`[data-modal=${modalId}]`);

    if (modal) {
      modal.classList.add(`${this._activeClass}`);
      this.documentBody.style.overflow = "hidden";

      this.options.on.afterOpen.call(this);
    } else {
      console.error(
        `Не найдено соответствующее окно с атрибутом равным ${modalId}`
      );
    }
  }

  // Close modal by Node Element
  close(modal) {
    this.options.on.beforeClose.call(this);

    modal.classList.remove(`${this._activeClass}`);
    this.documentBody.style.overflow = "";

    this.options.on.afterClose.call(this);
  }

  // Close active modal
  closeActive() {
    const hasActiveModal = this._hasActiveModal();
    hasActiveModal !== false ? this.close(hasActiveModal) : "";
  }

  // Check if there is active modal window
  _hasActiveModal() {
    return document.querySelector(
      `${this.options.selector}.${this._activeClass}`
    )
      ? document.querySelector(`${this.options.selector}.${this._activeClass}`)
      : false;
  }

  // function helper - check if property is number
  _isNumeric(number) {
    return !isNaN(parseFloat(number)) && isFinite(number);
  }

  _deepMerge(target, source) {
    if (!source) return target;

    Object.entries(source).forEach(([key, value]) => {
      if (value && typeof value === "object") {
        this._deepMerge((target[key] = target[key] || {}), value);
        return;
      }
      target[key] = value;
    });
    return target;
  }

  // Check if options have correct effect property
  _hasEffect(string) {
    const effects = [
      "fade",
      "transformLeft",
      "transformRight",
      "transformTop",
      "transformBottom",
      "scaleCenter",
    ];

    if (string && effects.indexOf(string.toString().trim()) != -1) {
      return true;
    }
    return false;
  }

  // update modals instance
  update() {
    this.init();

    this.options.on.update.call(this);
  }
}
