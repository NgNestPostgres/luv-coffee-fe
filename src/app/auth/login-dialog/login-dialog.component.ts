// import { UserRole } from '@ngnestpostgres/fe-shared';
import { NgSwitch, NgSwitchCase, NgSwitchDefault } from '@angular/common';
import {
  ChangeDetectionStrategy, Component, inject,
  OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA, MatDialogModule, MatDialogRef,
} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AuthState, LoginData } from '@auth/interfaces/auth-state.enum';
import { AuthService } from '@auth/services/auth.service';
import { AuthMethod, UserLogin } from '@ngnestpostgres/fe-shared';

import { LoginFormComponent } from './login-form/login-form.component';
import { PasswordChangeComponent } from './password-change/password-change.component';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { RegistrationFormComponent } from './registration-form/registration-form.component';

interface DateRangeForm {
  dateRange: FormControl<string>
}

@Component({
  selector: 'anp-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    LoginFormComponent,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatTabsModule,
    MatTabsModule,
    MatToolbarModule,
    NgSwitch, NgSwitchCase, NgSwitchDefault,
    RegistrationFormComponent,
    PasswordChangeComponent,
    PasswordResetComponent,
  ],
})
export class LoginDialogComponent implements OnInit {
  private authService = inject(AuthService);
  private data: LoginData = inject(MAT_DIALOG_DATA);
  private dialogRef = inject(MatDialogRef<LoginDialogComponent>);
  private readonly fb = inject(FormBuilder);

  readonly AuthMethod = AuthMethod;
  readonly AuthState = AuthState;

  authMethod: AuthMethod = this.AuthMethod.NotDefined;
  authState: AuthState = AuthState.NotStarted;
  form: FormGroup = this.fb.group<DateRangeForm>({
    dateRange: this.fb.nonNullable.control<string>('', [Validators.required]),
  });
  predefinedEmail = '';

  ngOnInit(): void {
    console.log(this.data);
    console.log('UserRole.Admin');
  }

  public closeForm(): void {
    this.closeDialog();
    this.authMethod = AuthMethod.NotDefined;
    this.authState = AuthState.NotStarted;
    this.predefinedEmail = '';
    // this.isRequestSuccessful = false;
    // this.serverMessage$.next(null);
  }

  public login(creds: UserLogin) {
    this.authService.login(creds).subscribe((token: string) => {
      this.closeDialog(token);
    });
  }

  private closeDialog(outputData?: unknown): void {
    this.dialogRef.close(outputData);
  }
}
