import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";

@Injectable()
export class TimerService {
  private _remainingStr: BehaviorSubject<string>;
  private _remainingPercentage: BehaviorSubject<number>;
  private _minutesToCount: number;
  private _secondsRemaining: number;
  private _intervalId: any;
  private _intervalPaused: boolean;

  constructor() {
    this._remainingStr = new BehaviorSubject<string>("");
    this._remainingPercentage = new BehaviorSubject<number>(0);
    this._intervalPaused = false;
  }

  public initialize(minutesToCount: number) {
    this._minutesToCount = minutesToCount;
    this._secondsRemaining = minutesToCount * 60;
  }

  public startTimer() {
    if (this._intervalPaused) {
      this._intervalPaused = false;
    }

    if (!this._intervalId) {
      this.createTimer();
    }
  }

  private createTimer() {
    this._remainingStr.next(this.initialTime);
    this._remainingPercentage.next(0);

    let minutes: number;
    let seconds: number;

    this._intervalId = setInterval(() => {
      if (this._intervalPaused) {
        return;
      }

      minutes = Math.trunc(this._secondsRemaining / 60);
      seconds = Math.trunc(this._secondsRemaining % 60);

      let remainingTimeStr = this.calculateRemainingTimeStr(minutes, seconds);
      this._remainingStr.next(remainingTimeStr);
      this._remainingPercentage.next(this.calculateRemainingPercentage());

      if (--this._secondsRemaining < 0) {
        this.resetTimer();
      }
    }, 1000);
  }

  private calculateRemainingTimeStr(minutes: number, seconds: number) {
    let minutesStr = minutes < 10 ? "0" + minutes : minutes;
    let secondsStr = seconds < 10 ? "0" + seconds : seconds;
    return minutesStr + ":" + secondsStr;
  }

  private calculateRemainingPercentage(): number {
    return 100 - (this._secondsRemaining * 100 / (this._minutesToCount * 60));
  }

  public resetTimer() {
    this._secondsRemaining = this._minutesToCount * 60;

    clearInterval(this._intervalId);
    this._intervalId = undefined;

    this._remainingStr.next(this.initialTime);
    this._remainingPercentage.next(0);
  }

  public stopTimer() {
    this._intervalPaused = true;
  }

  get initialTime() {
    return (this._minutesToCount < 10 ? "0" + this._minutesToCount : this._minutesToCount) + ":00";
  }

  get remaining() {
    return this._remainingStr.asObservable();
  }

  get remainingPercentage() {
    return this._remainingPercentage.asObservable();
  }
}
