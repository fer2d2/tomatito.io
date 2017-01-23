import {Component, OnInit} from "@angular/core";
import {PomodoroRepositoryService} from "../shared/repositories/pomodoro-repository.service";
import {AuthService} from "../shared/services/auth.service";
import {Pomodoro} from "../shared/entities/pomodoro";

@Component({
  selector: 'tomatito-history',
  templateUrl: './history.component.html',
  styleUrls: ['history.component.scss'],
  providers: [PomodoroRepositoryService, AuthService]
})
export class HistoryComponent implements OnInit {
  private _pomodoros: Array<Pomodoro>;
  private _loading: boolean;

  constructor(private _pomodoroRepositoryService: PomodoroRepositoryService, public authService: AuthService) {
    this._pomodoros = [];
    this._loading = true;
  }

  ngOnInit() {
    let authSubscription = this.authService.authentication.subscribe((authenticated) => {
      if (authenticated) {
        this._pomodoroRepositoryService.getPomodoros()
          .subscribe((pomodoros: Array<Pomodoro>) => {
            if(this._loading) {
              this._loading = false;
            }

            this._pomodoros = pomodoros.reverse();
            authSubscription.unsubscribe();
          });
      }
    });
  }

}
