/* 
# 005
Tags: closure, first-class functions, higher-order functions
Lib/Fwk: Redux
Source: https://github.com/reactjs/redux/blob/master/src/bindActionCreators.js
*/

function bindActionCreator(actionCreator, dispatch) {
  // an action creator is a f that creates an action object
  // {type: "XXX", payload: x}
  return function() {
    // return a function without invoking it (the input is also a function). Here function is needed so we can wrap the invokation. In order to wrap a function b into another one a we need f() {b(a)}.
    // return dispatch(actionCreator);

    // return (actionCreator.apply());
      // wrap the actionCreator function into a dispatch call
    // return dispatch(actionCreator.apply(this, arguments));
  }
}


// To test:

function actionCreatorUpdateIdea(idea) {
  return {
    type: "UPDATE_IDEA",
    payload: idea
  };
}

function dispatch(action) { 
  /* do sthg with the action */ 
  return action; 
}


// * Turns an object whose values are action creators, into an object with the
// * same keys, but with every function wrapped into a `dispatch` call so they
// * may be invoked directly. This is just a convenience method, as you can call
// * `store.dispatch(MyActionCreators.doSomething())` yourself just fine.
// *

// store.dispatch(MyActionCreators.doSomething())