import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/_services/userService.service';
import { User1 } from 'src/app/_models/user1';
import { Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  role: number;
  users: User1[];

  avatar: string;
  firstName: string;
  lastName: string;
  email: string;

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    this.userService.getUser().subscribe(data => {

      if (data) {
        this.role = data.profile.role;

        this.avatar = data.profile.avatar;
        this.firstName = data.profile.firstName;
        this.lastName = data.profile.lastName;
        this.email = data.profile.email;

        if (this.role == 3 || this.role == 4 || this.role == 5 || this.role == 6) {
          $(function () {
            $('.navbar-nav').hide();
          })
        }
      }
    }, error =>{
      if (error){
        console.log(error);
        alert(error);
      }
      this.router.navigateByUrl('/error-500');
    });
  }
}
