import {Component, OnInit, Input} from '@angular/core';
import {TimerService} from "./timer.service";
import {Observable} from "rxjs";

@Component({
  selector: 'tomatito-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css'],
  providers: [TimerService]
})
export class TimerComponent implements OnInit {
  private _minutesToCount:number;
  private _secondsToCount:number;
  private _remaining:string;

  constructor(private _timerService:TimerService) {
  }

  ngOnInit() {
    this._timerService.initialize(this._minutesToCount);
    this._remaining = this._timerService.initialTime;
  }

  public startTimer() {
    this._timerService.startTimer();
    this._timerService.remaining.subscribe(
      newTime => {
        this._remaining = newTime;
      }
    );
  }

  private stopTimer() {
    this._timerService.stopTimer();
  }

  private resetTimer() {
    this._timerService.resetTimer();
  }

  @Input()
  set minutesToCount(minutesToCount:number) {
    this._minutesToCount = minutesToCount;
  }
}
