import { ChangeDetectionStrategy, Component, inject, input, OnInit, output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogActions } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { PasswordVisibilityDirective } from '@auth/directives/password-visibility.directive';
import { AuthState } from '@auth/interfaces/auth-state.enum';

interface LoginForm {
  email: FormControl<string | undefined>,
  phone: FormControl<string | undefined>,
  password: FormControl<string | undefined>,
}

@Component({
  selector: 'anp-login-form',
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatButtonModule,
    MatDialogActions,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    PasswordVisibilityDirective,
    ReactiveFormsModule,
  ],
})
export class LoginFormComponent implements OnInit {
  authState = input.required<AuthState>();
  userEmail = input<string | undefined>();
  userPhone = input<string | undefined>();

  submitLogin = output<{ email: string, password?: string }>();
  resetPassword = output<string>();

  private readonly fb = inject(FormBuilder);

  form: FormGroup<LoginForm> = this.fb.group<LoginForm>({
    email: this.fb.nonNullable.control<string| undefined>(this.userEmail(), [Validators.required, Validators.email]),
    phone: this.fb.nonNullable.control<string| undefined>(this.userPhone(), [Validators.required, Validators.email]),
    password: this.fb.nonNullable.control<string|undefined>(
      { value: '', disabled: true },
      [Validators.required],
    ),
  });
  isPasswordVisible = false;

  get email(): FormControl {
    return this.form.controls.email;
  }

  get password(): FormControl {
    return this.form.controls.password;
  }

  ngOnInit(): void {
    if (this.authState() === AuthState.Login) {
      this.enablePasswordFormControl();
    }
  }

  public handleLogin(): void {
    const { email, password } = this.form.getRawValue();
    this.submitLogin.emit({ email, password } as { email: string });
  }

  // public handleSocialMediaSignIn(socialMedia: SocialMedia): void {
  //   this.socialMediaSignIn.emit(socialMedia);
  // }

  handleResetPassword(): void {
    this.resetPassword.emit(this.email.value);
  }

  setPasswordVisibility(isVisible: boolean): void {
    this.isPasswordVisible = isVisible;
  }

  private enablePasswordFormControl(): void {
    this.password.enable();
    // this.password.markAsTouched();
  }
}
