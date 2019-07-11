import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Task } from '../_models/task';

@Injectable({
    providedIn: 'root',
})

export class TaskService {
    private apiurl: string = "http://localhost:3000/api/tasks";

    constructor(
        private http: HttpClient
    ) { }

    getAllTask(): Observable<any> {
        return this.http.get<Task[]>(this.apiurl).pipe(map(res => {
            return res;
        }));
    }

    postTask(data): Observable<any> {
        return this.http.post(this.apiurl, data).pipe(map(res => {
            return res;
        })); 
    }
    
    putTask(id, data): Observable<any> {
        return this.http.put(this.apiurl+`/${id}`, data).pipe(map(res => {
            return res;
        }))
    }

    deleteTask(id): Observable<any> {
        return this.http.delete(this.apiurl+`/${id}`).pipe(map(res => {
            return res;
        }));
    }

    getTaskById(id): Observable<any> {
        return this.http.get<Task[]>(this.apiurl + `/${id}`).pipe(map(res => {
            return res;
        }));
    }
}