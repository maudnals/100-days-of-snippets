/* 
# 019
Tags: angular, typescript
Lib/Fwk: redux
Source: https://github.com/angular/angular/blob/master/packages/forms/src/model.ts 
*/

/**
 * Marks the control as `touched`.
 *
 * This will also mark all direct ancestors as `touched` to maintain
 * the model.
 */

// in TypeScript an abstract class is a base class that may not be implemented directly
export abstract class AbstractControl {

  private _parent: XControl;
  // const vs readonly: 
  // readonly is for a ppty (and ultimately can be modified)
  // const is for a reference - the variable can NOT be reassigned to anything else
  public readonly touched: boolean = false;

  // onlySelf?: boolean = optional param and default value
  markAsTouched(opts: { onlySelf?: boolean } = {}): void {
    // as is for casting
    (this as { touched: boolean }).touched = true;

    if (this._parent && !opts.onlySelf) {
      this._parent.markAsTouched(opts);
    }
  }
}
