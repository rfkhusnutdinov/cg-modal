# CgModal

CgModal - is simple and lightweight JS plugin of displating modal windows which does not depend on jQuery or others.
For examples and demos, see [link](https://rfkhusnutdinov.github.io/cg-modal/demo)

## Installation

- Via npm <code>npm install --save cg-modal</code>
- Via script tag (change <code>@latest</code> to latest version)

```html
<link
  rel="stylesheet"
  href="https://unpkg.com/cg-modal@latest/dist/cg-modal.css"
/>
<script src="https://unpkg.com/cg-modal@latest/dist/cg-modal.min.js"></script>
<!-- or -->
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/cg-modal@latest/dist/cg-modal.css"
/>
<script src="https://cdn.jsdelivr.net/npm/cg-modal@latest/dist/cg-modal.min.js"></script>
```

## Usage

If you are using import/export syntax, you need:

```javascript
import CgModal from "cg-modal";
import "cg-modal/dist/cg-modal.css";
```

Append to document following HTML:

```html
<div class="modal" data-modal="modal id"></div>
```
