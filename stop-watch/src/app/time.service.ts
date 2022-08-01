import { Injectable } from '@angular/core';
import {
  Observable,
  timer,
  BehaviorSubject,
  Subscription
} from "rxjs";
import { map } from "rxjs/operators";
import { StopWatch } from "./stopwatch";

@Injectable({
  providedIn: 'root'
})
export class TimeService {

  private readonly _initialTime = 0;
  private _timer$: BehaviorSubject<number> = new BehaviorSubject(
    this._initialTime
  );
  private _lastStopedTime: number = this._initialTime;
  private _timerSubscription: Subscription = new Subscription();
  private _isRunning: boolean = false;
  private _intervalSec = 0;

  constructor() {}

  public get stopWatch$(): Observable<StopWatch> {
    return this._timer$.pipe(
      map((miliseconds: number): StopWatch => this.secondsToStopWatch(miliseconds))
    );
  }

  start(): void {
    if (this._isRunning) {
      return;
    }
    this._timerSubscription = timer(0, 100)
        .pipe(map((value: number): number => value + this._lastStopedTime))
        .subscribe(this._timer$);
    this._isRunning = true;
  }

  stopTimer(): void {
    this._lastStopedTime = this._timer$.value;
    this._timerSubscription.unsubscribe();
    this._isRunning = false;
  }

  resetTimer(): void {
    this._timerSubscription.unsubscribe();
    this._lastStopedTime = this._initialTime;
    this._timer$.next(this._initialTime);
    this._isRunning = false;
  }

  private secondsToStopWatch(ms: number): StopWatch {
    let rest = ms % 10;
    if(ms % 10 === 0) this._intervalSec = Math.floor(ms / 10);
    const seconds = this._intervalSec % 60;
    rest = ms % 36000;
    const minutes = Math.floor(rest / 600);
    return {
      minutes: this.converNumberToString(minutes),
      seconds: this.converNumberToString(seconds)
    };
  }

  private converNumberToString(value: number): string {
    return `${value < 10 ? "0" + value : value}`;
  }
}
