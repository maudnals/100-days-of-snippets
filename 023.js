/* 
# 023
Tags: typescript, subsription, duck typing
Lib/Fwk: RxJS
Source: https://github.com/ReactiveX/rxjs/blob/master/src/internal/Subscription.ts
*/


export type TeardownLogic = AnonymousSubscription | Function | void




/**
 * what does teardown mean?
 * "teardown blocks registered during a test method's execution are run after that test method ends (python)"
 * "TCP connecion teardown" = tcp connection was dropped
 * (teardown = demolir)
 * "TeardownLogic is the additional logic to execute on teardown"
 * ---
 * 
 */

switch (typeof teardown) {
  case 'function':
    subscription = new Subscription(<(() => void)>teardown);
  case 'object':
    // if subscription is already closed or if unsubscribe method doesn't exist,
    // do nothing.
    if (subscription.closed || typeof subscription.unsubscribe !== 'function') {
      return subscription;
    } else if (this.closed) {
      subscription.unsubscribe();
      return subscription;
    } else if (typeof subscription._addParent !== 'function' /* quack quack */) {
      const tmp = subscription;
      subscription = new Subscription();
      subscription._subscriptions = [tmp];
    }
    break;
  default:
    throw new Error('unrecognized teardown ' + teardown + ' added to Subscription.');
}