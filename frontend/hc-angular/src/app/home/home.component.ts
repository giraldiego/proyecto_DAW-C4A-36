import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';

/**
 * Our Home Component will use UserService to get
 * public resources from back-end.
 */
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  items?: any;
  content?: string;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getPublicContent().subscribe(
      data => {
        this.items = JSON.parse(data)['places'];

        this.content = data;
      },
      err => {
        this.content = JSON.parse(err.error).message;
      }
    )
  }

}
