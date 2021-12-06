import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {
  model:any = {
    email: null,
  };

  submitted = false;
  response = '';
  resetFailed = false;
  resetSucceded = false;

  constructor(private authService: AuthService) { }

  onSubmit() {
    this.submitted = true;

    this.authService.resetPassword(
      this.model.email,
    ).subscribe({
        next: data => {
          this.resetSucceded = true;
          this.response = data.message;
        },
        error: err => {
          console.log(err);
          this.resetFailed = true;
          this.response = err.error.message;
        }
      });
  }
}
