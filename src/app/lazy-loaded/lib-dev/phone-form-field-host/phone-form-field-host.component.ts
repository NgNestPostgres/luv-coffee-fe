import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, FormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { PhoneParts } from 'projects/ngx-shared/src/public-api';

@Component({
  selector: 'anp-phone-form-field-host',
  templateUrl: './phone-form-field-host.component.html',
  styleUrls: ['./phone-form-field-host.component.scss']
})
export class PhoneFormFieldHostComponent implements OnInit{
  public form!: UntypedFormGroup;

  constructor(private fb: UntypedFormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      tel: [new PhoneParts('', '', ''), []],
      tel1: [new PhoneParts('', '', ''), []],
      simpleInput: ['', [Validators.required]],
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
