/* 
# 005
Tags: closure, first-class functions, higher-order functions
Lib/Fwk: Redux
Source: https://github.com/reactjs/redux/blob/master/src/bindActionCreators.js
*/

function bindActionCreator(actionCreator, dispatch) {
  // an action creator is a f that creates an action object {type: "XXX", payload: x}
  // return a function without invoking it (the input is also a function). Here function is needed so we can wrap the invokation. => in order to wrap a function b into another one a, we need f() {b(a);}.
  return function () {
    // redux syntax should be: dispatch(action)
    // `dispatch(actionCreator);` // NO, obviously - dispatch needs to be given an action object as argument!
    // so: `dispatch(actionCreator());` // NO won't work, because that would call my action creator without arguments, but an action creator needs to be given a payload.
    // so: need for `.apply()`. syntax: `func.apply(thisArg, argsArray)`. `argsArray` = An array-like object, specifying the arguments with which func should be called, or null or undefined if no arguments should be provided to the function.
    // so: simply use arguments (and as we need arguments to be understood by the engine, provide also this in the function call)
    // `arguments` is what is given to `our anonymous function()`, i.e. to any so-created `boundActionCreator` (since `boundActionCreator` = `our anonymous function()`). EVEN IF WE DON'T SEE IT, `arguments` IS HERE - more exactly, it WILL be here when once `boundActionCreator` is invoked (because it will be created with function's execution context), and naturally it will be equal to the `arguments` given to `boundActionCreator`.
    // so `arguments` enables us to access whatever arguments will a so-created boundActionCreator be called with.
    // what about `this` ? `this` is here so the signature is correct, and its value is just the normal this. here we do this=this, that's useless but needed for the signature.
    // So the syntax `actionCreator.apply(this, arguments)` is really just a way to write in the code specific variables that will be made available when `anonymous function()` will be invoked (execution context).
    dispatch(actionCreator.apply(this, arguments));
    // oh, and on top of that we can also make `anonymous function` return the action object for consistency (since IRL, `dispatch` returns the action object, so here we would do: `return dispatch(actionCreator.apply(this, arguments));`

  }
}


// TEST

function actionCreatorUpdateNumber(number) {
  return {
    type: "UPDATE_NUMBER",
    payload: number
  };
}

function dispatch(action) {
  console.log(`dispatching action ${action.type} with payload ${action.payload}`);
}

function test() {
  const boundActionCreator = bindActionCreator(actionCreatorUpdateNumber, dispatch);
  boundActionCreator(42);
}

test();


// * Turns an object whose values are action creators, into an object with the
// * same keys, but with every function wrapped into a `dispatch` call so they
// * may be invoked directly. This is just a convenience method, as you can call
// * `store.dispatch(MyActionCreators.doSomething())` yourself just fine.
// *

// store.dispatch(MyActionCreators.doSomething())