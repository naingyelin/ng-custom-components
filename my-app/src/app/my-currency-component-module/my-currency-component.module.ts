import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule, MatInputModule } from '@angular/material';
import { MyCurrencyComponent } from './my-currency-component/my-currency-component.component';

@NgModule({
  declarations: [MyCurrencyComponent],
  exports: [MyCurrencyComponent, MatFormFieldModule, MatInputModule],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule
  ]
})
export class MyCurrencyComponentModuleModule { }
