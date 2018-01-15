/*
# 008
Tags: exceptions, errors
Lib/Fwk: Redux
Source: https://github.com/reactjs/redux/blob/master/src/createStore.js
*/

function subscribe(listener) {
  if (typeof listener !== 'function') {
    throw new Error('Expected listener to be a function.');
  }
  // if listener type is incorrect, execution of this function will stop right after the throw statement.
  // "control will be passed to" (i.e. execution will continue at) the first catch block in the call stack
}