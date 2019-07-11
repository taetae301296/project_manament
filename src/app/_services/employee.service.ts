import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Employee } from '../_models/employee';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
    providedIn: 'root',
})

export class EmployeeService {
    private apiurl: string = "http://localhost:3000/api/employees";

    constructor(
        private http: HttpClient
    ) { }

    getAllEmployees(): Observable<any> {
        return this.http.get<Employee[]>(this.apiurl).pipe(map(res => {
            return res;
        }));
    }

    getIdEmployee(id): Observable<any> {
        return this.http.get<Employee[]>(this.apiurl + `/${id}`).pipe(map(res => {
            return res;
        }));
    }

    deleteIdEmployee(id): Observable<any> {
        return this.http.delete(this.apiurl + `/${id}`).pipe(map(res => {
            return res;
        }));
    }

    postEmployee(data): Observable<any> {
        return this.http.post(this.apiurl, data).pipe(map(res => {
            return res;
        }));
    }

    putIdEmployee(id, data): Observable<any> {
        return this.http.put(this.apiurl + `/${id}`, data).pipe(map(res => {
            return res;
        }))
    }
}