import { FocusMonitor } from '@angular/cdk/a11y';
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import {
  Component,
  ElementRef,
  HostBinding,
  Input,
  OnDestroy,
  Optional,
  Self,
  ViewChild,
} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  UntypedFormBuilder,
  UntypedFormGroup,
  NgControl,
  Validators,
} from '@angular/forms';
import { MatLegacyFormField as MatFormField, MatLegacyFormFieldControl as MatFormFieldControl } from '@angular/material/legacy-form-field';
import { Subject } from 'rxjs';

/** Data structure for holding telephone number. */
export class PhoneParts {
  constructor(
    public area: string,
    public exchange: string,
    public subscriber: string
  ) {}
}

@Component({
  selector: 'ngx-phone-form-field',
  templateUrl: 'phone-form-field.component.html',
  styleUrls: ['phone-form-field.component.scss'],
  providers: [{ provide: MatFormFieldControl, useExisting: PhoneFormFieldComponent }],
})
export class PhoneFormFieldComponent implements  ControlValueAccessor, MatFormFieldControl<PhoneParts>, OnDestroy {
  static nextId = 0;

  // implements MatFormFieldControl
  @HostBinding() id = `example-tel-input-${PhoneFormFieldComponent.nextId++}`;
  // implements MatFormFieldControl
  @HostBinding('class.ngx-floating')
  get shouldLabelFloat() {
    return this.focused || !this.empty;
  }

  @ViewChild('area') areaInput!: HTMLInputElement;
  @ViewChild('exchange') exchangeInput!: HTMLInputElement;
  @ViewChild('subscriber') subscriberInput!: HTMLInputElement;

  // implements MatFormFieldControl
  // eslint-disable-next-line @angular-eslint/no-input-rename
  @Input('aria-describedby') userAriaDescribedBy!: string;

  // implements MatFormFieldControl
  @Input()
  get disabled(): boolean {
    return this._disabled;
  }
  set disabled(value: BooleanInput) {
    this._disabled = coerceBooleanProperty(value);
    this._disabled ? this.parts.disable() : this.parts.enable();
    this.stateChanges.next();
  }

  // implements MatFormFieldControl
  @Input()
  get placeholder(): string {
    return this._placeholder;
  }
  set placeholder(value: string) {
    this._placeholder = value;
    this.stateChanges.next();
  }

  // implements MatFormFieldControl
  @Input()
  get required(): boolean {
    return this._required;
  }
  set required(value: BooleanInput) {
    this._required = coerceBooleanProperty(value);
    this.stateChanges.next();
  }

  // implements MatFormFieldControl
  @Input()
  get value(): PhoneParts | null {
    if (this.parts.valid) {
      const { value: { area, exchange, subscriber } } = this.parts;
      return new PhoneParts(area, exchange, subscriber);
    }
    return null;
  }
  set value(tel: PhoneParts | null) {
    const { area, exchange, subscriber } = tel || new PhoneParts('', '', '');
    this.parts.setValue({ area, exchange, subscriber });
    this.stateChanges.next();
  }

  public focused = false; // implements MatFormFieldControl
  public controlType = 'ngx-phone-input'; // implements MatFormFieldControl
  public parts: UntypedFormGroup;
  public stateChanges = new Subject<void>(); // implements MatFormFieldControl

  private _disabled = false;
  private _placeholder!: string;
  private _required = false;
  private _touched = false;

  // implements MatFormFieldControl
  get empty(): boolean {
    const { value: { area, exchange, subscriber } } = this.parts;
    return !area && !exchange && !subscriber;
  }

  // implements MatFormFieldControl
  get errorState(): boolean {
    return this.parts.invalid && this._touched;
  }

  onChange = (_: any) => {};
  onTouched = () => {};

  constructor(
    private _elementRef: ElementRef<HTMLElement>,
    private _fb: UntypedFormBuilder,
    private _focusMonitor: FocusMonitor,
    @Optional() public parentFormField: MatFormField,
    @Optional() @Self() public ngControl: NgControl,
  ) {
    this.parts = this._fb.group({
      area: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(3)]],
      exchange: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(3)]],
      subscriber: [null, [Validators.required, Validators.minLength(4), Validators.maxLength(4)]],
    });

    if (this.ngControl != null) {
      // Setting the value accessor directly (instead of using
      // the providers) to avoid running into a circular import.
      this.ngControl.valueAccessor = this;
    }
  }

  ngOnDestroy(): void {
    this.stateChanges.complete();
    this._focusMonitor.stopMonitoring(this._elementRef);
  }

  public onFocusIn(event: FocusEvent) {
    if (!this.focused) {
      this.focused = true;
      this.stateChanges.next();
    }
  }

  public onFocusOut(event: FocusEvent) {
    if (!this._elementRef.nativeElement.contains(event.relatedTarget as Element)) {
      this._touched = true;
      this.focused = false;
      this.onTouched();
      this.stateChanges.next();
    }
  }

  public autoFocusPrev(control: AbstractControl, prevElement: HTMLInputElement): void {
    if (control.value.length < 1) {
      this._focusMonitor.focusVia(prevElement, 'program');
    }
  }

  public setDescribedByIds(ids: string[]) {
    const controlElement = this._elementRef.nativeElement.querySelector('.ngx-phone-input-container')!;
    controlElement.setAttribute('aria-describedby', ids.join(' '));
  }

  public onContainerClick(event: MouseEvent) {
    if (this.parts.controls['subscriber'].valid) {
      this._focusMonitor.focusVia(this.subscriberInput, 'program');
    } else if (this.parts.controls['exchange'].valid) {
      this._focusMonitor.focusVia(this.subscriberInput, 'program');
    } else if (this.parts.controls['area'].valid) {
      this._focusMonitor.focusVia(this.exchangeInput, 'program');
    } else {
      this._focusMonitor.focusVia(this.areaInput, 'program');
    }
  }

  // implements ControlValueAccessor
  public writeValue(tel: PhoneParts | null): void {
    this.value = tel;
  }

  // implements ControlValueAccessor
  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  // implements ControlValueAccessor
  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  // implements ControlValueAccessor
  public setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  public handleInput(control: AbstractControl, nextElement?: HTMLInputElement): void {
    this._autoFocusNext(control, nextElement);
    this.onChange(this.value);
  }

  private _autoFocusNext(control: AbstractControl, nextElement?: HTMLInputElement): void {
    if (!control.errors && nextElement) {
      this._focusMonitor.focusVia(nextElement, 'program');
    }
  }
}
