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
   * Google Font Loader, 3rd partiy scripts, social media, ... (see READMEE for details).
   */
  if (container && !renderLock) {
    /*
    * (oldNode = next): this syntax is just for concision.
    -----
    instead of:
    temp = oldNode
    oldNode = next;
    rootElement = patch(container, rootElement, temp, next)
    -----
    we do: 
    rootElement = patch(container, rootElement, oldNode, oldNode = next)
    It's shorter, more elegant, and makes sense from the flow 
    perspective because in the end the variable reassignment
    is done *for* (*through*) this function call
     */
    // oldNode = next; 
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