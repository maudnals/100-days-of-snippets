/* 
# 006
Tags: environments, node
Lib/Fwk: Redux
Source: https://github.com/reactjs/redux/blob/master/src/combineReducers.js
*/


if (process.env.NODE_ENV !== 'production') {
  /* here we encounter again process.env.NODE_ENV
  here it's used as a flag to display an alert in dev only.
  ----
  What is process.env.NODE_ENV used for?
  process is a global (in node environment, not browser) variable.  
  process.env.NODE_ENV gives infos about the environment, 'production' or 'development'.
  process.env.NODE_ENV was invented/popularized by express (a node framework), 
  and historically was used by the server side only. 
  Later, as build processes grew more complex, it became interesting to display certain alerts only in DEV for example, 
  so the need for environment knowledge grew for frontend devs.
  And since the frontend build process was node-based, devs reused the same concept/abstraction `process.env.NODE_ENV`.
  ----
  🏁
  Where does the value of process.env.NODE_ENV comes from? 
  On the server: process.env.NODE_ENV really exists on the OS (when defined by the user) - it's really an environment 
  variable on the machine, set by the user and then made available through express. 
  But in the frontend: it's artificially defined/set by the build tools - see for example in redux's package.json: 
  build:umd": "cross-env BABEL_ENV=es NODE_ENV=development rollup -c -o dist/redux.js */
  if (typeof reducers[key] === 'undefined') {
    warning(`No reducer provided for key "${key}"`)
  }
}