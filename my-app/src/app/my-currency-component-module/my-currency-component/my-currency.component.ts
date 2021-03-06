import { Component, OnInit, OnDestroy, Self, Optional, ViewChild, ElementRef, Input, AfterViewInit } from '@angular/core';
import { AbstractControl, NG_VALUE_ACCESSOR, Validators, NgControl, ControlValueAccessor, ValidatorFn } from '@angular/forms';

@Component({
  selector: 'app-my-currency',
  templateUrl: './my-currency-component.component.html',
  styleUrls: ['./my-currency-component.component.sass']
})
export class MyCurrencyComponent implements OnInit, OnDestroy, AfterViewInit, ControlValueAccessor {
  control: AbstractControl;
  @Input() validators: ValidatorFn[];
  @ViewChild('input', null) input: ElementRef<any>;
  onTouched: () => void;
  onChange: () => void;
  @Input() disabled: boolean;
  @Input() label: string;
  @Input() placeholder = '';
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
