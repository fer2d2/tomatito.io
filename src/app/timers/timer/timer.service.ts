import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable()
export class TimerService {
  private _remainingStr:BehaviorSubject<string>;
  private _minutesToCount:number;
  private _secondsRemaining:number;

  constructor() {
    this._remainingStr = new BehaviorSubject<string>(this._minutesToCount+":00");
  }

  public startTimer(minutesToCount:number) {
    this._minutesToCount = minutesToCount;
    this._secondsRemaining = minutesToCount * 60;

    let minutes:number;
    let seconds:number;

    setInterval(() => {
      minutes = Math.trunc(this._secondsRemaining / 60);
      seconds = Math.trunc(this._secondsRemaining % 60);

      let remainingTimeStr = this.calculateRemainingTimeStr(minutes, seconds);
      this._remainingStr.next(remainingTimeStr);

      if (--this._secondsRemaining < 0) {
        this._secondsRemaining = this._minutesToCount * 60;
      }

      console.info(this._remainingStr);
    }, 1000);
  }

  private calculateRemainingTimeStr(minutes: number, seconds: number) {
    let minutesStr = minutes < 10 ? "0" + minutes : minutes;
    let secondsStr = seconds < 10 ? "0" + seconds : seconds;
    return minutesStr + ":" + secondsStr;
  }

  get remaining() {
    return this._remainingStr.asObservable();
  }
}
