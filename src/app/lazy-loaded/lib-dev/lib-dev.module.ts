import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';

import { LibDevComponent } from './lib-dev.component';
import { LibDevRoutingModule } from './lib-dev-routing.module';
import { PhoneFormFieldHostComponent } from './phone-form-field-host/phone-form-field-host.component';

@NgModule({
  declarations: [
    LibDevComponent,
    PhoneFormFieldHostComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    LibDevRoutingModule
  ]
})
export class LibDevModule { }
