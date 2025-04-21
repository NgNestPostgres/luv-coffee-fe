import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

interface LoginForm {
  email: FormControl<string>,
  password: FormControl<string>,
}

@Component({
  selector: 'anp-login-form',
  imports: [],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss',
})
export class LoginFormComponent {
  private readonly fb = inject(FormBuilder);

  form: FormGroup = this.fb.group<LoginForm>({
    email: this.fb.nonNullable.control<string>('', [Validators.required, Validators.email]),
    password: this.fb.nonNullable.control<string>({ value: '', disabled: true }, [Validators.required]),
  });
}
