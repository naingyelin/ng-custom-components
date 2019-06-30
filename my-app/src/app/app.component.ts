import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  title = 'my-app';
  fees = 0;
  mobileNo = '';
  form: FormGroup;
  constructor(private fb: FormBuilder) {
  }
  ngOnInit(): void {
    this.form = this.fb.group({
      rebate: [0],
      expenses: [0]
    });
  }
}
