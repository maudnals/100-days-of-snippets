/* 
# 024
Tags: typescript, errors
Lib/Fwk: RxJS
Source: https://github.com/ReactiveX/rxjs/blob/master/src/internal/Subscription.ts
*/


  /**
   * Disposes the resources held by the subscription. May, for instance, cancel
   * an ongoing Observable execution or cancel any other type of work that started when the Subscription was created.
   */
  unsubscribe(): void {
    let hasErrors = false;
    let errors: any[];

    if (this.closed) {
      // subscription is already closed => just return.
      // note how this doesn't fail.
      return;
    }

    // !syntax: destructuring assignment
    // also: we're assigning the current this._parent value to the _parent variable (as a temp) 
    // to snapshot it before mutating this._parent.
    let { _parent, _parents, _unsubscribe, _subscriptions } = (<any> this);

    this.closed = true;
    this._parent = null;
    this._parents = null;

    // null out _subscriptions first so any child subscriptions that attempt
    // to remove themselves from this subscription will noop
    this._subscriptions = null;

    let index = -1;
    let len = _parents ? _parents.length : 0;

    // if this._parent is null, then so is this._parents, and we
    // don't have to remove ourselves from any parent subscriptions.
    while (_parent) {
      _parent.remove(this);
      // if this._parents is null or index >= len,
      // then _parent is set to null, and the loop exits
      _parent = ++index < len && _parents[index] || null;
    }

    if (isFunction(_unsubscribe)) {
      // RxJS's more compact syntax for try/catch block
      let trial = tryCatch(_unsubscribe).call(this);
      // alright basically any "risky" operation still has a rather simple (almost normal-looking) syntax, only it's wrapped into a tryCatch.
      // note the .call(this)
      // => declarative style than imperative (async/await - like).
      // then deal with error in a separate block.
      // Note how typing helps here - if (... errorObject)
      if (trial === errorObject) {
        // hasError pattern: we check all along unsubscribe whether an error (any) happens - if so then we throw a very specific error about unsubscribe, i.e. UnsubscriptionError (see last statement)
        hasErrors = true;
        errors = errors || (
          errorObject.e instanceof UnsubscriptionError ?
            flattenUnsubscriptionErrors(errorObject.e.errors) : [errorObject.e]
        );
      }
    }

    // is current subsciprion has children (as an array of _subscriptions)
    if (isArray(_subscriptions)) {
      // (... to be continued)
    }

    if (hasErrors) {
      throw new UnsubscriptionError(errors);
    }
  }