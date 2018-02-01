/* 
# 025
Tags: typescript, errors
Lib/Fwk: RxJS
Source: https://github.com/ReactiveX/rxjs/blob/master/src/internal/Subscription.ts
*/


function flattenUnsubscriptionErrors(errors: any[]) {
  // flatten means reduce - think of it like going from a 1D element (an array = a line) to a 0D one (a single value = data point)
  // reduce(a, c) = reduce(accumulator, currentValue)
  return errors.reduce(
    // err = current error in errors array.
    /**
     * if err is NOT an Unsubscription error:
     * just concat it to errs (the accumulator)
     */
    // -----
    /**
     * if err is an Unsubscription error:
     * apparently in that case it's got a different, deeper shape,
     * i.e. it holds its own error array. Makes sense because 1 - Unsubscription is a 
     * complex/long function and lots of things could go wrong, and 2 - UnsubscribeError
     * is no standard core JS error.
     * Anyhow, in that case just concat err.errors to errs (the accumulator)
     */
    (errs, err) => errs.concat((err instanceof UnsubscriptionError) ? err.errors : err),
    // [] = initial value of errs (the accumulator)

    // Final shape:
    // errs = [typeError, referenceError, [rangeError, typeError], referenceError]
    []);
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