/* 
# 010
Tags: polyfill, dom, html
Lib/Fwk: web components polyfill
Source: https://github.com/webcomponents/webcomponentsjs/blob/master/webcomponents-loader.js
*/

(function () {
  // IIFE
  'use strict';

  window.WebComponents = window.WebComponents || {};
  // avoid overriding
  var name = 'webcomponents-loader.js';

  var polyfills = [];
  // initalize polyfills array - by default no polyfill needed
  // in what follows we detect what features need to be polyfilled

  if (!('import' in document.createElement('link'))) {
    // create link html element on the fly
    // check if has 'import' on it or its prototype chain. `in` is an operator that does exactly that (note how we need "" around the ppty name).
    // if not that means we need the "hi" (= html imports) polyfill, so push it onto the array
    polyfills.push('hi');
  }
  // [....] similar stuff
  if (!window.customElements || window.customElements.forcePolyfill) {
    // looks like there is an option to enforce polyfills to be applied event if window.customElements IS present - probably to polyfill a partial/shoddy implementation
    polyfills.push('ce');
  }
  if (!('content' in document.createElement('template')) || !window.Promise || !Array.from ||
    !(document.createDocumentFragment().cloneNode() instanceof DocumentFragment)) {
    // if no templating feature
    // or no ES6 (window.promise, Array.from)
    // yes, Array.from() is ES6. It creates a new Array instance from an array-like/iterable object (for example an HTML NodeList!)
    polyfills = ['lite'];
    // need the "lite" polyfill
    // which is "the full suite of polyfills, called `lite` for legacy reasons" (src: original code comments)
  }
  // ........ to be continued!
})();