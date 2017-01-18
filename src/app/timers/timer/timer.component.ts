import {Component, OnInit, Input} from "@angular/core";
import {MdSnackBar} from "@angular/material";
import {TimerService} from "./timer.service";
import {SoundService} from "../../shared/services/sound.service";
import {Pomodoro} from "../../shared/entities/pomodoro";
import {PomodoroRepositoryService} from "../../shared/repositories/pomodoro-repository.service";
import {AngularFire} from "angularfire2";
import {AuthService} from "../../shared/services/auth.service";
import {CLOCK_TYPES} from "../../shared/entities/clock-types";
import {Subscription} from "rxjs";

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
  private _remainingTimeFormattedSubscription: Subscription;
  private _remainingPercentage: number;
  private _remainingPercentageSubscription: Subscription;

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
    if(this._timerService.isPaused()) {
      this._timerService.resume();
      this.snackBar.open('Pomodoro resumed', 'OK', {
        duration: this.SNACKBAR_DURATION,
      });
      return;
    }

    this._pomodoro = new Pomodoro(CLOCK_TYPES[this._minutesLength]);
    this._pomodoro.addStartDateForNow();

    this._timerService.start();
    this.subscribeTimerVariables();

    this.snackBar.open('New pomodoro started', 'OK', {
      duration: this.SNACKBAR_DURATION,
    });
  }

  private subscribeTimerVariables() {
    this.cleanSubscriptions();
    this.subscribeRemainingTimeFormatted();
    this.subscribeRemainingPercentage();
  }

  private cleanSubscriptions() {
    if (this._remainingTimeFormattedSubscription) {
      this._remainingTimeFormattedSubscription.unsubscribe();
    }
    if (this._remainingPercentageSubscription) {
      this._remainingPercentageSubscription.unsubscribe();
    }
  }

  private subscribeRemainingTimeFormatted() {
    this._remainingTimeFormattedSubscription = this._timerService.remaining.subscribe(
      newTime => {
        this._remainingTimeFormatted = newTime;

        if (this.timeFinished()) {
          this._remainingTimeFormattedSubscription.unsubscribe();
        }
      }
    );
  }

  private subscribeRemainingPercentage() {
    this._remainingPercentageSubscription = this._timerService.remainingPercentage.subscribe(
      newPercentage => {
        this._remainingPercentage = newPercentage;
        if (this.timeFinished()) {
          this._remainingPercentageSubscription.unsubscribe();

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
    this._timerService.stop();
    this.snackBar.open('Pomodoro stopped', 'OK', {
      duration: this.SNACKBAR_DURATION,
    });
  }

  public resetTimer() {
    this._timerService.reset();
    this.snackBar.open('Pomodoro cancelled', 'OK', {
      duration: this.SNACKBAR_DURATION,
    });
  }

  @Input()
  set minutesLength(minutesLength: number) {
    this._minutesLength = minutesLength;
  }
}

