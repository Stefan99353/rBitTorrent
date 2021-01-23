import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {TransferInfoService} from '../../../services/transfer-info/transfer-info.service';
import {BytesPipe} from '../../../pipes/bytes/bytes.pipe';

export interface GlobalLimitsDialogData {
  download: boolean;
  currentLimit: number;
}

@Component({
  selector: 'app-global-limits-dialog',
  templateUrl: './global-limits-dialog.component.html',
  styleUrls: ['./global-limits-dialog.component.scss']
})
export class GlobalLimitsDialogComponent implements OnInit {

  // 0 === Unlimited
  newLimit = 0;

  constructor(
    private dialogRef: MatDialogRef<GlobalLimitsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: GlobalLimitsDialogData,
    private transferInfoService: TransferInfoService,
  ) {
    this.newLimit = data.currentLimit;
  }

  ngOnInit(): void {
  }

  close(): void {
    this.dialogRef.close();
  }

  setLimit(): void {
    let observable;

    if (this.data.download) {
      observable = this.transferInfoService.setDownloadLimit(this.newLimit);
    } else {
      observable = this.transferInfoService.setUploadLimit(this.newLimit);
    }

    observable.subscribe(_ => {
      this.dialogRef.close();
    });
  }

  getTitleTranslation(): string {
    return this.data.download ? 'MODALS.GLOBAL_LIMITS.title_dl' : 'MODALS.GLOBAL_LIMITS.title_ul';
  }
}
