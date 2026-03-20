# canvas-captcha

> Lightweight, zero-dependency canvas-based CAPTCHA widget for the browser.

No server needed. No third-party APIs. The CAPTCHA value is **never exposed in the DOM** — it lives only inside the Canvas, making it resistant to simple scraping.

[![npm version](https://img.shields.io/npm/v/canvas-captcha.svg)](https://www.npmjs.com/package/canvas-captcha)
[![license](https://img.shields.io/npm/l/canvas-captcha.svg)](LICENSE)
[![bundle size](https://img.shields.io/bundlephobia/minzip/canvas-captcha)](https://bundlephobia.com/package/canvas-captcha)

---

## Features

- 🎨 Canvas rendering — value is never in the DOM
- 🔀 Random rotation, color, and font per character
- 📢 Visual noise (lines + dots) to deter OCR bots
- ⚙️ Fully configurable (length, charset, colors, noise level)
- 📦 Zero dependencies
- 🌐 Works with ESM, CommonJS, or a plain `<script>` tag

---

## Installation

```bash
npm install canvas-captcha
```

---

## Quick start

### HTML + vanilla JS (UMD via CDN)

```html
<canvas id="my-captcha"></canvas>
<input type="text" id="captcha-input" placeholder="Type the characters" />
<button onclick="check()">Verify</button>
<button onclick="captcha.refresh()">Refresh</button>

<script src="https://unpkg.com/canvas-captcha/dist/canvas-captcha.umd.min.js"></script>
<script>
  const { CaptchaCanvas } = CanvasCaptcha;
  const captcha = new CaptchaCanvas('#my-captcha');

  function check() {
    const input = document.getElementById('captcha-input').value;
    if (captcha.verify(input)) {
      alert('✅ Correct!');
    } else {
      alert('❌ Wrong — try again.');
      captcha.refresh();
    }
  }
</script>
```

### ESM (Vite, Webpack, Rollup)

```js
import CaptchaCanvas from 'canvas-captcha';

const captcha = new CaptchaCanvas('#my-captcha');

submitBtn.addEventListener('click', () => {
  if (captcha.verify(input.value)) {
    // proceed
  } else {
    captcha.refresh();
    // show error
  }
});
```

### CommonJS (Node.js / older bundlers)

```js
const { CaptchaCanvas } = require('canvas-captcha');
const captcha = new CaptchaCanvas('#my-captcha');
```

---

## API

### `new CaptchaCanvas(target, options?)`

| Parameter | Type | Description |
|-----------|------|-------------|
| `target` | `string \| HTMLCanvasElement` | CSS selector or canvas element |
| `options` | `object` | Optional configuration (see below) |

### Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `length` | `number` | `6` | Number of characters |
| `chars` | `string` | alphanumeric + symbols | Pool of characters to sample from |
| `width` | `number` | `180` | Canvas width in px |
| `height` | `number` | `52` | Canvas height in px |
| `noiseLines` | `number` | `6` | Number of noise lines drawn |
| `noiseDots` | `number` | `40` | Number of noise dots drawn |
| `fonts` | `string[]` | `['cursive','fantasy','serif']` | Fonts used for characters |
| `background` | `string[]` | `['#e8e4dd','#d4cfc7']` | Gradient background `[start, end]` |
| `caseSensitive` | `boolean` | `true` | Whether verification is case-sensitive |

### Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `refresh()` | `this` | Generate new CAPTCHA and redraw. Chainable. |
| `verify(input)` | `boolean` | Returns `true` if input matches current CAPTCHA |
| `getCanvas()` | `HTMLCanvasElement` | Returns the underlying canvas element |

---

## Example with options

```js
const captcha = new CaptchaCanvas('#captcha', {
  length:        8,
  chars:         'ABCDEFGHJKLMNPQRSTUVWXYZ23456789',
  width:         220,
  height:        60,
  noiseLines:    10,
  noiseDots:     60,
  caseSensitive: false,
  background:    ['#1a1a2e', '#16213e'],
});
```

---

## Browser support

Any browser that supports the HTML5 `<canvas>` API (all modern browsers, IE11 with polyfill).

---

## License

MIT © [Nikola Popovic](https://ponitech.pro)
