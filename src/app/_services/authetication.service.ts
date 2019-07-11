import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  login(user: string, pass: string) {
    return this.http.post<any>(`http://localhost:3000/api/auth/login`, {
      user_name: user,
      password: pass
    }).pipe(map(user => {

      if (user && user.token) {
        localStorage.setItem('currentUser', JSON.stringify(user));
      }

      return user;
    }));
  }

  getCurrentUser(): Observable<any> {
    return this.http.get<any>(`http://localhost:3000/api/auth/me`).pipe(map(user => {
      if (user) return user;
    }));
  }

  logout() {
    localStorage.removeItem('currentUser');
  }
}