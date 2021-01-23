import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TorrentInfo} from '../../models/torrent-info';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TorrentManagementService {
  private apiEndpoint = environment.baseUrl + environment.apiUrl + 'torrents/';

  constructor(private http: HttpClient) {
  }

  info(
    filter?: 'all' | 'downloading' | 'completed' | 'paused' | 'active' | 'inactive' | 'resumed' | 'stalled' | 'stalled_uploading' | 'stalled_downloading',
    category?: string,
    sort?: string,
    reverse?: boolean,
    limit?: number,
    offset?: number,
    hashes?: string,
  ): Observable<TorrentInfo[]> {
    let params = new HttpParams();
    params = filter ? params.append('filter', filter) : params;
    params = category ? params.append('category', category) : params;
    params = sort ? params.append('sort', sort) : params;
    params = reverse ? params.append('reverse', String(reverse)) : params;
    params = limit ? params.append('limit', limit.toString()) : params;
    params = offset ? params.append('offset', offset.toString()) : params;
    params = hashes ? params.append('hashes', hashes) : params;

    return this.http.get<TorrentInfo[]>(this.apiEndpoint + 'info', {params});
  }

  pause(hashes: string[], pauseAll?: boolean): Observable<void> {
    let params = new HttpParams();
    if (pauseAll) {
      params = params.set('hashes', 'all');
    } else {
      params = params.set('hashes', hashes.join('|'));
    }

    return this.http.get<void>(this.apiEndpoint + 'pause', {params});
  }

  resume(hashes: string[], resumeAll?: boolean): Observable<void> {
    let params = new HttpParams();
    if (resumeAll) {
      params = params.set('hashes', 'all');
    } else {
      params = params.set('hashes', hashes.join('|'));
    }

    return this.http.get<void>(this.apiEndpoint + 'resume', {params});
  }

  delete(hashes: string[], deleteFiles: boolean, deleteAll?: boolean): Observable<void> {
    let params = new HttpParams()
      .set('deleteFiles', String(deleteFiles));
    if (deleteAll) {
      params = params.set('hashes', 'all');
    } else {
      params = params.set('hashes', hashes.join('|'));
    }

    return this.http.get<void>(this.apiEndpoint + 'delete', {params});
  }
}
