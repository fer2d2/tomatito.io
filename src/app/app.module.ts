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


@NgModule({
  declarations: [
    AppComponent,
    TimersComponent,
    HistoryComponent,
    PageNotFoundComponent,
    TimerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(APP_ROUTES),
    AngularFireModule.initializeApp(FIREBASE_CONFIG, FIREBASE_AUTH_CONFIG),
    MaterialModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
