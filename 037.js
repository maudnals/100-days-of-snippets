"never render to body"


/**
 * container = an HTML element that will contain the hyperpp.
 * In real life, never make body the container! 
 * One shouldn't render to body
 * because everybody knows about it and everybody updates it
 */

function render() {
  renderLock = !renderLock

  var next = view(globalState, wiredActions)
  // if render is not locked and there's a container to render into
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