/* 
# 020
Tags: typescript, interface
Lib/Fwk: RxJS
Source: https://github.com/ReactiveX/rxjs/blob/master/src/internal/Observable.ts
*/


/**
 * typsecript specials
 * ----
 * interface = defines a typing contract (ducktyping)
 * generics (<T>) =  makes code resuable (by me and others/ API users) because my component can work with several kinds of types
 * ?: = optional ppty/argument
 */
export interface Subscribable<T> {

  // typsecript syntax:
  // 
  subscribe: AnonymousSubscription;
}




(
  observerOrNext ?: PartialObserver<T> | ((value: T) => void),
    error ?: (error: any) => void,
    complete ?: () => void
          )