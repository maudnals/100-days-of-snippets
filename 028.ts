/* 
# 028
Tags: observer pattern
Lib/Fwk: RxJS
Source: 
https://github.com/ReactiveX/rxjs/blob/master/src/internal/Subscriber.ts
*/

class SafeSubscriber<T> extends Subscriber<T> {

  private _context: any;

  constructor(
    observerOrNext?: PartialObserver<T> | ((value: T) => void),
    error?: (e?: any) => void,
    complete?: () => void) {
    super();

    let next: ((value: T) => void);
    let context: any = this;

    if (isFunction(observerOrNext)) {
      next = (<((value: T) => void)>observerOrNext);
    } else if (observerOrNext) {
      next = (<PartialObserver<T>>observerOrNext).next;
      error = (<PartialObserver<T>>observerOrNext).error;
      complete = (<PartialObserver<T>>observerOrNext).complete;
      if (observerOrNext !== emptyObserver) {
        context = Object.create(observerOrNext);
        if (isFunction(context.unsubscribe)) {
          this.add(<() => void>context.unsubscribe.bind(context));
        }
        context.unsubscribe = this.unsubscribe.bind(this);
      }
    }

    // this._internalVar = varAsfunctionArgument (this._x = x)
    this._context = context;
    this._next = next;
    this._error = error;
    this._complete = complete;
  }

  next(value?: T): void {
    if (!this.isStopped && this._next) {
      try {
        this._next.call(this._context, value);
      } catch (err) {
        this._hostReportError(err);
        this.unsubscribe();
      }
    }
  }

  error(err?: any): void {
    if (!this.isStopped) {
      if (this._error) {
        try {
          this._error.call(this._context, err);
        } catch (err) {
          this._hostReportError(err);
        }
      } else {
        this._hostReportError(err);
      }
      this.unsubscribe();
    }
  }

  complete(): void {
    if (!this.isStopped) {
      if (this._complete) {
        try {
          this._complete.call(this._context);
        } catch (err) {
          this._hostReportError(err);
        }
      }
      this.unsubscribe();
    }
  }

  protected _unsubscribe(): void {
    this._context = null;
  }

  private _hostReportError(err: any) {
    setTimeout(() => { throw err; });
  }
}

















// isStopped: internal variable to keep track of subscriber state
// closed: ?

// next is just a callback

unsubscribe(): void {
  if(this.closed) {
    return;
  }
  this.isStopped = true;
  super.unsubscribe();
}

complete(): void {
  if(!this.isStopped) {
    if (this._complete) {
      try {
        this._complete.call(this._context);
      } catch (err) {
        this._hostReportError(err);
      }
    }
    this.unsubscribe();
  }
}