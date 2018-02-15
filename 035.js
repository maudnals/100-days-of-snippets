/* 
# 035
Tags: framework main function, closure
Lib/Fwk: Hyperapp
Source: 
https://github.com/hyperapp/hyperapp/blob/master/src/index.js
*/


// -------------------
// myApp
// -------------------

import { h, app } from "hyperapp"

const state = {
  count: 0
}

const actions = {
  down: value => state => ({ count: state.count - value }),
  up: value => state => ({ count: state.count + value })
}
/* 
Chained arrow function = CURRYING
Currying is transforming sum(1, 2, 3) into sum(1)(2)(3), ie a sequence of functions that only take one parameter (arity=1)
So instead of:
function up (value, state) {
  return { 
    count: state.count + value
  };
}
Currying is:
function up (value) {
  return function(state) {
    return { 
      count: state.count + value
    };
  }
}
And when calling it will look like: up(value)(state)
*/

const view = (state, actions) => (
  <div>
    <h1>{state.count}</h1>
    <button onclick={() => actions.down(1)}>-</button>
    <button onclick={() => actions.up(1)}>+</button>
  </div>
)

app(state, actions, view, document.body)


// -------------------
// hyperapp framework
// -------------------

export function app(state, actions, view, container) {
  var renderLock
  var invokeLaterStack = []
  var rootElement = (container && container.children[0]) || null
  var oldNode = rootElement && toVNode(rootElement, [].map)
  // clone the state object
  var globalState = clone(state)
  // clone the actions object
  var wiredActions = clone(actions)

  scheduleRender(wireStateToActions([], globalState, wiredActions))

  return wiredActions

  // ...
}