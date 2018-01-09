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

  return funcs.reduce((a, c) => ((...args) => a(c(...args))));

  // the goal is to compose functions, ie to transform funcs into one single function that's the composition of them all
  // a = accumulator (all composed functions so far)
  // c = currentValue (the current func from funcs)
  // ((...args) => a(c(...args))) is the composed function of a and c // (...args are just regular arguments).
  // remember, doing a().b() doesn't make sense, we don't want to invoke the functions here - we just want to return a new function object.
}