import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-signup',
  standalone: true,
  templateUrl: './signup.component.html',
  imports: [FormsModule, ReactiveFormsModule],
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  signUpForm = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.email, Validators.required],
    }),
    passwords: new FormGroup({
      password: new FormControl('', {
        validators: [Validators.required, Validators.minLength(6)],
      }),
      confirmpassword: new FormControl('', {
        validators: [Validators.required, Validators.minLength(6)],
      }),
    }),

    firstName: new FormControl('', {
      validators: [Validators.required],
    }),
    lastName: new FormControl('', {
      validators: [Validators.required],
    }),
    address: new FormGroup({
      street: new FormControl('', {
        validators: [Validators.required],
      }),
      number: new FormControl('', {
        validators: [Validators.required],
      }),
      postalCode: new FormControl('', {
        validators: [Validators.required],
      }),
      city: new FormControl('', {
        validators: [Validators.required],
      }),
    }),
    source:new FormArray([
      new FormControl(false),
      new FormControl(false),
      new FormControl(false),
    ]),
    role: new FormControl<
      'student' | 'teacher' | 'employee' | 'founder' | 'other'
    >('student', {
      validators: [Validators.required],
    }),
    agree: new FormControl(false, { validators: [Validators.required] }),
  });

  onSubmit() {
    throw new Error('Method not implemented.');
  }

  onReset() {
    this.signUpForm.reset();
  }
}
