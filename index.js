
/* 
# 001
Tags: object, prototype
Lib/Fwk: Redux
Source: https://github.com/reactjs/redux/blob/master/src/utils/isPlainObject.js 
*/

export default function isPlainObject(obj) {
  if (typeof obj !== "object" || obj === null) {
    // check obj is of OBJECT type: 
    // its type must be "object" (all primitives have their stringified type as type, including undefined)
    // AND it must not be "null" (JS bug: typeof null = "object")
    return false;
    // if obj is not of object type, then we already know it's not a plain object.
    // execution stops here and false is returned.
  }
  let proto = Object.getPrototypeOf(obj);
  // "Object" is JS's built-in Base Object.
  // proto 
  // while (proto !== null)
}