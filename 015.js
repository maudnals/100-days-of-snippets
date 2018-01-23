/* 
# 015
Tags: actions, code splitting, hot reloading
Lib/Fwk: redux
Source: https://github.com/reactjs/redux/blob/master/src/createStore.js
*/


/**
 * Replaces the reducer currently used by the store to calculate the state.
 *
 * You might need this if your app implements code splitting and you want to
 * load some of the reducers dynamically. You might also need this if you
 * implement a hot reloading mechanism for Redux.
 *
 * @param {Function} nextReducer The reducer for the store to use instead.
 * @returns {void}
 */
/*"You might need this if your app implements code splitting and you want to load some of the reducers dynamically"
=> then only the useful reducer will be loaded at once, and the end user enters a different part of the app, yet another will be. Performance improvement.
"Or to do hot reloading"
=> whenever the dev changes the reducer implementation, the replaceReducer needs to be called by the hot reloader to replace in-place.
 * */
function replaceReducer(nextReducer) {
  if (typeof nextReducer !== 'function') {
    throw new Error('Expected the nextReducer to be a function.')
  }

  currentReducer = nextReducer
  /* ActionTypes.REPLACE = a private action type reserved by Redux.
  ---
  btw, the replace action string it's randomly generated
  and looks like: @@redux/REPLACE1.6.8.2.0.m.6
  ---
  Why?
  Is it to simulate privacy?
  Is it for ID generation?
  ---
  Where is ActionTypes.REPLACE checked against? 
  Hmm nowhere else in the code - or actually just at one place for checking.
  This action is dispatched but the data change is done already.
  So this looks more like an internal tracking thing, maybe to be used by external libs/tools such as the hot reloader (who can intercept REPLACE and then), and also for history tools.
  */
  dispatch({ type: ActionTypes.REPLACE })
}