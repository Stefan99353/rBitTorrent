import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {TorrentManagementService} from '../../../services/torrent-management/torrent-management.service';

export interface DeleteDialogData {
  checkedAllTorrents: boolean;
  selectedTorrentHashes: string[];
}

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss']
})
export class DeleteDialogComponent implements OnInit {

  deleteFiles = false;

  constructor(
    private torrentManagementService: TorrentManagementService,
    private dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DeleteDialogData
  ) {
  }

  ngOnInit(): void {
  }

  close(): void {
    this.dialogRef.close();
  }

  delete(): void {
    this.torrentManagementService.delete(
      this.data.selectedTorrentHashes,
      this.deleteFiles,
      this.data.checkedAllTorrents,
    ).subscribe(value => {
      this.dialogRef.close();
    });
  }

  selectedTorrentCount(): any {
    return {count: this.data.selectedTorrentHashes.length};
  }
}
