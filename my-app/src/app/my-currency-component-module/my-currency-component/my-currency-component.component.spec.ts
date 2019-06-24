import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyCurrencyComponent } from './my-currency-component.component';

describe('MyCurrencyComponentComponent', () => {
  let component: MyCurrencyComponent;
  let fixture: ComponentFixture<MyCurrencyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyCurrencyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyCurrencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
