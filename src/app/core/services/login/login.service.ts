import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

export const LOGIN_STATE_STORAGE_KEY = 'loggedIn';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  apiEndpoint = environment.baseUrl + 'api/v2/';

  constructor(private http: HttpClient) {
  }

  isLoggedIn(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      const storageJson = localStorage.getItem(LOGIN_STATE_STORAGE_KEY);
      const loginStorage: LoginStorage = storageJson !== null ? JSON.parse(storageJson) : new LoginStorage();

      if (!loginStorage.loggedIn || loginStorage.expiresAt <= Date.now() / 1000) {
        // Make API Call
        const response = this.http.get<any>(this.apiEndpoint + 'app/version', {
          observe: 'response',
          responseType: 'text' as 'json'
        });

        response.subscribe(value => {
            if (value.ok) {
              const storage = new LoginStorage();
              storage.loggedIn = true;

              localStorage.setItem(LOGIN_STATE_STORAGE_KEY, JSON.stringify(storage));
              resolve(true);
            } else {
              localStorage.removeItem(LOGIN_STATE_STORAGE_KEY);
              resolve(false);
            }
          },
          error => {
            localStorage.removeItem(LOGIN_STATE_STORAGE_KEY);
            reject(error);
          });
      } else {
        resolve(true);
      }
    });
  }

  login(username: string, password: string): Observable<boolean> {
    const data = new FormData();
    data.append('username', username);
    data.append('password', password);

    const response = this.http.post<any>(this.apiEndpoint + 'auth/login', data, {
      observe: 'response',
      responseType: 'text' as 'json'
    });

    return response.pipe(
      map(value => {
        return value.body === 'Ok.';
      })
    );
  }

  logout(): Observable<void> {
    return this.http.post<void>(this.apiEndpoint + 'auth/logout', null);
  }
}

export class LoginStorage {
  public loggedIn: boolean;
  public expiresAt: number;

  constructor() {
    this.loggedIn = false;
    this.expiresAt = Date.now() / 1000 + 3600;
  }
}
