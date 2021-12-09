import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { User, ROLE } from "../../../models/user";
import { UserService } from "../../../_services/user.service";

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  userId?:string;

  user:User = {
    name:'',
    email:'',
    role: ROLE[1] // asesor
  };

  roles = ROLE;

  submitted = false;
  response = '';
  saveFailed = false;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      return;
    }

    this.userId = id;

    this.userService.getUser(id)
    .subscribe({
      next: data => {
        console.log(data);
        this.user = data.user;
      },
      error: err => {
        console.log(err.error.message);
      }
    })
  }

  onSubmit() {
    this.submitted = true;
    console.log('submitting...');

    this.userService.editUser(this.user)
      .subscribe({
        next: (data) => {
          console.log(data);
          this.location.back();
        },
        error: err => {
          console.log(err.error.message);
          this.response = err.error.message;
          this.saveFailed = true;
        }
      });
  }

}
