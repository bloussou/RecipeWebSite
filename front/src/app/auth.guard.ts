import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';


import { AuthService } from './Services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        private router: Router,
        private authService: AuthService) { }

    /**Canactivate method allow front access if user is login */
    canActivate(): boolean {
        if (!this.authService.isLoggedIn()) {
            this.router.navigate(['auth']);
            return false;
        }
        return true;
    }

}
