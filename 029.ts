/* 
# 029
Tags: function, types
Lib/Fwk: RxJS
Source: 
https://github.com/ReactiveX/rxjs/blob/master/src/internal/util/isFunction.ts
*/

export function isFunction(x: any) {
  // true:false not needed!
  return typeof x === "function";
}


export function isFunction(x: any): x is Function