import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MyCurrencyComponent } from './my-currency-component/my-currency-component.component';

@NgModule({
  declarations: [MyCurrencyComponent],
  exports: [MyCurrencyComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class MyCurrencyComponentModuleModule { }
