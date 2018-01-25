/* 
# 017
Tags: actions
Lib/Fwk: redux
Source: https://github.com/reactjs/redux/blob/master/src/createStore.js
*/

export default function createStore(reducer, preloadedState, enhancer) {
  // getState
  // subscribe
  // dispatch
  // misc: observable, replaceReducer, etc.

  // Before returning the created store the INIT action is dispatched
  // Which calls:
  // currentState = currentReducer(currentState, action)
  // currentState = preloadedState, action = init, currentReducer = reducer
  // that fills the initial state tree
  dispatch({ type: ActionTypes.INIT });
  return {
    dispatch,
    subscribe,
    getState,
    replaceReducer,
    [$$observable]: observable
  }
}
