/* 
# 005
Tags: closure, first-class functions, higher-order functions
Lib/Fwk: Redux
Source: https://github.com/reactjs/redux/blob/master/src/bindActionCreators.js
*/

function bindActionCreator(actionCreator, dispatch) {
  // an action creator is a f that creates an action object
  // {type: "XXX", payload: x}
  // e.g.
  // updateIdeasFetchStatus(ideasFetchStatus) {
  //   return {
  //     type: "UPDATE_IDEAS_FETCH_STATUS",
  //     payload: ideasFetchStatus
  //   }
  // }
  // wrap the actionCreator function into a dispatch call
  return function() {
    return dispatch(actionCreator.apply(this, arguments))
  }
}


// * Turns an object whose values are action creators, into an object with the
// * same keys, but with every function wrapped into a `dispatch` call so they
// * may be invoked directly. This is just a convenience method, as you can call
// * `store.dispatch(MyActionCreators.doSomething())` yourself just fine.
// *

// store.dispatch(MyActionCreators.doSomething())