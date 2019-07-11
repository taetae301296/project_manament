import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Project } from '../_models/project';


@Injectable({
    providedIn: 'root',
})

export class ProjectService {
    private apiurl: string = "http://localhost:3000/api/projects";

    constructor(
        private http: HttpClient
    ) { }

    getAllProjects(): Observable<any> {
        return this.http.get<Project[]>(this.apiurl).pipe(map(res => {
            return res;
        }));
    }

    getProjectById(id): Observable<any>{
        return this.http.get<Project[]>(this.apiurl+`/${id}`).pipe(map(res =>{
            return res;
        }));
    }

    postProject(data): Observable<any> {
        return this.http.post(this.apiurl, data).pipe(map(res => {
            return res;
        })); 
    }

    putProject(id, data): Observable<any> {
        return this.http.put(this.apiurl+`/${id}`, data).pipe(map(res => {
            return res;
        }));
    }

    deleteProjectById(id): Observable<any> {
        return this.http.delete(this.apiurl+`/${id}`).pipe(map(res => {
            return res;
        }));
    }
}