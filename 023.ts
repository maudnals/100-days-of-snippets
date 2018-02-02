/* 
# 023
Tags: subscription, duck typing
Lib/Fwk: RxJS
Source: https://github.com/ReactiveX/rxjs/blob/master/src/internal/Subscription.ts
*/

// export type TeardownLogic = AnonymousSubscription | Function | void

/**
 * What does teardown mean?
 * "teardown blocks registered during a test method's execution are run after that test method ends (python)"
 * "TCP connecion teardown" = tcp connection was dropped
 * (teardown = demolir)
 * "TeardownLogic is the additional logic to execute on teardown"
 * ---
 * What's a subscription?
 * Represents a disposable resource, such as the execution of an Observable. A subscription has one important method, `unsubscribe`, that
  * just disposes the resource held by the subscription.
  * ==> it's like an event listener!
  * (see https://medium.com/@benlesh/rxjs-dont-unsubscribe-6753ed4fda87)
 * 
 */


/*
 * Subscriptions may be grouped together through the `add()`
 * method, which will attach a child Subscription to the current Subscription.
 * When a Subscription is unsubscribed, all its children (and its grandchildren)
 * will be unsubscribed as well.
 */

/**
 * Adds a tear down to be called during the unsubscribe() of this
 * Subscription.
 *
 * If the tear down being added is a subscription that is already
 * unsubscribed, is the same reference `add` is being called on, or is
 * `Subscription.EMPTY`, it will not be added.
 *
 * If this subscription is already in an `closed` state, the passed
 * tear down logic will be executed immediately.
 *
 * @param {TeardownLogic} teardown The additional logic to execute on
 * teardown.
 * @return {Subscription} Returns the Subscription used or created to be
 * added to the inner subscriptions list. This Subscription can be used with
 * `remove()` to remove the passed teardown logic from the inner subscriptions
 * list.
 */

add(teardown: TeardownLogic): Subscription {
  if (!teardown || (teardown === Subscription.EMPTY)) {
    return Subscription.EMPTY;
  }

  if (teardown === this) {
    return this;
  }

  // cast teardown type to subscription
  // let subscription = (<Subscription> teardown);

  switch (typeof teardown) {
    case 'function':
      subscription = new Subscription(< (() => void) > teardown);
    case 'object':
      if (subscription.closed || typeof subscription.unsubscribe !== 'function') {
        // if child subscription is already closed or has no way to unsubscribe,
        // don't let it be added to array of child subscriptions (below)
        return subscription;
      } else if (this.closed) {
        // if parent subscription already closed, unsubscribe child subscription immediately.
        // also, don't let it be added to array of child subscriptions (below)
        subscription.unsubscribe();
        return subscription;
      } else if (typeof subscription._addParent !== 'function' /* quack quack */) {
        // quack quack = probably duck typing but i'm not sure how
        // anyhow, here it looks like: 
        // if subscription has no way to be given a parent,
        // we nest it as a child subscription inside a new parent.
        const tmp = subscription;
        subscription = new Subscription();
        subscription._subscriptions = [tmp];
      }
      break;
    default:
      throw new Error('unrecognized teardown ' + teardown + ' added to Subscription.');
  }

  // take current array or initialize it if needed
  const subscriptions = this._subscriptions || (this._subscriptions = []);

  // append child subscription to array of child subscriptions of `this` subscription
  subscriptions.push(subscription);
  subscription._addParent(this);

  return subscription;
}