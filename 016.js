



import $$observable from 'symbol-observable'
/**
 * Interoperability point for observable/reactive libraries.
 */
/**
 * OK. so short intro to reactive programming
 * STREAM = sequence of ongoing events orderered in time. The stream is the subject being observed (= the observable).
 * We SUBSCRIBE (=listen) to the stream.
 * We define a function that will execute when a value is executed: this is the OBSERVER. 
 * That way, we capture these emitted events only asynchronously.
 * More precisely, in RxJS:
 * Because the stream can emit 3 different things - a value, an error,
 * or a "completed" signal - we define up to 3 observer types: a 
 * function that will execute when a value is emitted, another 
 * function when an error is emitted, and another function when  
 * 'completed' is emitted. The second 2 can be omitted.
 */
function observable() {
  // reference the enclosed (closure) subscribe function
  const outerSubscribe = subscribe
  return {
    /**
     * The minimal observable subscription method.
     * @param {Object} observer Any object that can be used as an observer.
     * The observer object should have a `next` method.
     * @returns {subscription} An object with an `unsubscribe` method that can
     * be used to unsubscribe the observable from the store, and prevent further
     * emission of values from the observable.
     */
    subscribe(observer) {
      if (typeof observer !== 'object') {
        throw new TypeError('Expected the observer to be an object.')
      }

      function observeState() {
        if (observer.next) {
          observer.next(getState())
        }
      }

      observeState()
      const unsubscribe = outerSubscribe(observeState)
      return { unsubscribe }
    },

    [$$observable]() {
      return this
    }
  }
}