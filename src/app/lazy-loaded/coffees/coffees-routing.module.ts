import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CoffeesComponent } from './coffees.component';

const routes: Routes = [
  { path: '', component: CoffeesComponent }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoffeesRoutingModule { }
