import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../../Services/auth.service';
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

  /**Use authservice.signin and redirect to /allrecipe */
  SignIn() {
    this.entry.email = this.email;
    this.entry.password = this.password;
    this.authservice.signIn(this.entry).subscribe(() => {
      this.router.navigate(['allrecipe']);
    }, (err) => {
      alert(err.error.errors.msg);
    });
  }

}
