import { Component, Input, OnInit, OnDestroy, HostBinding, Self, Optional, ElementRef, DoCheck } from '@angular/core';
import { FormGroup, FormBuilder, NgControl, ControlValueAccessor, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { MatFormFieldControl, ErrorStateMatcher } from '@angular/material';
import { Observable, Subject } from 'rxjs';
import { FocusMonitor } from '@angular/cdk/a11y';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { MyTel } from './model/my-tel';

export class NgAppMyPhoneErrorStateMatcher implements ErrorStateMatcher {
  constructor(private ngInput: MyPhoneComponent) {
  }
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    if (!control) {
      return this.ngInput.required && this.ngInput.empty;
    } else {
      return !!(control && control.invalid && (control.touched || (form && form.submitted)));
    }
  }
}

@Component({
  selector: 'app-my-phone',
  templateUrl: './my-phone.component.html',
  styleUrls: ['./my-phone.component.css'],
  providers: [{ provide: MatFormFieldControl, useExisting: MyPhoneComponent }]
})
export class MyPhoneComponent implements OnInit, OnDestroy, DoCheck, ControlValueAccessor, MatFormFieldControl<MyTel> {

  @Input()
  get placeholder() {
    return this.pkPlaceholder;
  }
  set placeholder(plh) {
    this.pkPlaceholder = plh;
    this.stateChanges.next();
  }
  get empty(): boolean {
    const n: MyTel = this.parts.value;
    return !n.area && !n.exchange && !n.subscriber;
  }
  @HostBinding('class.floating')
  get shouldLabelFloat() {
    return this.focused || !this.empty;
  }
  @Input()
  get required() {
    return this.pkRequired;
  }
  set required(req) {
    this.pkRequired = coerceBooleanProperty(req);
    this.stateChanges.next();
  }
  @Input()
  get disabled(): boolean { return this.pkDisabled; }
  set disabled(value: boolean) {
    this.pkDisabled = coerceBooleanProperty(value);
    this.pkDisabled ? this.parts.disable() : this.parts.enable();
    this.stateChanges.next();
  }
  @Input()
  get value(): MyTel | null {
    const n = this.parts.value;
    if (n.area.length === 3 && n.exchange.length === 3 && n.subscriber.length === 4) {
      return new MyTel(n.area, n.exchange, n.subscriber);
    }
    return null;
  }
  set value(tel: MyTel | null) {
    tel = tel || new MyTel('', '', '');
    this.stateChanges.next();
    this.parts.setValue({ area: tel.area, exchange: tel.exchange, subscriber: tel.subscriber });
  }
  static nextId = 0;
  stateChanges = new Subject<void>();
  @HostBinding() id = `app-my-phone-${MyPhoneComponent.nextId++}`;
  private pkPlaceholder: string;
  focused = false;
  private pkRequired = false;
  private pkDisabled: boolean;
  errorState = false;
  @Input() errorStateMatcher: ErrorStateMatcher;
  private defaultErrorStateMatcher: ErrorStateMatcher = new NgAppMyPhoneErrorStateMatcher(this);
  @HostBinding('attr.aria-describedby') describedBy = '';
  controlType = 'app-my-phone';
  autofilled?: boolean;
  parts: FormGroup;
  onChange: (obj: any) => void;
  onTouched: (obj: any) => void;

  constructor(
    @Optional() @Self() public ngControl: NgControl,
    @Optional() private parentForm: NgForm,
    @Optional() private parentFormGroup: FormGroupDirective,
    fb: FormBuilder,
    private fm: FocusMonitor,
    private elRef: ElementRef<HTMLElement>) {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
    this.parts = fb.group({
      area: '',
      exchange: '',
      subscriber: '',
    });
    this.fm.monitor(this.elRef.nativeElement, true).subscribe(o => {
      this.focused = !!o;
      this.stateChanges.next();
    });
  }
  ngOnInit(): void {
  }
  ngOnDestroy(): void {
    this.stateChanges.complete();
  }
  ngDoCheck() {
    // We need to re-evaluate this on every change detection cycle, because there are some
    // error triggers that we can't subscribe to (e.g. parent form submissions). This means
    // that whatever logic is in here has to be super lean or we risk destroying the performance.
    this.updateErrorState();
  }
  setDescribedByIds(ids: string[]): void {
    this.describedBy = ids.join(' ');
  }
  onContainerClick(event: MouseEvent): void {
    if ((event.target as Element).tagName.toLowerCase() !== 'input') {
      this.elRef.nativeElement.querySelector('input').focus();
    }
  }
  writeValue(obj: any): void {
    this.value = obj;
  }
  registerOnChange(fn: (obj: any) => void): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: (obj: any) => void) {
    this.onTouched = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    this.disabled = coerceBooleanProperty(isDisabled);
  }
  updateErrorState() {
    const oldState = this.errorState;
    const parent = this.parentFormGroup || this.parentForm;
    const matcher = this.errorStateMatcher || this.defaultErrorStateMatcher;
    const control = this.ngControl ? this.ngControl.control as FormControl : null;
    const newState = matcher.isErrorState(control, parent);

    if (newState !== oldState) {
      this.errorState = newState;
      this.stateChanges.next();
    }
  }
  handleInput(): void {
    this.onChange(this.parts.value);
  }
}
