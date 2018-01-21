/* 
# 014
Tags: listener (observer pattern), async
Lib/Fwk: redux
Source: https://github.com/reactjs/redux/blob/master/src/createStore.js
*/


function dispatch(action) {
  if (!isPlainObject(action)) {
    /* 
    ---
    how does "plain objects" relate to "async actions"?
    Let's first go back to the definition of an action in redux:
    It's an object that represents an intention to change the state.
    It must have a type (a string const). 
    Actions are the only way to modify the state.
    Following that definition, an action must be a plain object.
    In the past,it happened that redux users tried to dispatch an async action,
    for example as a Premise.
    But premises are not plain objects (see #001) 
    ---
    Why does redux want us to 'Use custom middleware for async actions.'?
    Actually, why would i need async actions?
    Well first, it's totally OK to make a container component call an async API, and then dispatch the action.
    i.e. to dispatch an action asynchronously.
    Like such (#A):
    // getFieldValue is a promise
    AsyncApi.getFieldValue().then(result => dispatch({
        type: ActionTypes.UPDATED,
        payload: result
    }));
    A little better (#B) is to separate the action creator:

    that would be inconvenient in a large app because:
    - you’ll have different components performing the same actions.
    - you might want to debounce some actions (just like event debouncing - when 100* the same action type comes at the same type 
    i might want to dispatch just one)
    - you migh want to keep some local state like auto-incrementing IDs close to action creators (meaning: in order to do
      so action creators need to be separate functions).
    So it is just easier from the maintenance point of view to extract action creators into separate functions.
https://stackoverflow.com/questions/34570758/why-do-we-need-middleware-for-async-flow-in-redux?noredirect=1&lq=1

    */

    throw new Error(
      'Actions must be plain objects. ' +
      'Use custom middleware for async actions.'
    )
  }

  // [... function continues]
}