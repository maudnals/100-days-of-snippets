/* 
# 006
Tags: environments, nide, minification
Lib/Fwk: Redux
Source: https://github.com/reactjs/redux/blob/master/src/combineReducers.js
*/


if (process.env.NODE_ENV !== 'production') {
  // here we encounter again process.env.NODE_ENV
  // here it's used as a flag to display an alert in dev only.
  // about process.env.NODE_ENV: process is a global node variable. process.env.NODE_ENV gives infos about the env, 'production' or 'development'. NODE_ENV historically was used by the server side only. But node started to be used in the frontend and as build processes grew more complex, it became interesting to display certain alerts only in DEV, for example, so the need for environment knowledge grew for frontend devs. So they reused the concept.
  // Where does process.env.NODE_ENV comes from? On the server, process.env.NODE_ENV really exists (express). But in the frontend, it's articfically defined/set by the build tools - see package.json: 
  // build:umd": "cross-env BABEL_ENV=es NODE_ENV=development rollup -c -o dist/redux.js
  if (typeof reducers[key] === 'undefined') {
    warning(`No reducer provided for key "${key}"`)
  }
}