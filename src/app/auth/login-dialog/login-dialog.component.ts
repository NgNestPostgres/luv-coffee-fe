// import { UserRole } from '@ngnestpostgres/fe-shared';
import { NgSwitch, NgSwitchCase, NgSwitchDefault } from '@angular/common';
import {
  ChangeDetectionStrategy, Component, DestroyRef, inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA, MatDialogContent, MatDialogRef,
} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTabGroup, MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AuthState, LoginData } from '@auth/interfaces/auth-state.enum';
import { AuthService } from '@auth/services/auth.service';
import { AuthStateQuery, UserLogin, UserRole } from '@ngnestpostgres/fe-shared';

import { LoginFormComponent } from './login-form/login-form.component';
import { PasswordChangeComponent } from './password-change/password-change.component';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { RegistrationFormComponent } from './registration-form/registration-form.component';

@Component({
  selector: 'anp-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    LoginFormComponent,
    MatButtonModule,
    MatDialogContent,
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
  @ViewChild('loginTabs') loginTabs!: MatTabGroup;

  private readonly authService = inject(AuthService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly dialogRef = inject(MatDialogRef<LoginDialogComponent>);
  readonly loginData: LoginData | undefined = inject(MAT_DIALOG_DATA);

  readonly AuthState = AuthState;

  authState: AuthState = AuthState.NotStarted;
  isEmailRegistered = false;
  isPhoneRegistered = false;
  predefinedEmail: string | undefined;
  predefinedPhone: string | undefined;

  ngOnInit(): void {
    if (this.loginData) {
      const { email, authState } = this.loginData;
      this.predefinedEmail = email;

      if (authState) {
        this.authState = authState;
      }
    }
  }

  closeForm(): void {
    this.closeDialog();
    this.authState = AuthState.NotStarted;
    // this.isRequestSuccessful = false;
    // this.serverMessage$.next(null);
  }

  handleSingInForm(authStateQuery: AuthStateQuery): void {
    if (!authStateQuery.password) {
      this.defineAuthProcess(authStateQuery);
    } else if (authStateQuery.password && authStateQuery.phone ) {
      // this.handleUserLogin({ email, password });
      console.log('phone login', authStateQuery);
    } else {
      console.log('email login', authStateQuery);
    }
  }

  private defineAuthProcess(authStateQuery: AuthStateQuery): void {
    if (authStateQuery.email === '' || authStateQuery.phone === '') {
      return;
    }

    this.authService.getAuthState(authStateQuery)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((userRole: UserRole | null) => {
        console.log(userRole);
        // this.authProcess = res.method;
        this.predefinedEmail = authStateQuery.email;
        this.predefinedPhone = authStateQuery.phone;

        if (userRole === null) {
          this.authState = AuthState.Registration;
          this.isEmailRegistered = false;
          this.isPhoneRegistered = false;
          this.loginTabs.selectedIndex = 1;
        }

        // if (this.authProcess === AuthState.Login) {
        //   this.isEmailRegistered = true;
        //   this.loginTabs.selectedIndex = 0;
        //   this.predefinedEmail = userEmail;
        // }

        // if (this.authProcess === AuthState.Redirect) {
        //   this.loginService.samlSignIn(res.url);
        // }
      });
  }

  login(creds: UserLogin) {
    this.authService.login(creds).subscribe((token: string) => {
      this.closeDialog(token);
    });
  }

  private closeDialog(outputData?: unknown): void {
    this.dialogRef.close(outputData);
  }
}
