import { Component, OnInit } from '@angular/core';
import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})


export class HeaderComponent implements OnInit {
  isloggedin: boolean;


  constructor(private authService: AuthService) {
    this.isloggedin = false;
  }

  /**
   * initialize the boolean isloggedin
   */
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
