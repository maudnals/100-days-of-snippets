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
      // syntax is (startIndex, nbOfElementsToRemove)
      // see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
      subscriptions.splice(subscriptionIndex, 1);
    }
  }
}