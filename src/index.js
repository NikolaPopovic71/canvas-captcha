/**
 * canvas-captcha
 * Lightweight, zero-dependency canvas-based CAPTCHA widget.
 * Works in any browser environment — no server required.
 *
 * @author  Nikola Popovic / ponITech (ponitech.pro)
 * @license MIT
 */

const DEFAULTS = {
  length: 6,
  width: 180,
  height: 52,
  chars: "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789@#$&",
  noiseLines: 6,
  noiseDots: 40,
  fonts: ["cursive", "fantasy", "serif"],
  background: ["#e8e4dd", "#d4cfc7"], // gradient start / end
  caseSensitive: true,
};

class CaptchaCanvas {
  /**
   * @param {string|HTMLCanvasElement} target  CSS selector or <canvas> element
   * @param {object}                   options  Override any DEFAULTS key
   */
  constructor(target, options = {}) {
    // Resolve canvas element
    if (typeof target === "string") {
      this._canvas = document.querySelector(target);
    } else if (target instanceof HTMLCanvasElement) {
      this._canvas = target;
    } else {
      throw new Error(
        "[canvas-captcha] target must be a CSS selector or <canvas> element",
      );
    }

    if (!this._canvas) {
      throw new Error(`[canvas-captcha] element not found: ${target}`);
    }

    this._opts = Object.assign({}, DEFAULTS, options);
    this._canvas.width = this._opts.width;
    this._canvas.height = this._opts.height;
    this._ctx = this._canvas.getContext("2d");
    this._value = "";

    this.refresh();
  }

  // ─── Private helpers ──────────────────────────────────────────────────────

  _rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  _randColor(minV = 0, maxV = 140) {
    const v = () => this._rand(minV, maxV);
    return `rgb(${v()},${v()},${v()})`;
  }

  _generateValue() {
    const { chars, length } = this._opts;
    let result = "";
    for (let i = 0; i < length; i++) {
      result += chars.charAt(this._rand(0, chars.length - 1));
    }
    return result;
  }

  _draw(value) {
    const {
      width: W,
      height: H,
      noiseLines,
      noiseDots,
      fonts,
      background,
    } = this._opts;
    const ctx = this._ctx;

    // Background gradient
    const grad = ctx.createLinearGradient(0, 0, W, H);
    grad.addColorStop(0, background[0]);
    grad.addColorStop(1, background[1] || background[0]);
    ctx.fillStyle = grad;
    if (ctx.roundRect) {
      ctx.roundRect(0, 0, W, H, 10);
    } else {
      ctx.rect(0, 0, W, H);
    }
    ctx.fill();

    // Noise lines
    for (let i = 0; i < noiseLines; i++) {
      ctx.beginPath();
      ctx.moveTo(this._rand(0, W), this._rand(0, H));
      ctx.lineTo(this._rand(0, W), this._rand(0, H));
      ctx.strokeStyle = this._randColor(120, 190);
      ctx.lineWidth = this._rand(1, 2);
      ctx.stroke();
    }

    // Noise dots
    for (let i = 0; i < noiseDots; i++) {
      ctx.beginPath();
      ctx.arc(
        this._rand(0, W),
        this._rand(0, H),
        this._rand(1, 2),
        0,
        Math.PI * 2,
      );
      ctx.fillStyle = this._randColor(100, 180);
      ctx.fill();
    }

    // Characters
    const charW = W / (value.length + 1);
    for (let i = 0; i < value.length; i++) {
      const x = charW * (i + 0.8) + this._rand(-4, 4);
      const y = H / 2 + this._rand(-6, 6);
      const angle = (this._rand(-20, 20) * Math.PI) / 180;
      const size = this._rand(22, 28);
      const font = fonts[this._rand(0, fonts.length - 1)];

      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle);
      ctx.font = `bold ${size}px ${font}`;
      ctx.fillStyle = this._randColor(0, 80);
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.shadowColor = "rgba(0,0,0,.25)";
      ctx.shadowBlur = 2;
      ctx.shadowOffsetX = 1;
      ctx.shadowOffsetY = 1;
      ctx.fillText(value[i], 0, 0);
      ctx.restore();
    }
  }

  // ─── Public API ───────────────────────────────────────────────────────────

  /**
   * Generate a new CAPTCHA and redraw the canvas.
   * @returns {CaptchaCanvas} this — chainable
   */
  refresh() {
    this._value = this._generateValue();
    this._draw(this._value);
    return this;
  }

  /**
   * Check whether the user's input matches the current CAPTCHA.
   * @param   {string}  input
   * @returns {boolean}
   */
  verify(input) {
    if (typeof input !== "string") return false;
    const a = this._opts.caseSensitive ? input : input.toLowerCase();
    const b = this._opts.caseSensitive
      ? this._value
      : this._value.toLowerCase();
    return a === b;
  }

  /**
   * Returns the canvas element (useful for custom styling or placement).
   * @returns {HTMLCanvasElement}
   */
  getCanvas() {
    return this._canvas;
  }
}

export default CaptchaCanvas;
export { CaptchaCanvas };
