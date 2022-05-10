import { Injectable } from '@angular/core';
import {  CanActivate, Router } from '@angular/router';
import { AuthguardService } from 'src/app/services/authguardServices/authguard.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {
  
  constructor(private authGuardService: AuthguardService, private router: Router) { }

  canActivate(): boolean {
    if (!this.authGuardService.getToken()) {
      this.router.navigateByUrl("/login");
    }
    return this.authGuardService.getToken();
  }
  
}
