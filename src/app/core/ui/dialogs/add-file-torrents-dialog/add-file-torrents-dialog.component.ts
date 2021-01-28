/* tslint:disable:no-unused-expression */
import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {NgForm} from '@angular/forms';
import {TorrentManagementService} from '../../../services/torrent-management/torrent-management.service';

@Component({
  selector: 'app-add-url-torrents-dialog',
  templateUrl: './add-file-torrents-dialog.component.html',
  styleUrls: ['./add-file-torrents-dialog.component.scss']
})
export class AddFileTorrentsDialogComponent implements OnInit {

  @ViewChild('fileInput') fileInput!: ElementRef;
  files: File[] = [];

  constructor(
    private dialogRef: MatDialogRef<AddFileTorrentsDialogComponent>,
    private torrentManagementService: TorrentManagementService
  ) {
  }

  ngOnInit(): void {
  }

  close(): void {
    this.dialogRef.close();
  }

  add(fileForm: NgForm): void {
    if (fileForm.valid) {

      const data = new FormData();

      // File
      this.files.forEach(file => {
        data.append('torrents', file);
      });

      fileForm.value.autoTmm ? data.set('autoTmm', fileForm.value.autoTmm) : null;
      fileForm.value.savepath ? data.set('savepath', fileForm.value.savepath) : null;
      fileForm.value.rename ? data.set('rename', fileForm.value.rename) : null;
      fileForm.value.category ? data.set('category', fileForm.value.category) : null;
      fileForm.value.paused ? data.set('paused', fileForm.value.paused) : null;
      fileForm.value.skip_checking ? data.set('skip_checking', fileForm.value.skip_checking) : null;
      fileForm.value.root_folder ? data.set('root_folder', fileForm.value.root_folder) : null;
      fileForm.value.sequentialDownload ? data.set('sequentialDownload', fileForm.value.sequentialDownload) : null;
      fileForm.value.firstLastPiecePrio ? data.set('firstLastPiecePrio', fileForm.value.firstLastPiecePrio) : null;
      fileForm.value.dlLimit ? data.set('dlLimit', fileForm.value.dlLimit) : null;
      fileForm.value.upLimit ? data.set('upLimit', fileForm.value.upLimit) : null;

      this.torrentManagementService.add(data).subscribe(_ => {
        this.close();
      });
    }
  }

  openFileChooser(): void {
    const input = this.fileInput.nativeElement;
    input.onchange = () => {
      // tslint:disable-next-line:prefer-for-of
      for (const file of input.files) {
        this.files.push(file);
      }
    };

    input.click();
  }
}
