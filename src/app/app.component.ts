import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['app.component.css']
})
export class AppComponent {
  employeeDetailsFormGroup: FormGroup;
  departments = [
    'HR',
    'Payroll'
  ];

  constructor(fb: FormBuilder) {
    this.employeeDetailsFormGroup = fb.group({
      firstName: ['', Validators.required],
      lastName: ['', [Validators.required]],
      middleInitial: ['', Validators.maxLength(1)],
      position: ['Sales', Validators.minLength(3)],
      department: [''],
      immediateSupervisor: [''],
      phoneNumber: ['', Validators.pattern(/^\d{3}-\d{3}-\d{4}$/)],
      email: ['', [Validators.email, Validators.required]],
      status: ['Active', Validators.required]
    });
  }

  saveEmployeeDetails(): void {
    console.log('Form Submitted', this.employeeDetailsFormGroup.value);
  }

  logTheForm(): void {
    console.log('form: ', this.employeeDetailsFormGroup);
  }
}
