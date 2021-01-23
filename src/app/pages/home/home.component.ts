import {Component, OnInit} from '@angular/core';
import {TorrentManagementService} from '../../core/services/torrent-management/torrent-management.service';
import {MatDialog} from '@angular/material/dialog';
import {DeleteDialogComponent, DeleteDialogData} from '../../core/ui/dialogs/delete-dialog/delete-dialog.component';
import {MainDaemonService} from '../../core/services/main-daemon.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  checkedAllTorrents = false;
  selectedTorrentHashes: string[] = [];

  constructor(
    private _: MainDaemonService,
    private torrentManagementService: TorrentManagementService,
    private dialog: MatDialog) {
  }

  ngOnInit(): void {
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
