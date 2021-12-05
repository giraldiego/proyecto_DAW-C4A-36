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

  constructor(private userService: UserService) {}

  onSubmit(): void {
    this.submitted = true;

    console.log(this.model);
    // this.userService.resetPassword(
    //   this.model.
    //   this.model.message.value
    // )
    console.log('Mensaje enviado!');
  }

}
