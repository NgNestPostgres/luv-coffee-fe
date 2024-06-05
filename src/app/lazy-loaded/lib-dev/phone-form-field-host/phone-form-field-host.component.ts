import { Component } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PhoneParts } from 'projects/ngx-shared/src/public-api';
import { merge } from 'rxjs';

@Component({
  selector: 'anp-phone-form-field-host',
  templateUrl: './phone-form-field-host.component.html',
  styleUrls: ['./phone-form-field-host.component.scss']
})
export class PhoneFormFieldHostComponent {
  public form!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      tel: [new PhoneParts('', '', ''), []],
      tel1: [new PhoneParts('', '', ''), [Validators.required]],
      simpleInput: ['', [Validators.required]],
    });

    merge(this.form.controls['tel'].statusChanges, this.form.controls['tel'].valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe((val) => {
        console.log('val', val);
        console.log('this.form.controls["tel"].errors', this.form.controls['tel'].errors);
      });
  }

  public log(): void {
    const value = {
      tel: this.form.value.tel,
      tel1: this.form.value.tel1,
      simpleInput: this.form.value.simpleInput,
    };

    console.log(value);
  }
}
