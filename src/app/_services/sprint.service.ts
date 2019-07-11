import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Sprint } from '../_models/sprint';


@Injectable({
    providedIn: 'root',
})

export class SprintService {
    private apiurl: string = "http://localhost:3000/api/sprints";

    constructor(
        private http: HttpClient
    ) { }

    getAllSprint(): Observable<any> {
        return this.http.get<Sprint[]>(this.apiurl).pipe(map(res => {
            return res;
        }));
    }

    getSprintById(id): Observable<any>{
        return this.http.get<Sprint[]>(this.apiurl+`/${id}`).pipe(map(res => {
            return res;
        }));
    }

    postSprint(data): Observable<any> {
        return this.http.post(this.apiurl, data).pipe(map(res => {
            return res;
        })); 
    }

    putSprint(id, data): Observable<any> {
        return this.http.put(this.apiurl+`/${id}`, data).pipe(map(res => {
            return res;
        }))
    }    

    deleteSprint(id): Observable<any> {
        return this.http.delete(this.apiurl+`/${id}`).pipe(map(res => {
            return res;
        }));
    }
}