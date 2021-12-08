import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { User } from "../../../models/user";
import { UserService } from "../../../_services/user.service";

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  userId:string = '';

  user:User = {
    name:'',
    email:'',
    role:''
  };

  roles = ['cliente', 'asesor', 'admin'];

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

    this.userService.patchUser(this.userId, this.user)
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
      })
  }
}
