import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Department } from '../_models/department';


@Injectable({
    providedIn: 'root',
})

export class DepartmentService {
    private apiurl: string = "http://localhost:3000/api/departments";

    constructor(
        private http: HttpClient
    ) { }

    getAllDepartments(): Observable<any> {
        return this.http.get<Department[]>(this.apiurl).pipe(map(res => {
            return res;
        }));
    }

    getDepartmentById(id): Observable<any>{
        return this.http.get(this.apiurl+`/${id}`).pipe(map(res => {
            return res;
        }));
    }

    postDepartment(data): Observable<any> {
        return this.http.post(this.apiurl, data).pipe(map(res => {
            return res;
        })); 
    }

    putIdDepartment(id, data): Observable<any> {
        return this.http.put(this.apiurl+`/${id}`, data).pipe(map(res => {
            return res;
        }))
    }    

    deleteDepartment(id): Observable<any> {
        return this.http.delete(this.apiurl+`/${id}`).pipe(map(res => {
            return res;
        }));
    }
}