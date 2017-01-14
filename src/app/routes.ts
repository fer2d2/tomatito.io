import {Routes} from '@angular/router';
import {TimersComponent} from "./timers/timers.component";
import {HistoryComponent} from "./history/history.component";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";

export const APP_ROUTES: Routes = [
  {path: 'timers', component: TimersComponent},
  {path: 'history', component: HistoryComponent},

  // Defaults
  {
    path: '',
    redirectTo: '/timers',
    pathMatch: 'full'
  },
  {path: '**', component: PageNotFoundComponent},
];

/**
 * Full routing usage example
 */
// export const appRoutes: Routes = [
//   {
//     path: 'hero/:id',
//     component: HeroComponent,
//     data: { title: 'Hero detail' }
//   },
//   { path: '',
//     redirectTo: '/heroes',
//     pathMatch: 'full'
//   },
//   { path: '**', component: PageNotFoundComponent }
// ];
