import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';

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
