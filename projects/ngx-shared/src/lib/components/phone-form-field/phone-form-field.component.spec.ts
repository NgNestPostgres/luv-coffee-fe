import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { PhoneFormFieldComponent } from './phone-form-field.component';

describe('PhoneFormFieldComponent', () => {
  let component: PhoneFormFieldComponent;
  let fixture: ComponentFixture<PhoneFormFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [PhoneFormFieldComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhoneFormFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should count Form Group elements', () => {
    const formElement = fixture.debugElement.nativeElement.querySelector('.ngx-phone-input-container');
    const inputElements = formElement.querySelectorAll('input');
    expect(inputElements.length).toBe(3);
  });

  it('should check initial values for the parts Form Group', () => {
    const partsFormGroup = component.parts;
    const initialValues = { area: '', exchange: '', subscriber: '' };
    expect(partsFormGroup.value).toEqual(initialValues);
  });

  describe('area form field', () => {
    it('should check before entering value and validation', () => {
      const formElement = fixture.debugElement.nativeElement
        .querySelector('.ngx-phone-input-container')
        .querySelectorAll('input')[0];
      const formGroupValue = component.parts.get('area');

      expect(formElement.value).toEqual(formGroupValue?.value);
      expect(formGroupValue?.errors).not.toBeNull();
      expect(formGroupValue?.errors?.['required']).toBeTruthy();
    });

    it('should check after entering value and validation', async () => {
      const formElement: HTMLInputElement = fixture.debugElement.nativeElement
        .querySelector('.ngx-phone-input-container')
        .querySelectorAll('input')[0];

      formElement.value = '+38';
      formElement.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      await fixture.whenStable();
      const formGroupValue = component.parts.get('area');

      expect(formElement.value).toEqual(formGroupValue?.value as string);
      expect(formGroupValue?.errors).toBeNull();
    });
  });

  describe('exchange form field', () => {
    it('should check before entering value and validation', () => {
      const formElement = fixture.debugElement.nativeElement
        .querySelector('.ngx-phone-input-container')
        .querySelectorAll('input')[1];
      const formGroupValue = component.parts.get('exchange');

      expect(formElement.value).toEqual(formGroupValue?.value);
      expect(formGroupValue?.errors).not.toBeNull();
      expect(formGroupValue?.errors?.['required']).toBeTruthy();
    });

    it('should check after entering value and validation', async () => {
      const formElement: HTMLInputElement = fixture.debugElement.nativeElement
        .querySelector('.ngx-phone-input-container')
        .querySelectorAll('input')[1];

      formElement.value = '096';
      formElement.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      await fixture.whenStable();
      const formGroupValue = component.parts.get('exchange');

      expect(formElement.value).toEqual(formGroupValue?.value as string);
      expect(formGroupValue?.errors).toBeNull();
    });
  });

  describe('subscriber form field', () => {
    it('should check before entering value and validation', () => {
      const formElement = fixture.debugElement.nativeElement
        .querySelector('.ngx-phone-input-container')
        .querySelectorAll('input')[2];
      const formGroupValue = component.parts.get('subscriber');

      expect(formElement.value).toEqual(formGroupValue?.value);
      expect(formGroupValue?.errors).not.toBeNull();
      expect(formGroupValue?.errors?.['required']).toBeTruthy();
    });

    it('should check after entering value and validation', async () => {
      const formElement: HTMLInputElement = fixture.debugElement.nativeElement
        .querySelector('.ngx-phone-input-container')
        .querySelectorAll('input')[2];

      formElement.value = '4064713';
      formElement.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      await fixture.whenStable();
      const formGroupValue = component.parts.get('subscriber');

      expect(formElement.value).toEqual(formGroupValue?.value as string);
      expect(formGroupValue?.errors).toBeNull();
    });
  });

  it('should check the form is valid when validations are fulfilled', async () => {
    const areaFormElement: HTMLInputElement = fixture.debugElement.nativeElement
      .querySelector('.ngx-phone-input-container')
      .querySelectorAll('input')[0];
    const exchangeFormElement: HTMLInputElement = fixture.debugElement.nativeElement
      .querySelector('.ngx-phone-input-container')
      .querySelectorAll('input')[1];
    const subscriberFormElement: HTMLInputElement = fixture.debugElement.nativeElement
      .querySelector('.ngx-phone-input-container')
      .querySelectorAll('input')[2];

    areaFormElement.value = '+38';
    exchangeFormElement.value = '096';
    subscriberFormElement.value = '4064713';

    areaFormElement.dispatchEvent(new Event('input'));
    exchangeFormElement.dispatchEvent(new Event('input'));
    subscriberFormElement.dispatchEvent(new Event('input'));

    fixture.detectChanges();
    await fixture.whenStable();

    expect(component.parts.valid).toBeTrue();
  });
});
