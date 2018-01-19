/* 
# 012
Tags: closures, state, listener (observer pattern)
Lib/Fwk: redux
Source: https://github.com/reactjs/redux/blob/master/src/createStore.js
*/

// actions are objects as follows:
// {
//   type: "HIDE_NOTIFICATION", 
//   payload: myText
// }
// which makes me realize... an action should always be a verb, that's why it's called action.
// is my "UPDATE_IS_DESCRIPTION_EXPANDED" wrong?
// ... no, it's fine, it's just the naming and the way it's used.
// probably it would be better to have two actions called IDEA_DESCRIPTION::EXPAND and IDEA_DESCRIPTION::COLLAPSE that would both, once dispatched, act on the same boolean isDescriptionExpanded.

function dispatch(action) {

  if (!isPlainObject(action)) {
    // an action itself can not be a promise or an observable.
    // if needed, wrap it in a middleware.
    // looks like this is mostly for cleanness.
    throw new Error(
      'Actions must be plain objects. ' +
        'Use custom middleware for async actions.'
    )
  }

  if (typeof action.type === 'undefined') {
    // must throw error here because that's a big user issue, a wrong type will prevent data updates so mustn't fail silently.
    // also shows the importance of having redux actions defined centrally as const variables to avoid typos
    throw new Error(
      'Actions may not have an undefined "type" property. ' +
        'Have you misspelled a constant?'
    )
  }

  if (isDispatching) {
    throw new Error('Reducers may not dispatch actions.')
  }

  try {
    isDispatching = true
    // state = reducer(state, action)
    currentState = currentReducer(currentState, action)
  } finally {
    // finally statement execute code after a try/catch, no matter the result
    // no matter whether the dispatch failed or succeeded, it's over.
    isDispatching = false
  }

  const listeners = (currentListeners = nextListeners)
  for (let i = 0; i < listeners.length; i++) {
    const listener = listeners[i]
    listener()
  }

  return action
}