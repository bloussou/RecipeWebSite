import { Component, OnInit, Input } from '@angular/core';
import { AuthService, SignInResponse } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  @Input() email;
  @Input() password;
  entry = {
    email: '',
    password: '',
  };


  constructor(private authservice: AuthService, private router: Router) { }

  ngOnInit() {
  }

  SignIn() {
    this.entry.email = this.email;
    this.entry.password = this.password;
    this.authservice.signIn(this.entry).subscribe(() => {
      this.router.navigate(['allrecipe']);
    }, (err) => {
      console.log(err);
    });
  }

}
