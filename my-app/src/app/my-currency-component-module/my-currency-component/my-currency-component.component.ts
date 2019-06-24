import { Component, OnInit, OnDestroy, Self, Optional, ViewChild, ElementRef, Input } from '@angular/core';
import { AbstractControl, NG_VALUE_ACCESSOR, Validators, NgControl, ControlValueAccessor, ValidatorFn } from '@angular/forms';

@Component({
  selector: 'app-my-currency-component',
  templateUrl: './my-currency-component.component.html',
  styleUrls: ['./my-currency-component.component.sass']
})
export class MyCurrencyComponent implements OnInit, OnDestroy, ControlValueAccessor {
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
    this.control = this.controlDirective.control;
  }
  ngOnInit() {
    this.validators = [];
    if (this.control.validator != null) {
      this.validators.push(this.control.validator);
    }
    this.validators.push(Validators.nullValidator);
    this.validators.push(Validators.required);
    const regex = /^(\$)?([1-9]{1}[0-9]{0,2})(\,\d{3})*(\.\d{2})?$|^(\$)?([1-9]{1}[0-9]{0,2})(\d{3})*(\.\d{2})?$|^(0)?(\.\d{2})?$|^(\$0)?(\.\d{2})?$|^(\$\.)(\d{2})?$/g;
    this.validators.push(Validators.pattern(regex));
    this.control.setValidators(this.validators);
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
