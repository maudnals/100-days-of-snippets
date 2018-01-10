/* 
# 003
Tags: node, environment
Lib/Fwk: Redux
Source: https://github.com/reactjs/redux/blob/master/src/index.js
*/

// create an empty dummy function that does nothing
function isCrushed() {}

function isCrushed() {}
if (
  process.env.NODE_ENV !== 'production' &&
  typeof isCrushed.name === 'string' &&
  isCrushed.name !== 'isCrushed'
  // access the function object's "name" ppty
  // if it's a string (i.e. if the function isn't anonymous as that would be isCrushed.name = undefined) but is not "isCrushed"
  // it means it has been minified
  // i.e. the function has been minified and NODE_ENV !== 'production', that's not good
) {
  // it has been minified > throw warning to the user
  // (warning has been imported in imports)
  warning(
    "You are currently using minified code outside of NODE_ENV === 'production'. " +
      'This means that you are running a slower development build of Redux. ' +
      'You can use loose-envify (https://github.com/zertosh/loose-envify) for browserify ' +
      'or DefinePlugin for webpack (http://stackoverflow.com/questions/30030031) ' +
      'to ensure you have the correct code for your production build.'
  )
}