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

/* an action should always be a verb, that's why it's called action.
Is my "UPDATE_IS_DESCRIPTION_EXPANDED" wrong?
... no, it's fine, it's just the naming and the way it's used.
probably it would be better to have two actions: 
IDEA_DESCRIPTION::EXPAND and IDEA_DESCRIPTION::COLLAPSE 
which would both, once dispatched, act on the same boolean isDescriptionExpanded.*/

function dispatch(action) {

  // ---- STEP 1 - VALIDATE ACTION OBJECT

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
    // must throw explicit error here because that's a big user issue, a wrong type will prevent data updates so mustn't fail silently.
    // also shows the importance of having redux actions defined centrally as const variables to avoid typos
    throw new Error(
      'Actions may not have an undefined "type" property. ' +
      'Have you misspelled a constant?'
    )
  }

  if (isDispatching) {
    // if isDispatching is true, it means that: 
    /* even though i'm currently executing a dispatch (up the stack), somewhere below in the stack there's another dispatch call. 
    Which paused in order to execute, since JS is single threaded async.
    And which paused while isDispatching was true apparently, since we're entering this block. 
    And the only place where that's possible is in the block below where isDispatching is set to true, 
    And oh the function that's called there is a reducer. 
    So it means dispatch was called by a reducer.
    Hence the message new Error('Reducers may not dispatch actions.').
    ---
    OK, so this whole `isDispatching` thing is here just to prevent devs from making Reducers dispatch actions. 
    Why do we want to avoid that?
    Because reducers must be pure functions and have no side effect.
    https://github.com/reactjs/redux/blob/master/docs/api/Store.md:
    "You are disallowed to dispatch inside the reducers because they must have no side effects.
    If you want to cause a side effect in response to an action, the right place to do this is in the potentially async action creator." 
    (this has nothing to do with an infinite loop as i thought, since the reducers would be different ones obviously, 
    // and if they are the infinite loop is on the user's side)
    OK makes sense.
    ---
    🏁
    Both dispatch() execution contexts have access to isDispatching (defined outside of dispatch()) 
    thanks to closures: dispatch has closed isDispatching in.
    Another nice use of closure: access to the call stack's state.*/
    throw new Error('Reducers may not dispatch actions.')
  }

  // ---- STEP 2 - CREATE NEW VERSION OF THE STATE: pass state and action into the reducer, and save the returned state.

  try {
    isDispatching = true
    // state = reducer(state, action)
    // interesting how `current` make it VERY clear about preloadedState vs currentState
    // NB: as always reducer is user-defined function that must be pure and return an new state object with Object.assign. (previousState, action) => newState.
    currentState = currentReducer(currentState, action)
  } finally {
    // finally statement execute code after a try/catch, no matter the result. indeed no matter whether the dispatch failed or succeeded, it's over.
    isDispatching = false
  }

  // STEP 3 - trigger all listeners in the store ("hey, state has been updated)

  // listeners that have been subscribed by the user to be used as callbacks.
  // a = (b = c) ==> a is b is c
  // btw = operator associativity is right to left anyway so () is redundant I think
  const listeners = (currentListeners = nextListeners)
  for (let i = 0; i < listeners.length; i++) {
    // call all listeners (why don't they simply listeners[i]() ? not sure.)
    /*
    But wait why isn't there also here a check here that isDispatching should be false?
    No need. As documented there https://github.com/reactjs/redux/blob/master/docs/api/Store.md: 
    "In Redux, subscriptions are called after the root reducer has returned the new state, so you may dispatch in the subscription listeners.
    OK sure, when we're here currentState has been updated already, so it's no issue calling yet another dispatch
    */
    const listener = listeners[i]
    listener()
  }

  // makes sense to return the action
  return action
}