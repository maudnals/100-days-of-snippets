/* 
# 011
Tags: polyfill, dom, html
Lib/Fwk: web components polyfill
Source: https://github.com/webcomponents/webcomponentsjs/blob/master/webcomponents-loader.js
*/

(function () {
  // IIFE
  'use strict';

  window.WebComponents = window.WebComponents || {};
  var name = 'webcomponents-loader.js';

  // [...] See previous code at #10

  if (polyfills.length) {
    // select the web components loader script (= itself)
    var script = document.querySelector('script[src*="' + name + '"]');
    // create a concatenated string for polyfill src that looks like webcomponents-feature1-feature2.js
    // 🏁 indeed polyfills are called webcomponents-hi-sd-ce.js for example
    var newScript = document.createElement('script');
    var replacement = 'webcomponents-' + polyfills.join('-') + '.js';
    // set src of the new script (= polyfill to be added)
    var url = script.src.replace(name, replacement);
    newScript.src = url;
    /* document.readyState: can be... 
    "loading" 
    "interactive" (doc itself is loaded and parsed but sub-resources i.e. img and css are still loading) 
    "complete" (everything is loaded and the load event is about to fire)
    ---
    'import' in document.createElement('link'): a way to check for the presence of html imports feature in the browser */
    if (document.readyState === 'loading' && ('import' in document.createElement('link'))) {
      // if so, we load the polyfill script as html import
      // outerHTML: serialized HTML fragment describing the element including its descendants
      document.write(newScript.outerHTML);
    } else {
      // otherwise just add is as a normal script element (in the head)
      document.head.appendChild(newScript);
    }
  }
})();