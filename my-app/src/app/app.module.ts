import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MyCurrencyComponentModule } from './my-currency-component-module/my-currency-component.module';
import { MyPhoneComponentModule } from './my-phone/my-phone.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MyCurrencyComponentModule,
    MyPhoneComponentModule,
    BrowserAnimationsModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
