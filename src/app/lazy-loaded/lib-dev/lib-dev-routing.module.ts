import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LibDevComponent } from './lib-dev.component';
import { PhoneFormFieldHostComponent } from './phone-form-field-host/phone-form-field-host.component';

const routes: Routes = [
  {
    path: '',
    component: LibDevComponent,
    children: [
      {
        path: 'phone-form-field',
        component: PhoneFormFieldHostComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LibDevRoutingModule { }
