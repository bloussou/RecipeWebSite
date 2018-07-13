import { Component, OnInit, Input } from '@angular/core';


/**This components display the signin and login components, it has no methods */

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
