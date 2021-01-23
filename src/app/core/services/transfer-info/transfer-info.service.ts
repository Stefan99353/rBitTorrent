import {Injectable} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {GlobalTransferInfo} from '../../models/global-transfer-info';
import {TorrentInfo} from '../../models/torrent-info';

@Injectable({
  providedIn: 'root'
})
export class TransferInfoService {
  private apiEndpoint = environment.baseUrl + environment.apiUrl + 'transfer/';

  constructor(private http: HttpClient) {
  }

  info(): Observable<GlobalTransferInfo> {
    return this.http.get<GlobalTransferInfo>(this.apiEndpoint + 'info');
  }

  speedLimitsMode(): Observable<number> {
    return this.http.get<number>(this.apiEndpoint + 'speedLimitsMode');
  }

  toggleSpeedLimitsMode(): Observable<void> {
    return this.http.get<void>(this.apiEndpoint + 'toggleSpeedLimitsMode', {});
  }

  downloadLimit(): Observable<number> {
    return this.http.get<number>(this.apiEndpoint + 'downloadLimit');
  }

  setDownloadLimit(limit: number): Observable<void> {
    const params = new HttpParams()
      .set('limit', limit.toString());

    return this.http.get<void>(this.apiEndpoint + 'setDownloadLimit', {params});
  }

  uploadLimit(): Observable<number> {
    return this.http.get<number>(this.apiEndpoint + 'uploadLimit');
  }

  setUploadLimit(limit: number): Observable<void> {
    const params = new HttpParams()
      .set('limit', limit.toString());

    return this.http.get<void>(this.apiEndpoint + 'setUploadLimit', {params});
  }

  banPeers(peers: string[]): Observable<void> {
    const params = new HttpParams()
      .set('peers', peers.join('|'));

    return this.http.get<void>(this.apiEndpoint + 'banPeers', {params});
  }
}
