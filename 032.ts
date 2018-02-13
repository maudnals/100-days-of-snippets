/* 
# 032
Tags: typing, API
Lib/Fwk: Hyperapp
Source: 
https://github.com/hyperapp/hyperapp/blob/master/hyperapp.d.ts
*/

/**
 * ----
 * What is it?
 * ----
 * It's called a declaration ("d") file.
 * ----
 * What is it for?
 * ----
 * For third-party TypeScript developers.
 * It provides TypeScript with type informations about a JS API.
 * It gives us the benefits of static typing while still havingç simply JS code.
 * ----
 * How is it created?
 * ----
 * - Written by hand
 * - Generated from a TypeScript file automatically (only signatures of the types which are exported)
 * ----
 * How to map a *.d.ts file to a js file?
 * ----
 * Before: one had to reference the file explicitly using: //<reference path="path/to/file.d.ts" />
 * Now: automatic with the TypeScriptCompile option?
 */


export as namespace Hyperapp

// ...

 /** The app() call creates and renders a new application.
 *
 * @param state The state object.
 * @param actions The actions object implementation.
 * @param view The view function.
 * @param container The DOM element where the app will be rendered to.
 * @returns The actions wired to the application.
 * @memberOf [App]
 */
export function app<State, Actions>(
  state: State,
  actions: ActionsType<State, Actions>,
  view: View<State, Actions>,
  container: Element | null
): Actions


/** @namespace [JSX] */

declare global {
  namespace JSX {
    interface Element<Data> extends VNode<object> {}
    interface IntrinsicElements {
      [elemName: string]: any
    }
  }
}