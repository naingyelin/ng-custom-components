import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule, MatIconModule } from '@angular/material';
import { A11yModule } from '@angular/cdk/a11y';
import { MyPhoneComponent } from './my-phone/my-phone.component';

@NgModule({
  declarations: [MyPhoneComponent],
  exports: [MyPhoneComponent, A11yModule, MatFormFieldModule, MatIconModule],
  imports: [
    CommonModule,
    A11yModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatIconModule
  ]
})
export class MyPhoneComponentModule { }
