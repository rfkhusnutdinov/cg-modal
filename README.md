# CgModal

CgModal - is simple and lightweight JS plugin of displaying modal windows which does not depend on jQuery or others.

For examples and demos, see [link](https://rfkhusnutdinov.github.io/cg-modal/demo)

## Installation

- **Via npm** `npm install --save cg-modal`
- **Via script tag** (change `@latest` to latest version `ex: @1.0.1`)

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
import "cg-modal";
// or
import "cg-modal/dist/cg-modal.min.js";
import "cg-modal/dist/cg-modal.min.css";
```

Append to document following HTML:

```html
<!-- HTML of open modal button -->
<button type="button" data-open-modal="modal">Button</button>

<!-- HTML of modal window -->
<div class="modal" data-modal="modal">
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

| Name                    | Type      | Default             | Description                                                                                                                                                                                                                                                          |
| ----------------------- | --------- | ------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **selector**            | `string`  | `.modal`            | Selector HTML element that will act as a modal window                                                                                                                                                                                                                |
| **openButtonSelector**  | `string`  | `[data-open-modal]` | Selector HTML element that will act as the button that opens the modal window                                                                                                                                                                                        |
| **closeButtonSelector** | `string`  | `.modal__close-btn` | The HTML element selector that will act as the modal's close button. Should be inside this window.                                                                                                                                                                   |
| **wrapperClass**        | `string`  | `modal__wrapper`    | Class of wrapper container inside modal                                                                                                                                                                                                                              |
| **contentClass**        | `string`  | `modal__content`    | Class of content part of modal window                                                                                                                                                                                                                                |
| **effect**              | `null`    | `string`\|`null`    | Modal open and close effect. There are following effects: `"fade" \| "scaleCenter" \| "transformLeft" \| "transformBottom" \| "transformRight" \|"transformTop"`                                                                                                     |
| **speed**               | `number`  | `300`               | Modal opening and closing animation speed                                                                                                                                                                                                                            |
| **position**            | `string`  | `center`            | Modal position on screen. There are following values: `"center" \| "left" \| "right"`                                                                                                                                                                                |
| **addTechClasses**      | `boolean` | `true`              | Adding technical classes for the main elements of the modal window so that the default styles work. If the value is false, then you need to write all the styles for the modal window yourself. Classes such as `"cg-modal", "cg-modal-wrapper", "cg-modal-content"` |

### Methods

- **open(modalData)** - open modal by data-attribute (data-modal)
- **close(modal)** - close modal by Node Element
- **closeActive()** - close active modal
- **update()** - update instance

### Events

You can listen different useful events. Using `on` parameter on initialization

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
