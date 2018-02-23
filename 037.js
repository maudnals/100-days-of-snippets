"never render to body"

/* 
# 037
Tags: DOM, render
Lib/Fwk: Hyperapp
Source: 
https://github.com/hyperapp/hyperapp/blob/master/src/index.js
*/

function render() {
  renderLock = !renderLock

  var next = view(globalState, wiredActions)
  /**
   * container = an HTML element in which the hyperapp will be rendered.
   * In real life, never use HTML `body` as container! 
   * One shouldn't render to body, because everybody knows about it and everybody updates it -
   * Google Font Loader, 3rd parties, social media, ... (see READMEE for details).
   */
  if (container && !renderLock) {
    rootElement = patch(container, rootElement, oldNode, (oldNode = next))
    // firstRender determines 
    firstRender = false
  }
  // lifecycleStack is the stack listing all lifecycle events in an element's life
  // probably that's what is used to add hooks
  while ((next = lifecycleStack.pop())) next()

  // while (lifecycleStack.pop()) {
  //   lifecycleStack.pop()()
  // } 
}