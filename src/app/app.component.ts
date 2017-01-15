import { Component } from '@angular/core';
import {AngularFire} from "angularfire2";

@Component({
  selector: 'tomatito-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(public angularFire: AngularFire) {}

  public login() {
    this.angularFire.auth.login();
  }

  public logout() {
    this.angularFire.auth.logout();
  }
}
