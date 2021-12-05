import { Component, OnInit } from '@angular/core';
import { ConctactUsMsg } from "./contactUsMsg";
import { UserService } from 'src/app/_services/user.service';


@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent {
  model = new ConctactUsMsg('','');
  submitted = false;
  response = '';
  sentFailed = false;
  sentSucceded = false;

  constructor(private userService: UserService) {}

  onSubmit(): void {
    this.submitted = true;

    this.userService.resetPassword(
      this.model.email,
      this.model.message
    ).subscribe({
        next: data => {
          this.sentSucceded = true;
          this.response = data.message;
        },
        error: err => {
          console.log(err);
          this.sentFailed = true;
          this.response = err.error.message;
        }
      });
  }
}
