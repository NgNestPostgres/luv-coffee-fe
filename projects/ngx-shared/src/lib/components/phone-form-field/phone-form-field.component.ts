/* eslint-disable no-underscore-dangle */
/* eslint-disable max-classes-per-file */
import { FocusMonitor } from '@angular/cdk/a11y';
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import {
  Component,
  DoCheck,
  ElementRef,
  HostBinding,
  Input,
  OnDestroy,
  OnInit,
  Optional,
  Self,
  ViewChild,
} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormBuilder,
  FormGroup,
  FormGroupDirective,
  NgControl,
  NgForm,
  Validators,
} from '@angular/forms';
import { MatFormField, MatFormFieldControl } from '@angular/material/form-field';
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
export class PhoneFormFieldComponent
implements ControlValueAccessor, MatFormFieldControl<PhoneParts>, OnInit, DoCheck, OnDestroy {
  static nextId = 0;

  // implements MatFormFieldControl
  @HostBinding() id = `custom-phone-input-${PhoneFormFieldComponent.nextId++}`;
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
  @Input('aria-describedby') userAriaDescribedBy?: string;

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
  public parts: FormGroup;
  public stateChanges = new Subject<void>(); // implements MatFormFieldControl
  public errorState: boolean = false; // implements MatFormFieldControl

  private _disabled = false;
  private _placeholder: string = '';
  private _required = false;
  public touched = false;

  // implements MatFormFieldControl
  get empty(): boolean {
    const { value: { area, exchange, subscriber } } = this.parts;
    return !area && !exchange && !subscriber;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onChange = (param: unknown) => {};
  onTouched = () => {};

  constructor(
    private elementRef: ElementRef<HTMLElement>,
    private fb: FormBuilder,
    private focusMonitor: FocusMonitor,
    // private defaultErrorStateMatcher: ErrorStateMatcher,
    @Optional() private parentForm: NgForm,
    @Optional() private parentFormGroup: FormGroupDirective,
    @Optional() public parentFormField: MatFormField | null,
    @Optional() @Self() public ngControl: NgControl,
  ) {
    this.parts = this.fb.group({
      area: [null, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(3),
        Validators.pattern('^\\+[1-9]{2}$')
      ]],
      exchange: [null, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(3),
        Validators.pattern('^[0-9]*$')
      ]],
      subscriber: [null, [
        Validators.required,
        Validators.minLength(7),
        Validators.maxLength(7),
        Validators.pattern('^[0-9]*$')
      ]],
    });

    if (this.ngControl != null) {
      // Setting the value accessor directly (instead of using
      // the providers) to avoid running into a circular import.
      this.ngControl.valueAccessor = this;
    }
  }

  ngOnInit(): void {
    this.onChange(this.value);
  }

  ngDoCheck(): void {
    // we should re-evaluate errorState on every change detection cycle
    if (this.ngControl) {
      this.updateErrorState();
    }
  }

  ngOnDestroy(): void {
    this.stateChanges.complete();
    this.focusMonitor.stopMonitoring(this.elementRef);
  }

  private autoFocusNext(control: AbstractControl, nextElement?: HTMLInputElement): void {
    if (!control.errors && !!nextElement) {
      this.focusMonitor.focusVia(nextElement, 'program');
    }
  }

  private updateErrorState(): void {
    const parent = this.parentFormGroup || this.parentForm;

    const oldState = this.errorState;
    const newState = (this.ngControl?.invalid || this.parts.invalid) && (this.touched || parent.submitted);

    if (oldState !== newState) {
      this.errorState = newState;
      this.stateChanges.next();
    }
  }

  public autoFocusPrev(control: AbstractControl, prevElement: HTMLInputElement): void {
    if (control.value.length < 1) {
      this.focusMonitor.focusVia(prevElement, 'program');
    }
  }

  public onFocusIn(): void {
    if (!this.focused) {
      this.focused = true;
      this.stateChanges.next();
    }
  }

  public onFocusOut(event: FocusEvent): void {
    if (!this.elementRef.nativeElement.contains(event.relatedTarget as Element)) {
      this.touched = true;
      this.focused = false;
      this.onTouched();
      this.stateChanges.next();
    }
  }

  public setDescribedByIds(ids: string[]): void {
    const controlElement = this.elementRef.nativeElement.querySelector('.ngx-phone-input-container')!;
    controlElement.setAttribute('aria-describedby', ids.join(' '));
  }

  public onContainerClick(event: MouseEvent): void {
    if ((event.target as Element).tagName.toLowerCase() !== 'input') {
      this.elementRef.nativeElement.querySelector('input')?.focus();
    }
  }

  // implements ControlValueAccessor
  public writeValue(tel: PhoneParts | null): void {
    this.value = tel;
  }

  // implements ControlValueAccessor
  public registerOnChange(fn: () => void): void {
    this.onChange = fn;
  }

  // implements ControlValueAccessor
  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  // implements ControlValueAccessor
  public setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  public handleInput(control: AbstractControl, nextElement?: HTMLInputElement): void {
    this.autoFocusNext(control, nextElement);
    this.onChange(this.value);
  }
}
