/* 
# 036
Tags: framework main function, state, actions
Lib/Fwk: Hyperapp
Source: 
https://github.com/hyperapp/hyperapp/blob/master/src/index.js
*/

// -------------------
// myApp
// -------------------

const actions = {
  down: value => state => ({ count: state.count - value }),
  up: value => state => ({ count: state.count + value })
}
const state = {
  count: 0
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
  // clone the state object
  var globalState = clone(state)
  // clone the actions object
  var wiredActions = clone(actions)

  scheduleRender(wireStateToActions([], globalState, wiredActions))
  return wiredActions

  function wireStateToActions(path, state, actions) {
    for (var key in actions) {
      typeof actions[key] === "function"
        ?
        // IIFE for on-the-fly conditional execution, closure-based
        (function (key, action) {
          actions[key] = function (data) {
            // on-the fly initialization of `data` arg
            // data = currentCounterValue (number)
            if (typeof (data = action(data)) === "function") {
              data = data(get(path, globalState), actions)
            }
            if (
              data &&
              data !== (state = get(path, globalState)) &&
              !data.then // Promise
            ) {
              scheduleRender(
                (globalState = set(path, clone(state, data), globalState))
              )
            }
            return data
          }
        })(key, actions[key])
        :
        wireStateToActions(
          path.concat(key),
          (state[key] = state[key] || {}),
          (actions[key] = clone(actions[key]))
        )
    }
  }
  // ...
}

/*
  get is used to get the path of a resource in a given source (the state) i think (like in polymer redux)
  path = array
  source = object
*/

const state = {
  count: 0,
  owner: {
    name: "maud",
    age: 26
  }
}

function get(path, source) {
  for (var i = 0; i < path.length; i++) {
    source = source[path[i]]
  }
  return source
}


get(path, globalState)