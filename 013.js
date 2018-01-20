/* 
# 013
Tags: listener (observer pattern), arrays, mutations
Lib/Fwk: redux
Source: https://github.com/reactjs/redux/blob/master/src/createStore.js
*/

export default function createStore(reducer, preloadedState, enhancer) {
  // [...]
  let currentListeners = []
  let nextListeners = currentListeners

  function ensureCanMutateNextListeners() {
    /* 
    redux is all about immutability. 
    So whenever adding a listener,
    instead of mutating the listeners array we'd rather copy it and append the new listener to the copy.
    The listeners array is called currentListeners and its copy nextListeners.
    Because initially nextListeners === currentListeners,
    the line below need to be applied once (at least).
    ----
    ❓
    But why do we need both `nextListeners` and `currentListeners`?
    Why not just one `listeners` array that we would never mutate directly, 
    but always update by creating a new copy?
    Like so:
    // add a listener:
    listeners = [...listeners, newListener];
    // WEEEELL..... if i do it this way i DO mutate listeners since i assign a new value to it!!
    // the idea is to keep it intact really.
    */
    nextListeners.splice(index, 1)

    if (nextListeners === currentListeners) {
      nextListeners = currentListeners.slice()
    }
  }

  function subscribe(listener) {
    // [...]

    // SUBSCRIBE
    ensureCanMutateNextListeners()
    nextListeners.push(listener)

    // RETURN UNSUBSCRIBE FUNCTION
    // ❓ why
    return function unsubscribe() {
      // [...]
      ensureCanMutateNextListeners()
      const index = nextListeners.indexOf(listener)
      nextListeners.splice(index, 1)
    }
  };
}



// // remove a listener:
// listeners = listeners.filter(...);
// // well... then it's mutated
// // or:
// let copy = [...listeners];
// let indexOfListenerToRemove = listeners.indexOf(listenerToRemove);
// copy.splice(index, 1); // copy is mutated in place
// listeners = copy;
//   // or: https://jaketrent.com/post/remove-array-element-without-mutating/