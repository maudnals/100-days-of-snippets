/* 
# 035
Tags: framework main function
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
  var globalState = clone(state)

  var wiredActions = clone(actions)

  scheduleRender(wireStateToActions([], globalState, wiredActions))

  return wiredActions

  // ...
}


// shallow copy of an object's OWN ppties (IN = SHALLOW, OWN, KEYS)
// obj[i] = xxx IN is FOR KEYS
function clone(target, source) {
  // if two arguments then the return value is the two objects merged into one
  var obj = {}
  for (var i in target) obj[i] = target[i]
  for (var i in source) obj[i] = source[i]
  return obj
}