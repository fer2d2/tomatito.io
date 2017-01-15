import {Component, OnInit, Input} from "@angular/core";
import {MdSnackBar} from "@angular/material";
import {TimerService} from "./timer.service";
import {SoundService} from "../../sound.service";

@Component({
  selector: 'tomatito-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css'],
  providers: [TimerService, SoundService]
})
export class TimerComponent implements OnInit {
  private SNACKBAR_DURATION = 5000;

  private _minutesToCount: number;
  private _remaining: string;
  private _remainingPercentage: number;

  constructor(private _timerService: TimerService, public snackBar: MdSnackBar, private _soundService: SoundService) {
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
        if (this._remainingPercentage === 100) {
          this.snackBar.open('Pomodoro finished!', 'OK');
          this._soundService.beep();
        }
      }
    );
    let snackBarRef = this.snackBar.open('New pomodoro started', 'OK', {
      duration: this.SNACKBAR_DURATION,
    });
  }

  public stopTimer() {
    this._timerService.stopTimer();
    this.snackBar.open('Pomodoro stopped', 'OK', {
      duration: this.SNACKBAR_DURATION,
    });
  }

  public resetTimer() {
    this._timerService.resetTimer();
    this.snackBar.open('Pomodoro cancelled', 'OK', {
      duration: this.SNACKBAR_DURATION,
    });
  }

  @Input()
  set minutesToCount(minutesToCount: number) {
    this._minutesToCount = minutesToCount;
  }
}
