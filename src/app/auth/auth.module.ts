import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginDialogComponent } from './login-dialog/login-dialog.component';
import { SharedModule } from '@shared/shared.module';



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
