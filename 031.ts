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
   * ----
   * how does ot work?
   * it creates a new date and then casts the newly created date onto a number.
   * (more exactly:Convert it to a Number then Convert it to a primitive then Call the internal [[DefaultValue]] method))
   * ----
   * what's better?
   * Date().getTime() is argued as more readable and faster (only thing that happens
   * is we return the value of the [[PrimitiveValue]] internal property of this Date object.)
   */
