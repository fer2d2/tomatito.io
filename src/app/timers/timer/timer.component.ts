import {Component, OnInit, Input} from '@angular/core';
import {MdSnackBar} from '@angular/material';
import {TimerService} from "./timer.service";

@Component({
  selector: 'tomatito-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css'],
  providers: [TimerService]
})
export class TimerComponent implements OnInit {
  private _minutesToCount:number;
  private _remaining:string;
  private _remainingPercentage:number;

  constructor(private _timerService:TimerService, public snackBar: MdSnackBar) {
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
    this._timerService.remainingPercentage.subscribe(
      newPercentage => {
        this._remainingPercentage = newPercentage;
      }
    );
    let snackBarRef = this.snackBar.open('New pomodoro started', 'OK', {
      duration: 5000,
    });
  }

  public stopTimer() {
    this._timerService.stopTimer();
    let snackBarRef = this.snackBar.open('Pomodoro stopped', 'OK', {
      duration: 5000,
    });
  }

  public resetTimer() {
    this._timerService.resetTimer();
    let snackBarRef = this.snackBar.open('Pomodoro cancelled', 'OK', {
      duration: 5000,
    });
  }

  @Input()
  set minutesToCount(minutesToCount:number) {
    this._minutesToCount = minutesToCount;
  }
}
