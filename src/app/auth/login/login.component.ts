import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/_services/authetication.service';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from 'src/app/_models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formGroup: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';

  users: User[];
  

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthenticationService
    ) { }

  ngOnInit() {
    this.buildForm();
    this.authService.logout();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  buildForm() {
    const emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";

    this.formGroup = this.fb.group({
      email: ['', [
        Validators.required,
        Validators.pattern(emailPattern)
      ]],
      password: ['', [
        Validators.required
      ]]
    });
  }

  onSubmit() {
    if (this.formGroup.invalid){
      return;
    }

    this.authService.login(this.formGroup.value.email, this.formGroup.value.password).subscribe(res => {
      if (res.auth) {
        this.router.navigate([this.returnUrl]);
      }
    },
    error =>{
      if (error){
        alert("Email or password is incorrect")
        this.loading = false;
        this.deleteAllLogin();
      }
    });
  }

  

  deleteAllLogin(){
    this.formGroup = this.fb.group({
      email: [''],
      password: ['']
    });
  }
}
