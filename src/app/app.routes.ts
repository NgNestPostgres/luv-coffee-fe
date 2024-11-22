import { Routes } from '@angular/router';

import { HomeComponent } from './home/home/home.component';
import { NotFoundComponent } from './home/not-found/not-found.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'users',
    loadChildren: () => import('./lazy-loaded/users/users.routes').then((m) => m.USERS_ROUTES),
  },
  {
    path: 'coffees',
    loadChildren: () => import('./lazy-loaded/coffees/coffees.routes').then((m) => m.COFFEES_ROUTES),
  },
  {
    path: 'lib-dev',
    loadChildren: () => import('./lazy-loaded/lib-dev/lib-dev.routes').then((m) => m.LIB_DEV_ROUTES),
  },
  { path: '**', component: NotFoundComponent },
];
