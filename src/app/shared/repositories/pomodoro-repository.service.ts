import {Injectable} from "@angular/core";
import {AngularFire} from "angularfire2";
import {Pomodoro} from "../entities/pomodoro";
import {AuthService} from "../services/auth.service";

@Injectable()
export class PomodoroRepositoryService {

  constructor(private _angularFire: AngularFire, private _authService: AuthService) {
  }

  public addPomodoro(pomodoro: Pomodoro) {
    let user = this._authService.user;

    console.info(`updating: /user-pomodoros/${user.id}/ inserting ${JSON.stringify(pomodoro)}`);

    if(!this._authService.authenticated) {
      console.error("Authentication service: user not loaded");
      return;
    }

    const pomodoros = this._angularFire.database.list(`/user-pomodoros/${user.id}`);
    pomodoros.push(pomodoro).then((data) => {
        console.info(data);
      },
      (err) => {
        console.error(err);
      }).catch((err) => {
      console.error(err);
    });
  }

  public getPomodoros() {
    let user = this._authService.user;

    if(!this._authService.authenticated) {
      console.error("Authentication service: user not loaded");
      return;
    }

    return this._angularFire.database.list(`/user-pomodoros/${user.id}`);
  }
}

