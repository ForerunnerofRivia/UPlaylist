import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { GoogleAPIService } from './services/google-api.service';

@Injectable({
  providedIn: 'root'
})
export class IsConnectedGuard implements CanActivate {

  constructor(private gAPI: GoogleAPIService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    console.log("is-connected-guard(this.gAPI.isLoggedIn()):"+this.gAPI.isLoggedIn());
    if(this.gAPI.isLoggedIn()){
      console.log("guard passed");
      return true;
    }
    else{
      console.log("guard blocked");
      this.router.navigate(['/ytospot']); // Rediriger vers la page de connexion si l'utilisateur n'est pas connecté
      return false;
    }
  }
}
