import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';

import { LoginDialogComponent } from './login-dialog/login-dialog.component';

@NgModule({
  declarations: [
    LoginDialogComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
  ]
})
export class AuthModule { }
