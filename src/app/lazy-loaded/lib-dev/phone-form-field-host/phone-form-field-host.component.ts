import { Component } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  FormBuilder, FormGroup, ReactiveFormsModule, Validators
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { PhoneFormFieldComponent } from '@ngx-shared';
import { PhoneParts } from 'projects/ngx-shared/src/public-api';
import { merge } from 'rxjs';

@Component({
  selector: 'anp-phone-form-field-host',
  templateUrl: './phone-form-field-host.component.html',
  styleUrls: ['./phone-form-field-host.component.scss'],
  standalone: true,
  imports: [
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    PhoneFormFieldComponent,
    ReactiveFormsModule
  ]
})
export class PhoneFormFieldHostComponent {
  public form!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      tel: [{ value: new PhoneParts('', '', ''), disabled: true }, [Validators.required]],
      tel1: [new PhoneParts('+38', '', ''), [Validators.required]],
      simpleInput: [{ value: '', disabled: true }, [Validators.required]],
      simpleInput1: ['', [Validators.required]],
    });

    merge(this.form.controls['tel'].statusChanges, this.form.controls['tel'].valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe((val: PhoneParts) => {
        console.log(`This is for testing purposes: ${val}`);
      });
  }

  public log(): void {
    const value = {
      tel: this.form.value.tel,
      tel1: this.form.value.tel1,
      simpleInput: this.form.value.simpleInput,
      simpleInput1: this.form.value.simpleInput1,
    };

    console.log(value);
  }

  public disableField(fieldName: string): void {
    const field = this.form.get(fieldName);
    field?.disabled ? field.enable() : field?.disable();
  }
}
