import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Role } from '../_models/role';


@Injectable({
    providedIn: 'root',
})

export class RoleService {
    private apiurl: string = "http://localhost:3000/api/roles";

    constructor(
        private http: HttpClient
    ) { }

    getAllRole(): Observable<any> {
        return this.http.get<Role[]>(this.apiurl).pipe(map(res => {
            return res;
        }));
    }
}