import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";
import {isNullOrUndefined} from "util";
import {exists} from "fs";

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

  public resume() {
    if (this._intervalPaused) {
      this._intervalPaused = false;
    }
  }

  public start() {
    if (!this._intervalId) {
      this.newTimer();
    }
  }

  private newTimer() {
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
        this.reset();
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

  public reset() {
    this._secondsRemaining = this._minutesToCount * 60;

    clearInterval(this._intervalId);
    this._intervalId = undefined;
    this._intervalPaused = false;

    this._remainingStr.next(this.initialTime);
    this._remainingPercentage.next(0);
  }

  public stop() {
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

  public isPaused():boolean {
    return this._intervalPaused;
  }
}
