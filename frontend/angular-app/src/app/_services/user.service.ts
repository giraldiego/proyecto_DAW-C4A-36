import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from "../models/user";

const API_URL = 'http://localhost:3000/api/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getPublicContent(): Observable<any> {
    return this.http.get(API_URL + 'places', { responseType: 'text' });
  }

  getUserBoard(): Observable<any> {
    return this.http.get(API_URL + 'places', { responseType: 'text' });
  }

  getModeratorBoard(): Observable<any> {
    return this.http.get(API_URL + 'places', { responseType: 'text' });
  }

  getAdminBoard(): Observable<any> {
    return this.http.get(API_URL + 'users', { responseType: 'text' });
  }

  getAllUsers(): Observable<any> {
    return this.http.get(API_URL + 'users', { responseType: 'json' });
  }

  contactUs(email: string, message: string): Observable<any> {
    return this.http.post(API_URL + 'contactus', {
      from: email,
      message
    });
  }

  getUser(id: string): Observable<any> {
    return this.http.get(API_URL + `users/${id}`, { responseType: 'json' });
  }

  patchUser(id: string, user: User): Observable<any> {
    return this.http.patch(API_URL + `users/${id}`, {
      name: user.name,
      email: user.email,
      role: user.role
    }, httpOptions);
  }
}
