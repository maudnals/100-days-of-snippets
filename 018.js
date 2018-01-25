/* 
# 018
Tags: loop, check, if
Lib/Fwk: redux
Source: https://github.com/reactjs/redux/blob/master/src/combineReducers.js
*/

let hasChanged = false
const nextState = {}
for (let i = 0; i < finalReducerKeys.length; i++) {
  const key = finalReducerKeys[i]
  const reducer = finalReducers[key]
  const previousStateForKey = state[key]
  const nextStateForKey = reducer(previousStateForKey, action)
  // if something wrong...
  if (typeof nextStateForKey === 'undefined') {
    const errorMessage = getUndefinedStateErrorMessage(key, action)
    // ... then thow error (this will terminate execution, unless catch)
    // ie same idea as if(){return;}... then what's below is normal execution
    throw new Error(errorMessage)
  }
  nextState[key] = nextStateForKey
  /**
   * same as:
   *    if (nextStateForKey !== previousStateForKey) { 
   *      hasChanged = true 
   *    }
   * BUT:
   * - probably more performant
   *   Because no need to check (nextStateForKey !== previousStateForKey) at each loop iteration.
   *   (if hasChanged then the syntax parser doesn't even look at what's after || )
   * - more elegant
   * - consistent hasChanged value.
   */
  hasChanged = hasChanged || nextStateForKey !== previousStateForKey
}
return hasChanged ? nextState : state