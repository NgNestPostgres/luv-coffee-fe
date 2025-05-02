import {
  ChangeDetectionStrategy, Component, inject, Input, input, OnChanges, output,
} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogActions } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { PasswordVisibilityDirective } from '@auth/directives/password-visibility.directive';
import { AuthState } from '@auth/interfaces/auth-state.enum';
import { PhoneFormFieldComponent, PhoneParts } from '@shared/components/phone-form-field/phone-form-field.component';

interface LoginForm {
  email: FormControl<string | undefined>,
  phoneParts: FormControl<PhoneParts | undefined>,
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
    PhoneFormFieldComponent,
    ReactiveFormsModule,
  ],
})
export class LoginFormComponent implements OnChanges {
  @Input({ required: true }) authState!: AuthState;
  userEmail = input<string | undefined>();
  userPhone = input<string | undefined>();

  submitLogin = output<{ email?: string, phone?: string, password?: string }>();
  resetPassword = output<{email?: string, phone?: string}>();

  private readonly fb = inject(FormBuilder);

  form: FormGroup<LoginForm> = this.fb.group<LoginForm>({
    email: this.fb.nonNullable.control<string| undefined>(this.userEmail(), [Validators.required, Validators.email]),
    phoneParts: this.fb.nonNullable.control<PhoneParts| undefined>(
      { value: new PhoneParts('', '', ''), disabled: true },
      [Validators.required],
    ),
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

  get phoneParts(): FormControl {
    return this.form.controls.phoneParts;
  }

  ngOnChanges(): void {
    if (this.authState === AuthState.Login) {
      this.enablePasswordFormControl();
    }
  }

  public handleLogin(): void {
    const { email, password, phoneParts } = this.form.getRawValue();
    const phone = this.combinePhone(phoneParts);
    this.submitLogin.emit({ email, phone, password });
  }

  // public handleSocialMediaSignIn(socialMedia: SocialMedia): void {
  //   this.socialMediaSignIn.emit(socialMedia);
  // }

  handleResetPassword(): void {
    this.resetPassword.emit({
      email: this.email.value,
      phone: this.combinePhone(this.phoneParts.value),
    });
  }

  setPasswordVisibility(isVisible: boolean): void {
    this.isPasswordVisible = isVisible;
  }

  private enablePasswordFormControl(): void {
    this.password.enable();
    // this.password.markAsTouched();
  }

  private combinePhone(phoneParts: PhoneParts | undefined): string | undefined {
    return phoneParts ? phoneParts.area + phoneParts.exchange + phoneParts.subscriber : undefined;
  }
}
