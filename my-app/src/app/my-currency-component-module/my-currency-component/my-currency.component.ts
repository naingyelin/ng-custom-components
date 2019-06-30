import { Component, OnInit, OnDestroy, Self, Optional, ViewChild, ElementRef, Input, AfterViewInit, HostBinding } from '@angular/core';
import { AbstractControl, NG_VALUE_ACCESSOR, Validators, NgControl, ControlValueAccessor, ValidatorFn } from '@angular/forms';
import { MatFormFieldControl } from '@angular/material';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-my-currency',
  templateUrl: './my-currency-component.component.html',
  styleUrls: ['./my-currency-component.component.sass'],
  providers: [{ provide: MatFormFieldControl, useExisting: MyCurrencyComponent }]
})
export class MyCurrencyComponent implements OnInit, OnDestroy, AfterViewInit, ControlValueAccessor, MatFormFieldControl<any> {
  static nextId = 0;
  // tslint:disable-next-line: variable-name
  private _placeholder: string;
  // tslint:disable-next-line: variable-name
  private _required = false;
  // tslint:disable-next-line: variable-name
  private _value = '';
  @HostBinding('attr.aria-describedby') describedBy = '';
  errorState = false;
  controlType = `app-my-currency`;
  autofilled?: boolean;
  @Input() get value(): string | null {
    return this._value;
  }
  set value(val: string) {
    this._value = val;
    this.stateChanges.next();
  }
  stateChanges = new Subject<void>();
  @HostBinding() id = `app-my-number-${MyCurrencyComponent.nextId++}`;
  ngControl: NgControl;
  focused = false;
  get empty(): boolean {
    return (this._value && false) || this._value === '';
  }
  shouldLabelFloat: boolean;
  @Input()
  get required(): boolean {
    return this._required;
  }
  set(req: boolean) {
    this._required = req;
    this.stateChanges.next();
  }
  setDescribedByIds(ids: string[]): void {
    this.describedBy = ids.join[' '];
  }
  onContainerClick(event: MouseEvent): void {
    throw new Error("Method not implemented.");
  }
  control: AbstractControl;
  @Input() validators: ValidatorFn[];
  @ViewChild('input', null) input: ElementRef<any>;
  onTouched: () => void;
  onChange: () => void;
  @Input() disabled: boolean;
  @Input() label: string;
  @Input()
  get placeholder() {
    return this._placeholder;
  }
  set placeholder(plh) {
    this._placeholder = plh;
    this.stateChanges.next();
  }

  constructor(@Self() @Optional() private controlDirective: NgControl) {
    this.controlDirective.valueAccessor = this;
  }
  ngOnInit() {
    this.control = this.controlDirective.control;
    this.validators = [];
  }
  ngAfterViewInit(): void {
    if (this.control.validator != null) {
      this.validators.push(this.control.validator);
    }
    // Decimal and commas optional
    const regex = /(?=.*?\d)^\$?(([1-9]\d{0,2}(,\d{3})*)|\d+)?(\.\d{1,2})?$/i;
    this.validators.push(Validators.pattern(regex));
    this.control.setValidators(this.validators);
    this.controlDirective.control.updateValueAndValidity({ emitEvent: false });
  }
  ngOnDestroy(): void {
    this.control.clearValidators();
    this.control.clearAsyncValidators();
    this.validators.length = 0;
  }
  writeValue(value: any): void {
    this.input.nativeElement.value = value;
  }
  registerOnChange(fn: () => void): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
