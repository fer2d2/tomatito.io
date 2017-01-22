import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {AppComponent} from "./app.component";
import {MaterialModule} from "@angular/material";
import "hammerjs";
import {RouterModule} from "@angular/router";
import {TimersComponent} from "./timers/timers.component";
import {HistoryComponent} from "./history/history.component";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";
import {APP_ROUTES} from "./routes";
import {TimerComponent} from "./timers/timer/timer.component";
import {AngularFireModule} from "angularfire2";
import {FIREBASE_CONFIG, FIREBASE_AUTH_CONFIG} from "./database_config";
import {TranslateModule} from "ng2-translate";
import { LanguagePickerComponent } from './language-picker/language-picker.component';
import { LoginComponent } from './login/login.component';
import { AboutComponent } from './about/about.component';
import { YoutubeVideoComponent } from './shared/components/youtube-video/youtube-video.component';
import { SafePipe } from './shared/components/youtube-video/safe.pipe';


@NgModule({
  declarations: [
    AppComponent,
    TimersComponent,
    HistoryComponent,
    PageNotFoundComponent,
    TimerComponent,
    LanguagePickerComponent,
    LoginComponent,
    AboutComponent,
    YoutubeVideoComponent,
    SafePipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(APP_ROUTES),
    AngularFireModule.initializeApp(FIREBASE_CONFIG, FIREBASE_AUTH_CONFIG),
    MaterialModule.forRoot(),
    TranslateModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
