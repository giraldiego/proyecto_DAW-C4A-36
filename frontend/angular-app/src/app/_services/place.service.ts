import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Place } from '../models/place';

const API_URL = 'http://localhost:3000/api/places/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class PlaceService {

  constructor(private http: HttpClient) { }

  getAllPlaces(): Observable<any> {
    return this.http.get(API_URL, { responseType: 'json' });
  }

  getPlace(id: string): Observable<any> {
    return this.http.get(API_URL + `${id}`, { responseType: 'json' });
  }

  deletePlace(id: string): Observable<any> {
    return this.http.delete(API_URL + `${id}`, { responseType: 'json' });
  }

  editPlace(place: Place): Observable<any> {
    const {id, city, type, offerType, price, urlPicture } = place;

    // If id is undefined, then create a new user via POST
    if (!id) {
      return this.http.post(API_URL, {
        city,
        type,
        offerType,
        price,
        urlPicture
      }, httpOptions);
    }

    // If there is an id, then patch the user via API
    return this.http.patch(API_URL + `${id}`, {
      city,
      type,
      offerType,
      price,
      urlPicture
    }, httpOptions);
  }
}
