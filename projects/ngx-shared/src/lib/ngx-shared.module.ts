import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

import { PhoneFormFieldComponent } from './components/phone-form-field/phone-form-field.component';

const ANGULAR_MATERIAL_MODULES = [
  MatButtonModule,
  MatInputModule,
];

@NgModule({
  declarations: [
    PhoneFormFieldComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    ANGULAR_MATERIAL_MODULES
  ],
  exports: [
    PhoneFormFieldComponent,
  ]
})
export class NgxSharedModule { }
