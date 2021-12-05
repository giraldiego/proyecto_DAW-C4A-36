import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import Validation from 'src/app/utils/validation';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: FormGroup = this.fb.group({
    name: ['',           [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20)
    ]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', Validators.required],
    acceptTerms: [false, Validators.requiredTrue]
  },
  {
    validators: [Validation.match('password', 'confirmPassword')]
  });

  submitted = false;
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(private fb: FormBuilder, private authService: AuthService) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    this.authService.register(
      this.form.controls['name'].value,
      this.form.controls['email'].value,
      this.form.controls['password'].value,
      ).subscribe({
      next: data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onReset(): void {
    this.submitted = false;
    this.form.reset();
  }
}
