import {Component, OnInit, Input} from "@angular/core";
import {MdSnackBar, PortalModule} from "@angular/material";
import {TimerService} from "./timer.service";
import {SoundService} from "../../sound.service";
import {Pomodoro} from "../../entities/pomodoro";
import {PomodoroRepositoryService} from "../../repositories/pomodoro-repository.service";
import {AngularFire} from "angularfire2";
import {AuthService} from "../../auth.service";
import {CLOCK_TYPES} from "../../entities/clock-types";

@Component({
  selector: 'tomatito-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css'],
  providers: [TimerService, SoundService, PomodoroRepositoryService, AngularFire, AuthService]
})
export class TimerComponent implements OnInit {
  private SNACKBAR_DURATION = 5000;

  private _minutesLength: number;
  private _remainingTimeFormatted: string;
  private _remainingPercentage: number;

  private _pomodoro: Pomodoro;

  constructor(private _timerService: TimerService,
              public snackBar: MdSnackBar,
              private _soundService: SoundService,
              private _pomodoroRepository:PomodoroRepositoryService
  ) {}

  ngOnInit() {
    this._timerService.initialize(this._minutesLength);
    this._remainingTimeFormatted = this._timerService.initialTime;
  }

  public startTimer() {
    this._pomodoro = new Pomodoro(CLOCK_TYPES[this._minutesLength]);
    this._pomodoro.addStartDateForNow();

    this._timerService.startTimer();
    this.subscribeTimerVariables();

    this.snackBar.open('New pomodoro started', 'OK', {
      duration: this.SNACKBAR_DURATION,
    });
  }

  private subscribeTimerVariables() {
    this._timerService.remaining.subscribe(
      newTime => {
        this._remainingTimeFormatted = newTime;
      }
    );

    this._timerService.remainingPercentage.subscribe(
      newPercentage => {
        this._remainingPercentage = newPercentage;
        if (this.timeFinished()) {
          this.snackBar.open('Pomodoro finished!', 'OK');
          this._soundService.beep();

          this._pomodoro.addEndDateForNow();
          this._pomodoroRepository.addPomodoro(this._pomodoro);
        }
      }
    );
  }

  private timeFinished() {
    return this._remainingPercentage === 100;
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
  set minutesLength(minutesLength: number) {
    this._minutesLength = minutesLength;
  }
}
