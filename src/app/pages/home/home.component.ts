import {Component, OnDestroy, OnInit} from '@angular/core';
import {TorrentManagementService} from '../../core/services/torrent-management/torrent-management.service';
import {MatDialog} from '@angular/material/dialog';
import {DeleteDialogComponent, DeleteDialogData} from '../../core/ui/dialogs/delete-dialog/delete-dialog.component';
import {MainDaemonService} from '../../core/services/main-daemon.service';
import {Router} from '@angular/router';
import {AddUrlTorrentsDialogComponent} from '../../core/ui/dialogs/add-url-torrents-dialog/add-url-torrents-dialog.component';
import {AppManagementService} from '../../core/services/app-management/app-management.service';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  checkedAllTorrents = false;
  selectedTorrentHashes: string[] = [];

  constructor(
    private mainDaemonService: MainDaemonService,
    private appManagementService: AppManagementService,
    private torrentManagementService: TorrentManagementService,
    private dialog: MatDialog,
    private router: Router) {
  }

  ngOnInit(): void {
    // Start Sync
    this.mainDaemonService.startSync();

    // Check Version
    this.appManagementService.webapiVersion().subscribe(value => {
      if (!environment.webapiVersions.find(x => x === value.toString())) {
        console.warn('API Version not supported ', value);
        console.log('Supported Versions: ', environment.webapiVersions);
      }
    });
  }

  ngOnDestroy(): void {
    this.mainDaemonService.stopSync();
  }

  resumeTorrents(): void {
    this.torrentManagementService.resume(this.selectedTorrentHashes, this.checkedAllTorrents).subscribe();
  }

  pauseTorrents(): void {
    this.torrentManagementService.pause(this.selectedTorrentHashes, this.checkedAllTorrents).subscribe();
  }

  openDeleteDialog(): void {
    this.dialog.open(DeleteDialogComponent, {
      width: '500px',
      data: {checkedAllTorrents: this.checkedAllTorrents, selectedTorrentHashes: this.selectedTorrentHashes},
    });
  }
}
