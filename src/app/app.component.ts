import {Component} from "@angular/core";
import {AngularFire} from "angularfire2";
import {AuthService, AUTH_METHODS} from "./auth.service";

@Component({
  selector: 'tomatito-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AuthService, AngularFire]
})
export class AppComponent {
  constructor(public authService: AuthService) {
  }

  public login() {
    this.authService.login(AUTH_METHODS.GOOGLE);
  }

  public logout() {
    this.authService.logout();
  }
}
