# CgModal

CgModal - is simple and lightweight JS plugin of displaying modal windows which does not depend on jQuery or others.
For examples and demos, see [link](https://rfkhusnutdinov.github.io/cg-modal/demo)

## Installation

- **Via npm** <code>npm install --save cg-modal</code>
- **Via script tag** (change <code>@latest</code> to latest version)

```html
<link
  rel="stylesheet"
  href="https://unpkg.com/cg-modal@latest/dist/cg-modal.min.css"
/>
<script src="https://unpkg.com/cg-modal@latest/dist/cg-modal.min.js"></script>
<!-- or -->
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/cg-modal@latest/dist/cg-modal.min.css"
/>
<script src="https://cdn.jsdelivr.net/npm/cg-modal@latest/dist/cg-modal.min.js"></script>
```

## Usage

If you are using **import/export syntax**, you need to import library:

```javascript
import CgModal from "cg-modal";
import "cg-modal/dist/cg-modal.css";
```

Append to document following HTML:

```html
<div class="modal" data-modal="{unique name for modal}">
  <div class="modal__wrapper">
    <div class="modal__content">
      <button class="modal__close-btn" type="button">Close</button>
      <!-- modal content -->
    </div>
  </div>
</div>
```

**Note:** Button which open modal window should contains data attribute (data-open-modal) and modal window should contains (data-modal)

Then, create an instance of class

```javascript
const modals = new CgModal({
  // Options
});
```

## API

### Parameters

- **selector** - <code>type: string</code> - default: ".modal" - string of modal window HTML element
- **openButtonSelector** - <code>type: string</code> - default: "[data-open-modal]" - string of open modal button HTML element
- **closeButtonSelector** - <code>type: string</code> - default: ".modal\_\_close-btn" - string of close modal button HTML element
- **wrapperClass** - <code>type: string</code> - default: "modal\_\_wrapper"
- **contentClass** - <code>type: string</code> - default: "modal\_\_content"
- **effect** - <code>type: null | string</code> - defautl: null
- **speed** - <code>type: number</code> - default: 300
- **position** - <code>type: string</code> - default: "center"
- **addTechClasses** - <code>type: boolean</code> - default: true

### Methods

- **open(modalData)** - open modal by data-attribute (data-modal)
- **close(modal)** - close modal by Node Element
- **closeActive()** - close active modal
- **update()** - update instance

### Events

You can listen different useful events. Using <code>on</code> parameter on initialization

```javascript
const modals = new CgModal({
  // ...
  on: {
    update: function () {
      console.log("updated");
    },
  },
});
```

#### List of events:

- **beforeOpen** - Event before open modal
- **afterOpen** - Event after open modal
- **beforeClose** - Event before close modal
- **afterClose** - Event after close modal
- **openBtnClick** - Event at moment of click on open button
- **update** - Event at moment of update instance

## License

The code and the documentation are released under the [MIT License](https://github.com/rfkhusnutdinov/cg-modal/blob/main/LICENSE).
