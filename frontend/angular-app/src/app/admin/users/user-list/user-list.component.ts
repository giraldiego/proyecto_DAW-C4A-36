import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  content?: string;
  users?:any[];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe({
      next: data => {
        this.users = data.users;
        console.log(this.users);

        this.content = data;
      },
      error: err => {
        this.content = JSON.parse(err.error).message;
      }
    });
  }

  deleteUser(userId: string) {
    this.userService.deleteUser(userId)
    .subscribe({
      next: (data) => {
        console.log(data);
        this.users = this.users?.filter(u => u.id !== userId);
      },
      error: err => {
        console.log(err.error.message);
      }
    });
  }

}
