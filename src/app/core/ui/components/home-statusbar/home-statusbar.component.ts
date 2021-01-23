import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {MainDaemonService} from '../../../services/main-daemon.service';
import {takeUntil} from 'rxjs/operators';
import {GlobalTransferInfo} from '../../../models/global-transfer-info';
import {AppConfigService} from '../../../services/app-config/app-config.service';
import {TransferInfoService} from '../../../services/transfer-info/transfer-info.service';
import {MatDialog} from '@angular/material/dialog';
import {GlobalLimitsDialogComponent, GlobalLimitsDialogData} from '../../dialogs/global-limits-dialog/global-limits-dialog.component';

@Component({
  selector: 'app-home-statusbar',
  templateUrl: './home-statusbar.component.html',
  styleUrls: ['./home-statusbar.component.scss']
})
export class HomeStatusbarComponent implements OnInit, OnDestroy {
  private destroyNotifier = new Subject<void>();

  serverState: GlobalTransferInfo = new GlobalTransferInfo();

  decimals = 2;

  constructor(
    private appConfigService: AppConfigService,
    private mainDaemonService: MainDaemonService,
    private transferInfoService: TransferInfoService,
    private dialog: MatDialog,
  ) {
    const appConfig = this.appConfigService.loadConfig();
    this.decimals = appConfig.decimals;
  }

  ngOnInit(): void {
    this.mainDaemonService.serverStateObservable()
      .pipe(takeUntil(this.destroyNotifier))
      .subscribe(value => {
        this.serverState = value;
      });
  }

  ngOnDestroy(): void {
    this.destroyNotifier.next();
  }

  toggleAlternateSpeedLimit(): void {
    this.transferInfoService.toggleSpeedLimitsMode().subscribe();
  }

  setDlLimit(): void {
    const data: GlobalLimitsDialogData = {
      download: true,
      currentLimit: this.serverState.dl_rate_limit,
    };

    this.dialog.open(GlobalLimitsDialogComponent, {
      width: '400px',
      data,
    });
  }

  setUpLimit(): void {
    const data: GlobalLimitsDialogData = {
      download: false,
      currentLimit: this.serverState.up_rate_limit,
    };

    this.dialog.open(GlobalLimitsDialogComponent, {
      width: '400px',
      data,
    });
  }
}
