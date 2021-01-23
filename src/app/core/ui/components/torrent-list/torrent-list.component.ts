import {AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {TorrentInfo} from '../../../models/torrent-info';
import {AppConfigService} from '../../../services/app-config/app-config.service';
import {faMagnet, faCircle, faCheckCircle} from '@fortawesome/free-solid-svg-icons';
import {MatTable, MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MainDaemonService} from '../../../services/main-daemon.service';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-torrent-list',
  templateUrl: './torrent-list.component.html',
  styleUrls: ['./torrent-list.component.scss']
})
export class TorrentListComponent implements OnInit, OnDestroy, AfterViewInit {
  private destroyNotifier = new Subject<void>();

  @Input() selectedTorrents: string[] = [];
  @Output() selectedTorrentsChange = new EventEmitter<string[]>();

  @Input() checkedAllTorrents = false;
  @Output() checkedAllTorrentsChange = new EventEmitter<boolean>();

  displayedColumns: string[] = ['name'];
  decimals = 2;
  pageSizes: number[] = [5, 10, 25, 50, 100];
  tableDataSource = new MatTableDataSource<TorrentInfo>([]);

  @ViewChild(MatTable) table!: MatTable<TorrentInfo>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  // Icons
  faCircle = faCircle;
  faCheckedCircle = faCheckCircle;
  faMagnet = faMagnet;

  constructor(private appConfigService: AppConfigService, private mainDaemonService: MainDaemonService) {
  }

  ngOnInit(): void {
    const appConfig = this.appConfigService.loadConfig();
    this.displayedColumns = appConfig.displayedColumns;
    this.displayedColumns.unshift('select');
    this.decimals = appConfig.decimals;
    this.pageSizes = appConfig.pageSizes;

    this.mainDaemonService.torrentInfoObservable()
      .pipe(takeUntil(this.destroyNotifier))
      .subscribe(value => {
        this.tableDataSource.data = value;
        this.table.renderRows();
      });
  }

  ngAfterViewInit(): void {
    this.tableDataSource.paginator = this.paginator;
    this.tableDataSource.sort = this.sort;
  }

  ngOnDestroy(): void {
    this.destroyNotifier.next();
  }

  copyToClipboard(value: any): void {
    const element = document.createElement('textarea');
    element.value = value;
    document.body.appendChild(element);
    element.select();
    document.execCommand('copy');
    document.body.removeChild(element);
  }

  someTorrentsChecked(): boolean {
    return this.selectedTorrents.length > 0 && !this.checkedAllTorrents;
  }

  toggleAllTorrentsChecked(checked: boolean): void {
    this.checkedAllTorrents = checked;
    if (checked) {
      // Add all hashes to selected
      this.selectedTorrents = this.tableDataSource.data.map(value => value.hash);
    } else {
      this.selectedTorrents = [];
    }

    this.selectedTorrentsChange.emit(this.selectedTorrents);
    this.checkedAllTorrentsChange.emit(this.checkedAllTorrents);
  }

  toggleTorrentChecked(hash: string): void {
    if (this.isTorrentChecked(hash)) {
      this.selectedTorrents = this.selectedTorrents.filter(value => value !== hash);
    } else {
      this.selectedTorrents.push(hash);
    }

    this.selectedTorrentsChange.emit(this.selectedTorrents);
  }

  isTorrentChecked(hash: string): boolean {
    return !!this.selectedTorrents.find(value => value === hash);
  }
}
