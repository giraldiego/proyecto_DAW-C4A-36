import { Component, OnInit } from '@angular/core';
import { PlaceService } from 'src/app/_services/place.service';
import { TokenStorageService } from "src/app/_services/token-storage.service";

@Component({
  selector: 'app-place-list',
  templateUrl: './place-list.component.html',
  styleUrls: ['./place-list.component.css']
})
export class PlaceListComponent implements OnInit {
  userId:any;
  content?: string;
  places?:any[];

  constructor(
    private placeService: PlaceService,
    private token: TokenStorageService) { }

  ngOnInit(): void {
    this.placeService.getAllPlaces().subscribe({
      next: data => {
        console.log(data);
        this.places = data.places;
        if (!this.token.isAdmin()) {
          this.userId = this.token.getUser().userId;
          this.places = data.places.filter((p:any) => p.creator === this.userId);
        }
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
