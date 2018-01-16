/* 
# 001
Tags: object, prototype
Lib/Fwk: Redux
Source: https://github.com/reactjs/redux/blob/master/src/utils/isPlainObject.js
*/

// Note: a plain object in JS is the simplest kind of object: a set of key-value pairs, created by the {} object literal notation or constructed with new Object().
export default function isPlainObject(obj) {
  if (typeof obj !== "object" || obj === null) {
    // check obj is of OBJECT type: 
    // its type must be "object" (all primitives have their stringified type as type, including undefined)
    // AND it must not be "null" (JS bug: typeof null = "object")
    return false;
    // if obj is not of object type, then we already know it's not a plain object.
    // execution stops here and false is returned.
  }
  let proto = obj;
  // initialize proto to obj
  while (Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto);
    // "Object" is JS's built-in Base Object.
    // Here we're basically travelling down the prototype chain down to second last node (the very last node is always null).
    // myObj ---> {} (__proto__) ---> {} (__proto__) --> (...) --> null
    // proto is the object's prototype, i.e. __proto__ (also referred to as [[Prototype]] in MDN docs)
  }
  // so proto is what the object is at its root level - on the most "left" of the object definition
  // (not to be confused with object deep ppties! object depth !== prototype chain depth)
  // WHATS AT THE BOTTOM OF THE PROTOTYPE CHAIN IS WHAT THE OBJECT IS AT ITS BASIC LEVEL (doesn't matter what's inside)
  
  // so if we have a plain object, proto should be the pure __proto__ of a normal object
  // i.e. the same proto as an object that is typeof "object"... such as obj

  return (Object.getPrototypeOf(obj) === proto);
}
// isPlainObject(["one", "two"]) // false
// isPlainObject(new Date()) // false
// isPlainObject({name: "john", addresses: []}) // true