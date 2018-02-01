/* 
# 025
Tags: typescript, errors
Lib/Fwk: RxJS
Source: https://github.com/ReactiveX/rxjs/blob/master/src/internal/Subscription.ts
*/


function flattenUnsubscriptionErrors(errors: any[]) {
  return errors.reduce((errs, err) => errs.concat((err instanceof UnsubscriptionError) ? err.errors : err), []);
}

/* 
JS error types:
-----
InternalError: internal error in JS engine
RangeError: (numeric) is out of range
ReferenceError: X doesn't exist (!= undefined)
TypeError: type is invalid (e.g: X.id but X doesn't exist)
SyntaxError: error while parsing the code (e.g. missing parenthesis or so)
URIError (when encoding URIs uniform resource identifiers) 
s*/