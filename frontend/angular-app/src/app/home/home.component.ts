import { Component, OnInit } from '@angular/core';
import { PlaceService } from '../_services/place.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  content?: string;
  places?:any[];

  constructor(
    private userService: UserService,
    private placeService: PlaceService) { }

  ngOnInit(): void {
    this.placeService.getAllPlaces().subscribe({
      next: data => {
        this.content = data;
        this.places = data['places'];
      },
      error: err => {
        this.content = err.error.message;
      }
    });
  }

}
