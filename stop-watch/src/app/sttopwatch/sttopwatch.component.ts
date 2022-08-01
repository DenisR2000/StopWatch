import { Component, OnDestroy } from '@angular/core';
import { Subscription, fromEvent } from 'rxjs';
import { map, buffer, debounceTime, filter } from 'rxjs/operators';
import { TimeService } from '../time.service'
import { StopWatch } from '../stopwatch'

@Component({
  selector: 'app-sttopwatch',
  templateUrl: './sttopwatch.component.html',
  styleUrls: ['./sttopwatch.component.scss']
})
export class SttopwatchComponent implements OnDestroy {

  public stopwatch!: StopWatch;
  public running: boolean = false
  private startBtn = true;
  private _isStoped: boolean = false
  private _subscriptions: Subscription = new Subscription();

  constructor(private timerService: TimeService) {
    this._subscriptions.add(
      this.timerService.stopWatch$.subscribe(
        (val: StopWatch) => (this.stopwatch = val)
      )
    );
  }

  start(): void {
    if(this._isStoped === true) {
      this.timerService.start();
      this.running = true;
      this._isStoped = false;
      this.startBtn = false;
    }
    if(this.startBtn === true) {
      this.timerService.start();
      this.startBtn = false;
      this.running = true;
    } else if(this.startBtn === false) { 
      this.timerService.resetTimer();
      this.running = false;
      this.startBtn = true;
      this._isStoped = false;
    }  
  }

  wait(): void {
    const doubleClick$ = fromEvent(document, 'click')
    doubleClick$.pipe(
      buffer(
        doubleClick$.pipe(debounceTime(300))
      ),
      map(list => {
        return list.length;
      }),
      filter(x => x === 2),
    ).subscribe(() => {
      this.timerService.stopTimer();
      this.startBtn = true;
      this.running = false;
    });
  }

  reset(): void {
    this.timerService.resetTimer();
    this.timerService.start();
    this._isStoped = !this._isStoped;
    this.startBtn = true;
    this.running = true;
  }

  ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
  }
}
