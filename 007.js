/* 
# 007
Tags: composition
Lib/Fwk: Redux
Source: https://github.com/reactjs/redux/blob/master/src/applyMiddleware.js
*/


// a middleware is a custom function that is applied between two library steps - same concept as a hook in the frontend.
// middlewares: an array of middleware functions
const middlewareAPI = {
  x: 5
  // getState: store.getState,
  // dispatch: (...args) => dispatch(...args)
}

let chain = [];
let middlewares = [
  function () {
    console.log("1st middleware");
  },
  function () {
    console.log("2nd middleware");
  }
];
// modify middlewares signature to always pass them a redux-defined APIs
// chain = middlewares.map(function (middleware) { return middleware(middlewareAPI); });
chain = middlewares.map(middleware => middleware(middlewareAPI));
// left-to-right. 
// if chain = [f1, f1, f3] (array of middleware functions): compose(...chain) --> f1 o f2 o f3 (composed)
dispatch = compose(...chain)(store.dispatch);