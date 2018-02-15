/* 
# 033
Tags: framework head function
Lib/Fwk: Hyperapp
Source: 
https://github.com/hyperapp/hyperapp/blob/master/src/index.js
*/


// -------------------
// myApp
// -------------------

// What I write (JSX)
// const view = (state, actions) => (
//   <div>
//     <h1>{state.count}</h1>
//     <button onclick={() => actions.down(1)}>-</button>
//     <button onclick={() => actions.up(1)}>+</button>
//   </div>
// )

// What is compiled by babel
// const view = (state, actions) =>
//   h("div", {}, [
//     h("h1", {}, state.count),
//     h("button", { onclick: () => actions.down(1) }, "-"),
//     h("button", { onclick: () => actions.up(1) }, "+")
//   ])

// Note how at start of my app file I still need to import h
// Even though only babel needs it, not me:
// import { h } from "hyperapp"



// -------------------
// hyperapp framework
// -------------------

export function h(name, attributes /*, ...rest*/) {
  var node
  var rest = []
  var children = []
  var length = arguments.length

  while (length-- > 2) rest.push(arguments[length])

  while (rest.length) {
    if ((node = rest.pop()) && node.pop /* Array? */) {
      for (length = node.length; length--;) {
        rest.push(node[length])
      }
    } else if (node != null && node !== true && node !== false) {
      children.push(node)
    }
  }

  return typeof name === "function"
    ? name(attributes || {}, children)
    : {
      nodeName: name,
      attributes: attributes || {},
      children: children,
      key: attributes && attributes.key
    }

  /**
   * if name is not a function (like in all of our cases above), what will be returned from h is:
   * {
   *  nodeName: "h1",
   *  attributes: {},
   *  children: [state.count], // potentially an array children: [state.count, xxx]
   *  key: false
   * }
   * or 
   * {
   *  nodeName: "button",
   *  attributes: { onclick: () => actions.down(1), plusPotentiallyOthers },
   *  children: ["-"],
   *  key: false
   * }
   */
}