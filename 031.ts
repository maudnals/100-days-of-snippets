/* 
# 031
Tags: time
Lib/Fwk: RxJS
Source: 
https://github.com/ReactiveX/rxjs/blob/master/src/internal/Scheduler.ts
*/

export class Scheduler implements IScheduler {

  // static: used only internally by the class itself, not by its instances
  public static now: 
  // if date.now exists, return it
  () => number = Date.now ? 
  // otherwise return the time of a new date
  Date.now : () => +new Date();

  /**
   * about +new Date(); :
   * -----
   * what is it?
   * it's equivalent to new Date().getTime().
   * The getTime() method returns the numeric value corresponding to the time for the specified date 
   * according to universal time. getTime() always uses UTC for time representation. 
   * For example, a client browser in one timezone, getTime() will be the same as a client browser 
   * in any other timezone.
   * E.g. : -14254782000 (for pre-1970 dates)
   * 
   */


  Why is this the case?

  Here's what happens when you call the getTime method on a Date instance:
  
  Return the value of the [[PrimitiveValue]] internal property of this Date object.
  Here's what happens when you apply the unary plus operator to a Date instance:
  
  Get the value of the Date instance in question
  Convert it to a Number
  Convert it to a primitive
  Call the internal [[DefaultValue]] method






  constructor(private SchedulerAction: typeof Action,
    now: () => number = Scheduler.now) {
    this.now = now;
  }

  /**
   * A getter method that returns a number representing the current time
   * (at the time this function was called) according to the scheduler's own internal clock.
   * @return {number} A number that represents the current time. May or may not
   * have a relation to wall-clock time. May or may not refer to a time unit
   * (e.g. milliseconds).
   */
  public now: () => number;

}