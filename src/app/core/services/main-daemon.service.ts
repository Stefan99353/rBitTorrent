import {Injectable} from '@angular/core';
import {TorrentInfo} from '../models/torrent-info';
import {HttpClient, HttpParams} from '@angular/common/http';
import {TorrentManagementService} from './torrent-management/torrent-management.service';
import {AppConfig} from '../config/app-config';
import {AppConfigService} from './app-config/app-config.service';
import {Observable, Subject} from 'rxjs';
import {environment} from '../../../environments/environment';
import {GlobalTransferInfo} from '../models/global-transfer-info';

export interface MainDataResponse {
  rid: number;
  full_update?: boolean;
  torrents?: { [key: string]: any };
  torrents_removed?: string[];
  categories?: { [key: string]: any };
  categories_removed?: any[];
  tags?: any[];
  tags_removed?: any[];
  server_state?: { [key: string]: any };
}

@Injectable({
  providedIn: 'root'
})
export class MainDaemonService {
  private apiEndpoint = environment.baseUrl + environment.apiUrl;

  private appConfig: AppConfig;

  private requestId = 0;
  private syncTimer?: number;

  private serverState: GlobalTransferInfo = new GlobalTransferInfo();
  private serverStateSubject = new Subject<GlobalTransferInfo>();

  private torrentInfos: TorrentInfo[] = [];
  private torrentInfoSubject = new Subject<TorrentInfo[]>();

  public categories: any[] = [];

  public tags: any[] = [];

  constructor(
    private http: HttpClient,
    private appConfigService: AppConfigService,
    private torrentManagementService: TorrentManagementService
  ) {
    // Get Config
    this.appConfig = this.appConfigService.loadConfig();

    // Do Initial Requests
    this.initialRequests();
  }

  initialRequests(): void {
    this.torrentManagementService.info()
      .subscribe(value => {
        this.torrentInfos = value;
        this.torrentInfoSubject.next(this.torrentInfos);

        // Start Sync
        this.syncLoop();
      });
  }

  syncLoop(): void {
    this.syncTimer = setInterval(() => {
      console.log('Sync');

      const params = new HttpParams()
        .set('rid', this.requestId.toString());

      this.http
        .get<MainDataResponse>(this.apiEndpoint + 'sync/maindata', {params})
        .subscribe(value => {
          this.requestId = value.rid;

          // Update everything
          this.updateTorrents(value.torrents);
          this.removeTorrents(value.torrents_removed);


          // Update Server State
          this.updateServerState(value.server_state);
        });

    }, this.appConfig.syncInterval);
  }

  updateTorrents(torrents?: { [key: string]: any }): void {
    // Check of parameter is set
    if (torrents) {
      // Get torrent hashes that need updating
      const hashes = Object.keys(torrents);

      // Run through hashes and update torrent
      hashes.forEach(hash => {
        // Get torrent that needs updating
        const torrentInfo = this.torrentInfos.find(value => value.hash === hash);
        // Get Object which contains new data
        const updateData = torrents[hash];

        // Check if torrent exists
        if (torrentInfo) {
          // Update every key
          Object.keys(updateData).forEach((key: string) => {
            torrentInfo[key] = updateData[key];
          });
        } else {
          const newTorrent = new TorrentInfo();

          // Update every key
          Object.keys(updateData).forEach((key: string) => {
            newTorrent[key] = updateData[key];
          });

          // Set hash
          newTorrent.hash = hash;

          this.torrentInfos.push(newTorrent);
        }
      });

      this.torrentInfoSubject.next(this.torrentInfos);
    }
  }

  removeTorrents(hashes?: string[]): void {
    if (hashes) {
      this.torrentInfos = this.torrentInfos.filter(value => !hashes.includes(value.hash));
      this.torrentInfoSubject.next(this.torrentInfos);
    }
  }

  updateCategories(): void {
  }

  removeCategories(): void {
  }

  updateTags(): void {
  }

  removeTags(): void {
  }

  updateServerState(state?: {[key: string]: any}): void {
    if (state) {
      // Update every key
      Object.keys(state).forEach((key: string) => {
        this.serverState[key] = state[key];
      });

      this.serverStateSubject.next(this.serverState);
    }
  }

  torrentInfoObservable(): Observable<TorrentInfo[]> {
    return this.torrentInfoSubject.asObservable();
  }

  serverStateObservable(): Observable<GlobalTransferInfo> {
    return this.serverStateSubject.asObservable();
  }
}
