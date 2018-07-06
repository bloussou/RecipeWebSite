import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { AuthComponent } from '../auth/auth.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})


export class HeaderComponent implements OnInit {
  isloggedin = false;
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.isloggedin = this.authService.isLoggedIn();
  }

  user() {
    return this.authService.isLoggedIn();
  }
  logout() {
    this.authService.logout();
  }

}
