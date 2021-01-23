import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {LoginService} from '../../services/login/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private login: LoginService, private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return this.login.isLoggedIn().then(value => {
      if (!value) {
        this.router.navigate(['login'], {skipLocationChange: true});
        return false;
      } else {
        return true;
      }
    })
      .catch(reason => {
        this.router.navigate(['login'], {skipLocationChange: true});
        return false;
      });
  }
}
