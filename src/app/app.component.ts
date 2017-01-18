import {Component} from "@angular/core";
import {AngularFire} from "angularfire2";
import {AuthService, AUTH_METHODS} from "./shared/services/auth.service";
import {TranslateService} from "./shared/services/translate.service";

@Component({
  selector: 'tomatito-root',
  templateUrl: './app.component.html',
  styleUrls: ['app.component.scss'],
  providers: [AuthService, AngularFire, TranslateService]
})
export class AppComponent {
  constructor(public authService: AuthService, private _translate: TranslateService) {
  }

  public login() {
    this.authService.login(AUTH_METHODS.GOOGLE);
  }

  public logout() {
    this.authService.logout();
  }
}
