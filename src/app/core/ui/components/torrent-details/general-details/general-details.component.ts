import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {AppConfig} from '../../../../config/app-config';
import {TorrentGenericProperties} from '../../../../models/torrent-generic-properties';
import {AppConfigService} from '../../../../services/app-config/app-config.service';
import {TorrentManagementService} from '../../../../services/torrent-management/torrent-management.service';

@Component({
  selector: 'app-general-details',
  templateUrl: './general-details.component.html',
  styleUrls: ['./general-details.component.scss']
})
export class GeneralDetailsComponent implements OnInit, OnDestroy {

  @Input() torrentHash!: string;

  private timer?: number;
  appConfig: AppConfig;
  torrentProperties: TorrentGenericProperties = new TorrentGenericProperties();

  constructor(
    private appConfigService: AppConfigService,
    private torrentManagementService: TorrentManagementService
  ) {
    this.appConfig = this.appConfigService.loadConfig();
  }

  ngOnInit(): void {
    if (this.torrentHash) {
      this.getProperties();

      this.timer = setInterval(() => {
        this.getProperties();
      }, this.appConfig.propertiesSyncInterval);
    }
  }

  getProperties(): void {
    this.torrentManagementService
      .properties(this.torrentHash)
      .subscribe(
        value => {
          this.torrentProperties = value;
        },
        error => {
          console.error('Error while getting generic torrent info!');
          clearInterval(this.timer);
        });
  }

  ngOnDestroy(): void {
    clearInterval(this.timer);
  }
}
