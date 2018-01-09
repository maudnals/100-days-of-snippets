/* 
# 002
Tags: composition, reducer, closures
Lib/Fwk: Redux
Source: https://github.com/reactjs/redux/blob/master/src/compose.js
*/

/**
 * Composes single-argument functions from right to left. The rightmost
 * function can take multiple arguments as it provides the signature for
 * the resulting composite function.
 *
 * @param {...Function} funcs The functions to compose.
 * @returns {Function} A function obtained by composing the argument functions
 * from right to left. For example, compose(f, g, h) is identical to doing
 * (...args) => f(g(h(...args))).
 */

export default function (...funcs) {
  // ...func = spread operator, so that x,x,x arguments list is becomes directly accessible as an array func.
  // all of what follows is similar to an "if, else if, else" but with a lighter syntax (returns return).

  if (funcs.length === 0) {
    return arg => arg;
    // given that compose() is all about functions: if no argument, return a function anyway
    // (namely the simplest function ever, the identity function)
  }

  if (funcs.length === 1) {
    // if one argument, well a function compose w itself is just itself, so return it
    return funcs[0];
  }

  return funcs.reduce((a, c) => ((...args) => a(c(...args)) ));
}