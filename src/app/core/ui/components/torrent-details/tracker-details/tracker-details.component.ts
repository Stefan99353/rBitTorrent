import {AfterViewInit, Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {AppConfig} from '../../../../config/app-config';
import {TrackerInfo} from '../../../../models/tracker-info';
import {AppConfigService} from '../../../../services/app-config/app-config.service';
import {TorrentManagementService} from '../../../../services/torrent-management/torrent-management.service';
import {MatTable, MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';

@Component({
  selector: 'app-tracker-details',
  templateUrl: './tracker-details.component.html',
  styleUrls: ['./tracker-details.component.scss']
})
export class TrackerDetailsComponent implements OnInit, OnDestroy, AfterViewInit {

  @Input() torrentHash!: string;

  @ViewChild(MatTable) table!: MatTable<TrackerInfo>;
  @ViewChild(MatSort) sort!: MatSort;

  private timer?: number;
  appConfig: AppConfig;
  decimals = 2;
  displayedColumns: string[] = [];
  tableDataSource = new MatTableDataSource<TrackerInfo>([]);

  constructor(
    private appConfigService: AppConfigService,
    private torrentManagementService: TorrentManagementService
  ) {
    this.appConfig = this.appConfigService.loadConfig();
    this.decimals = this.appConfig.decimals;
    this.displayedColumns = this.appConfig.displayedTrackerColumns;
  }

  ngOnInit(): void {
    if (this.torrentHash) {
      this.getTrackers();

      this.timer = setInterval(() => {
        this.getTrackers();
      }, this.appConfig.propertiesSyncInterval);
    }
  }

  ngAfterViewInit(): void {
    this.tableDataSource.sort = this.sort;
  }

  getTrackers(): void {
    this.torrentManagementService
      .trackers(this.torrentHash)
      .subscribe(
        value => {
          this.tableDataSource.data = value;
          this.table.renderRows();
        },
        error => {
          console.error('Error while getting trackers!');
          clearInterval(this.timer);
        });
  }

  ngOnDestroy(): void {
    clearInterval(this.timer);
  }
}
