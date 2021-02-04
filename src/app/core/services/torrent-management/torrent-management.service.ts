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
    const data = new FormData();
    if (pauseAll) {
      data.set('hashes', 'all');
    } else {
      data.set('hashes', hashes.join('|'));
    }

    return this.http.post<void>(this.apiEndpoint + 'pause', data);
  }

  resume(hashes: string[], resumeAll?: boolean): Observable<void> {
    const data = new FormData();
    if (resumeAll) {
      data.set('hashes', 'all');
    } else {
      data.set('hashes', hashes.join('|'));
    }

    return this.http.post<void>(this.apiEndpoint + 'resume', data);
  }

  delete(hashes: string[], deleteFiles: boolean, deleteAll?: boolean): Observable<void> {
    const data = new FormData();
    data.set('deleteFiles', String(deleteFiles));

    if (deleteAll) {
      data.set('hashes', 'all');
    } else {
      data.set('hashes', hashes.join('|'));
    }

    return this.http.post<void>(this.apiEndpoint + 'delete', data);
  }

  add(data: FormData): Observable<void> {
    return this.http.post<void>(this.apiEndpoint + 'add', data, {responseType: 'text' as 'json'});
  }

  setForceStart(hashes: string[], value?: boolean, setForceStartAll?: boolean): Observable<void> {
    const data = new FormData();
    if (setForceStartAll) {
      data.set('hashes', 'all');
    } else {
      data.set('hashes', hashes.join('|'));
    }

    const setValue = value || false;
    data.set('value', String(setValue));

    return this.http.post<void>(this.apiEndpoint + 'setForceStart', data);
  }
}
