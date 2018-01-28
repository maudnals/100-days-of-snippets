/* 
# 020
Tags: typescript, interface, observable
Lib/Fwk: RxJS
Source: https://github.com/ReactiveX/rxjs/blob/master/src/internal/Observable.ts
*/

export interface Subscribable<T> {
  /**
   * a subscribable object must have a subscribe method
   * that returns a subscription object
   * which looks like // AnonymousSubscription = 
   * export interface AnonymousSubscription {
   * unsubscribe(): void;
   * }
   */
  /**
   * 101 of reactive programming: reminder.
   * RP is based on the observer pattern.
   * STREAM = sequence of ongoing events orderer in time.
   * THE STREAM IS THE OBSERVABLE (= subject being observed).
   * OBSERVER = a function that executes when a stream value is encountered.
   * Observer types: error and completed.
   * observerOrNext: not sure
   */
  subscribe(
    observerOrNext?: PartialObserver<T> | ((value: T) => void),
    error?: (error: any) => void,
    complete?: () => void
  ):
    // subscribe()'s return type
    AnonymousSubscription;
}

/**
 * typsecript specials
 * ----
 * interface = defines a typing contract (ducktyping)
 * generics (<T>) =  makes code resuable (by me and others/ API users) because my component can work with several kinds of types. T here (could be another letter) is like a metadata point that we can use anywhere
 * ?: = optional ppty/argument
 * functionName(signature): returnType
 */