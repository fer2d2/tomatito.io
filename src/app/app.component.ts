import {Component} from "@angular/core";
import {AngularFire} from "angularfire2";
import {AuthService} from "./shared/services/auth.service";
import {TranslateService} from "./shared/services/translate.service";

@Component({
  selector: 'tomatito-root',
  templateUrl: './app.component.html',
  styleUrls: ['app.component.scss'],
  providers: [AuthService, AngularFire, TranslateService]
})
export class AppComponent {
  constructor() {
  }
}
