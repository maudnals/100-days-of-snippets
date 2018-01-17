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
  // ........ to be continued!
})();