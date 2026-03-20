import terser from "@rollup/plugin-terser";

const banner = `/*!
 * canvas-captcha v1.0.0
 * Lightweight canvas-based CAPTCHA widget — zero dependencies
 * (c) ${new Date().getFullYear()} Nikola Popovic / ponITech (ponitech.pro)
 * Released under the MIT License
 */`;

export default [
  // ESM — for bundlers (Vite, Webpack, Rollup)
  {
    input: "src/index.js",
    output: {
      file: "dist/canvas-captcha.esm.js",
      format: "es",
      banner,
    },
  },

  // CommonJS — for Node.js / older bundlers
  {
    input: "src/index.js",
    output: {
      file: "dist/canvas-captcha.cjs.js",
      format: "cjs",
      exports: "named",
      banner,
    },
  },

  // UMD minified — for direct <script> tag usage in browser
  {
    input: "src/index.js",
    plugins: [terser()],
    output: {
      file: "dist/canvas-captcha.umd.min.js",
      format: "umd",
      name: "CaptchaCanvas",
      exports: "named",
      banner,
    },
  },
];
