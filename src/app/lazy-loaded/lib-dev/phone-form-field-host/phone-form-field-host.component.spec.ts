import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { PhoneFormFieldComponent } from 'projects/ngx-shared/src/public-api';

import { PhoneFormFieldHostComponent } from './phone-form-field-host.component';

describe('PhoneFormFieldHostComponent', () => {
  let component: PhoneFormFieldHostComponent;
  let fixture: ComponentFixture<PhoneFormFieldHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [PhoneFormFieldHostComponent, PhoneFormFieldComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhoneFormFieldHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
