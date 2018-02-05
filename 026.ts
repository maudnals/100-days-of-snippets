/* 
# 026
Tags: arrays
Lib/Fwk: RxJS
Source: https://github.com/ReactiveX/rxjs/blob/master/src/internal/Subscription.ts
*/

/**
 * Removes a Subscription from the internal (children) list of subscriptions that will unsubscribe during the unsubscribe process of this (parent) Subscription.
 */
remove(subscription: Subscription): void {
  const subscriptions = this._subscriptions;
  if(subscriptions) {
    const subscriptionIndex = subscriptions.indexOf(subscription);
    if (subscriptionIndex !== -1) {
      // SPLICE IS A MUTATOR
      // to add/remove elements
      // syntax: (startIndex, nbOfElementsToRemove)
      // see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
      subscriptions.splice(subscriptionIndex, 1);
      /**
       * Why do they use indexOf over includes?
       * ----
       * .... because the repo is pre-ES6 code? Or because they want to suppoer for browser support?
       * anyhow, benefits of includes over indexOf:
       * `includes()` finds NaN and undefined whereas the indexOf method doesn't.
       * `includes()`  does not distinguish between -0 and +0
       */
    }
  }
}