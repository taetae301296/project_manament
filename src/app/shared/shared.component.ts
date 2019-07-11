import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-shared',
  template: `
  <app-header></app-header>
  <router-outlet></router-outlet>
  <app-footer></app-footer>
  `,
})


export class SharedComponent {
  title = 'project1';

  constructor(private http:HttpClient){
    
  }
}
