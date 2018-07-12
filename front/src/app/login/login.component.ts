import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  @Input() email;
  @Input() password;
  entry = {
    email: this.email,
    password: this.password
  };

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  login() {
    this.entry.email = this.email;
    this.entry.password = this.password;
    this.authService.login(this.entry).subscribe(() => {
      this.router.navigate(['/allrecipe']);
    }, (err) => {
      alert(err.error.errors.msg);
    });
  }

  // tslint:disable-next-line:member-ordering

}
