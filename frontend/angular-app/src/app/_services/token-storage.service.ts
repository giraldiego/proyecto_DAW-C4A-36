import { Injectable } from '@angular/core';
/**
 * TokenStorageService to manages token and user information (username, email, roles)
 * inside Browser’s Session Storage. For Logout, we only need to clear this Session Storage.
*/

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor() { }

  isLoggedIn() {
    return !!this.getToken();
  }

  isModerator() {
    const roles = this.getUser().roles;
    if (roles) {
      return roles[0] === 'asesor';
    }
    return false;
  }

  isAdmin() {
    const roles = this.getUser().roles;
    if (roles) {
      return roles[0] === 'admin';
    }
    return false;
  }

  signOut(): void {
    window.sessionStorage.clear();
  }

  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string | null {
    return window.sessionStorage.getItem(TOKEN_KEY);
  }

  public saveUser(user: any): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): any {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }
    return {};
  }
}
