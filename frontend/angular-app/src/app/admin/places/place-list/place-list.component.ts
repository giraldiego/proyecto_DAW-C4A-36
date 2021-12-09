import { Component, OnInit } from '@angular/core';
import { PlaceService } from 'src/app/_services/place.service';

@Component({
  selector: 'app-place-list',
  templateUrl: './place-list.component.html',
  styleUrls: ['./place-list.component.css']
})
export class PlaceListComponent implements OnInit {
  content?: string;
  places?:any[];

  constructor(private placeService: PlaceService) { }

  ngOnInit(): void {
    this.placeService.getAllPlaces().subscribe({
      next: data => {
        this.places = data.places;
        console.log(this.places);

        this.content = data;
      },
      error: err => {
        this.content = JSON.parse(err.error).message;
      }
    });
  }

  deletePlace(placeId: string) {
    this.placeService.deletePlace(placeId)
    .subscribe({
      next: (data) => {
        console.log(data);
        this.places = this.places?.filter(p => p.id !== placeId);
      },
      error: err => {
        console.log(err.error.message);
      }
    });
  }
}
