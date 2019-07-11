import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/userService.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  loading: boolean;
  error: string;

  constructor(
    private userService: UserService,
  ) { }

  ngOnInit() {
  }
}
