/* 
# 021
Tags: interface, observers
Lib/Fwk: RxJS
Source: https://github.com/ReactiveX/rxjs/blob/master/src/internal/Observer.ts
*/

// Observer for when the stream emits a value
export interface NextObserver<T> {
  closed?: boolean;
  // next is mandatory 
  next: (value: T) => void;
  // error and complete are optional
  error?: (err: any) => void;
  complete?: () => void;
}

// Observer for when the stream errors
export interface ErrorObserver<T> {
  closed?: boolean;
  // next and complete are optional
  next?: (value: T) => void;
  // error is mandatory
  error: (err: any) => void;
  complete?: () => void;
}

// Observer for when the stream finishes (completes)
export interface CompletionObserver<T> {
  closed?: boolean;
  // next and error are optional
  next?: (value: T) => void;
  error?: (err: any) => void;
  // complete is mandatory
  complete: () => void;
}

// pattern: 
// - three normal types
// - and one partial that can be any of these
export type PartialObserver<T> = NextObserver<T> | ErrorObserver<T> | CompletionObserver<T>;