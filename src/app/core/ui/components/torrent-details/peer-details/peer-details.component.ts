import {AfterViewInit, Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {AppConfig} from '../../../../config/app-config';
import {AppConfigService} from '../../../../services/app-config/app-config.service';
import {TorrentManagementService} from '../../../../services/torrent-management/torrent-management.service';
import {MatTable, MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {HttpClient, HttpParams} from '@angular/common/http';
import {PeerInfo} from '../../../../models/peer-info';
import {environment} from '../../../../../../environments/environment';

export interface PeerInfoResponse {
  rid: number;
  full_update?: boolean;
  peers?: { [key: string]: any };
  peers_removed?: string[];
  show_flags?: boolean;
}

@Component({
  selector: 'app-peer-details',
  templateUrl: './peer-details.component.html',
  styleUrls: ['./peer-details.component.scss']
})
export class PeerDetailsComponent implements OnInit, OnDestroy, AfterViewInit {

  @Input() torrentHash!: string;

  @ViewChild(MatTable) table!: MatTable<PeerInfo>;
  @ViewChild(MatSort) sort!: MatSort;

  appConfig: AppConfig;
  decimals = 2;
  displayedColumns: string[] = [];
  tableDataSource = new MatTableDataSource<PeerInfo>([]);

  // Sync
  private apiEndpoint = environment.baseUrl + environment.apiUrl;
  syncTimer?: number;
  requestId = 0;
  peerInfos: PeerInfo[] = [];

  constructor(
    private appConfigService: AppConfigService,
    private http: HttpClient,
  ) {
    this.appConfig = this.appConfigService.loadConfig();
    this.decimals = this.appConfig.decimals;
    this.displayedColumns = this.appConfig.displayedPeerColumns;
  }

  ngOnInit(): void {
    if (this.torrentHash) {
      this.getPeerInfo();

      this.syncLoop();
    }
  }

  ngAfterViewInit(): void {
    this.tableDataSource.sort = this.sort;
  }

  ngOnDestroy(): void {
    clearInterval(this.syncTimer);
  }

  updateTable(): void {
    this.tableDataSource.data = this.peerInfos;
    this.table.renderRows();
  }

  syncLoop(): void {
    this.syncTimer = setInterval(() => {

      this.getPeerInfo();

    }, this.appConfig?.syncInterval || 1000);
  }

  getPeerInfo(): void {
    const params = new HttpParams()
      .set('rid', this.requestId.toString())
      .set('hash', this.torrentHash);

    this.http
      .get<PeerInfoResponse>(this.apiEndpoint + 'sync/torrentPeers', {params})
      .subscribe(
        value => {
          console.log(value);

          this.requestId = value.rid;

          // Update Peers
          this.updatePeers(value.peers);
          this.removePeers(value.peers_removed);
        },
        error => {
          console.error('Error while getting peers!');
          clearInterval(this.syncTimer);
        }
      );
  }

  updatePeers(peers?: { [key: string]: any }): void {
    // Check if parameter is set
    if (peers) {
      // Get peers that need updating
      const ips = Object.keys(peers);

      // Run through peers and update
      ips.forEach(ip => {
        // Get Peer that needs updating
        const peerInfo = this.peerInfos.find(value => value.ip + ':' + value.port === ip);
        // Get Object which contains new data
        const updateData = peers[ip];

        // Check if peer exists
        if (peerInfo) {
          // Update every key
          Object.keys(updateData).forEach((key: string) => {
            peerInfo[key] = updateData[key];
          });
        } else {
          const newPeer = new PeerInfo();

          // Update every key
          Object.keys(updateData).forEach((key: string) => {
            newPeer[key] = updateData[key];
          });

          this.peerInfos.push(newPeer);
        }
      });

      this.updateTable();
    }
  }

  removePeers(peers?: string[]): void {
    // Check if parameter is set
    if (peers) {
      this.peerInfos = this.peerInfos.filter(value => !peers.includes(value.ip + ':' + value.port));
      this.updateTable();
    }
  }
}
