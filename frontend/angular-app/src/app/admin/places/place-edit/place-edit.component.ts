import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Place, TYPE, OFFER_TYPE, STATUS } from 'src/app/models/place';
import { PlaceService } from 'src/app/_services/place.service';

@Component({
  selector: 'app-place-edit',
  templateUrl: './place-edit.component.html',
  styleUrls: ['./place-edit.component.css']
})
export class PlaceEditComponent implements OnInit {
  placeId?:string;

  place:Place = {
    city:'',
    type:'',
    offerType: '',
    price: 0
  };

  types = TYPE;
  offerTypes = OFFER_TYPE;

  submitted = false;
  response = '';
  saveFailed = false;

  constructor(
    private placeService: PlaceService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      return;
    }

    this.placeId = id;

    this.placeService.getPlace(id)
    .subscribe({
      next: data => {
        console.log(data);
        this.place = data.place;
      },
      error: err => {
        console.log(err.error.message);
      }
    })
  }

  onSubmit() {
    this.submitted = true;
    console.log('submitting...');

    this.placeService.editPlace(this.place)
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
