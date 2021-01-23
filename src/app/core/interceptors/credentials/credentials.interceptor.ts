import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {Router} from '@angular/router';
import {catchError} from 'rxjs/operators';
import {LOGIN_STATE_STORAGE_KEY} from '../../services/login/login.service';

@Injectable()
export class CredentialsInterceptor implements HttpInterceptor {

  constructor(private router: Router) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const req = request.clone({
      withCredentials: true,
    });

    return next.handle(req).pipe(catchError(err => {
      if (err.status === 403) {
        // Redirect
        localStorage.removeItem(LOGIN_STATE_STORAGE_KEY);
        this.router.navigate(['login'], {skipLocationChange: true});
      }
      return throwError(err.error);
    }));
  }
}
