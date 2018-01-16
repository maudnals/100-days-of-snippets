/* 
# 009
Tags: types, control flow
Lib/Fwk: Redux
Source: https://github.com/reactjs/redux/blob/master/src/bindActionCreators.js
*/


export default function bindActionCreators(actionCreators, dispatch) {
  // if action creator is a simple function rather than an array of function, simplify implementation by directly returning bindActionCreator...
  // this is so the user doesn't have to wrap its actionCreators in an artificial object when they have just one (good API), and so that the underlying code can still rely on Object.keys(actionCreators) (and because in most cases actionCreators will be an object by default??)
  if (typeof actionCreators === 'function') {
    return bindActionCreator(actionCreators, dispatch)
  }
  // ...  

  const keys = Object.keys(actionCreators)
  const boundActionCreators = {}
  for (let i = 0; i < keys.length; i++) {
    // ...
  }
  return boundActionCreators;
}