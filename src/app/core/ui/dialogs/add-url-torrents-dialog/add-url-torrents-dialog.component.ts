/* tslint:disable:no-unused-expression */
import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {NgForm} from '@angular/forms';
import {TorrentManagementService} from '../../../services/torrent-management/torrent-management.service';

@Component({
  selector: 'app-add-url-torrents-dialog',
  templateUrl: './add-url-torrents-dialog.component.html',
  styleUrls: ['./add-url-torrents-dialog.component.scss']
})
export class AddUrlTorrentsDialogComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<AddUrlTorrentsDialogComponent>,
    private torrentManagementService: TorrentManagementService
    ) {
  }

  ngOnInit(): void {
  }

  close(): void {
    this.dialogRef.close();
  }

  add(urlForm: NgForm): void {
    if (urlForm.valid) {
      const data = new FormData();
      data.set('urls', urlForm.value.urls);
      urlForm.value.autoTmm ? data.set('autoTmm', urlForm.value.autoTmm) : null;
      urlForm.value.savepath ? data.set('savepath', urlForm.value.savepath) : null;
      urlForm.value.cookie ? data.set('cookie', urlForm.value.cookie) : null;
      urlForm.value.rename ? data.set('rename', urlForm.value.rename) : null;
      urlForm.value.category ? data.set('category', urlForm.value.category) : null;
      urlForm.value.paused ? data.set('paused', urlForm.value.paused) : null;
      urlForm.value.skip_checking ? data.set('skip_checking', urlForm.value.skip_checking) : null;
      urlForm.value.root_folder ? data.set('root_folder', urlForm.value.root_folder) : null;
      urlForm.value.sequentialDownload ? data.set('sequentialDownload', urlForm.value.sequentialDownload) : null;
      urlForm.value.firstLastPiecePrio ? data.set('firstLastPiecePrio', urlForm.value.firstLastPiecePrio) : null;
      urlForm.value.dlLimit ? data.set('dlLimit', urlForm.value.dlLimit) : null;
      urlForm.value.upLimit ? data.set('upLimit', urlForm.value.upLimit) : null;

      this.torrentManagementService.add(data).subscribe(_ => {
        this.close();
      });
    }
  }
}
