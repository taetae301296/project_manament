import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User1 } from '../_models/user1';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    constructor(
        private http: HttpClient
    ) { }

    getUser(): Observable<any> {
        return this.http.get<User1[]>(`http://localhost:3000/api/auth/me`).pipe(map(res => {
            return res;
        }));
    }
}