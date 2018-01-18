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
    // 🏁 replace the currently running script???
    var url = script.src.replace(name, replacement);
    newScript.src = url;
    // NOTE: this is required to ensure the polyfills are loaded before
    // *native* html imports load on older Chrome versions. This *is* CSP
    // compliant since CSP rules must have allowed this script to run.
    // In all other cases, this can be async.
    // document.readyState can be "loading", "interactive" (doc itself is loaded and parsed but sub-resources i.e. img and css are still loading) or "complete" (everything is loaded and the load event is about to fire)
    if (document.readyState === 'loading' && ('import' in document.createElement('link'))) {
      document.write(newScript.outerHTML);
    } else {
      document.head.appendChild(newScript);
    }
  }
})();