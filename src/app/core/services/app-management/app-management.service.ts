import { Injectable } from '@angular/core';
import {environment} from '../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppManagementService {
  private apiEndpoint = environment.baseUrl + environment.apiUrl + 'app/';

  constructor(private http: HttpClient) {
  }

  webapiVersion(): Observable<string> {
    return this.http.get<string>(this.apiEndpoint + 'webapiVersion');
  }
}
