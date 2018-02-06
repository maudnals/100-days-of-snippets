/* 
# 027
Tags: observer pattern
Lib/Fwk: RxJS
Source: 
https://github.com/ReactiveX/rxjs/blob/master/src/internal/Observable.ts
*/
import { PartialObserver } from './Observer';


export interface Subscribable<T> {
  subscribe(observerOrNext?: PartialObserver<T> | ((value: T) => void),
    error?: (error: any) => void,
    complete?: () => void): AnonymousSubscription;
}


/**
 * subscribe() does 2 things:
 * - Invokes an execution of an Observable 
 * - registers Observer handlers for notifications the Observable will emit.
 */


// an observable should be subscribeable, i.e. it should implement the method `subscribe`
export class Observable<T> implements Subscribable<T> {

  // [...]

  subscribe(observerOrNext?: PartialObserver<T> | ((value: T) => void),
    error?: (error: any) => void,
    complete?: () => void): Subscription {

    const { operator } = this;
    const sink = toSubscriber(observerOrNext, error, complete);

    if (operator) {
      operator.call(sink, this.source);
    } else {
      // protected source: Observable<any>;
      sink.add(this.source ? this._subscribe(sink) : this._trySubscribe(sink));
    }

    return sink;
  }
}