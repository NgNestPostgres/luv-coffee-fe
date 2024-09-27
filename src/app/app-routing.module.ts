import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home/home.component';
import { NotFoundComponent } from './home/not-found/not-found.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'users',
    loadChildren: () => import('./lazy-loaded/users/users.routes').then((m) => m.USERS_ROUTES),
  },
  {
    path: 'coffees',
    loadChildren: () => import('./lazy-loaded/coffees/coffees.module').then((m) => m.CoffeesModule),
  },
  {
    path: 'lib-dev',
    loadChildren: () => import('./lazy-loaded/lib-dev/lib-dev.module').then((m) => m.LibDevModule),
  },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules,
  })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
