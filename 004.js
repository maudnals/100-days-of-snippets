/* 
# 004
Tags: typecheck, arguments
Lib/Fwk: Redux
Source: https://github.com/reactjs/redux/blob/master/src/createStore.js
*/


export default function createStore(reducer, preloadedState, enhancer) {
  if (typeof preloadedState === 'function' && typeof enhancer === 'undefined') {
    // looks like manually inverting arguments when relevant, given that both preloadedState and enhancer are optional arguments.
    // so if the engine sees "no enhancer" but a preloadedState with the type function, then it means the user meant the second argument as  enhancer (and not as preloaded state)
    // interestingly redux doesn'use default arguments here - maybe because the pattern we see instead is more powerful / simply is the only option when several arguments are optional? 
    enhancer = preloadedState;
    preloadedState = undefined;
  }
  // ... more lines in the function
}

// 💡 Take-Away: not just here but at a lot of places, redux has typechecks used to display user warnings (good devX)
