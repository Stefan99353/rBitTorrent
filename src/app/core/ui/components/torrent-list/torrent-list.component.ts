import {AfterViewInit, Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {TorrentInfo} from '../../../models/torrent-info';
import {AppConfigService} from '../../../services/app-config/app-config.service';
import {faMagnet, faCircle, faCheckCircle} from '@fortawesome/free-solid-svg-icons';
import {MatTable, MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MainDaemonService} from '../../../services/main-daemon.service';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {SelectionModel} from '@angular/cdk/collections';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {MatMenuTrigger} from '@angular/material/menu';
import {TorrentManagementService} from '../../../services/torrent-management/torrent-management.service';
import {MatDialog} from '@angular/material/dialog';
import {DeleteDialogComponent} from '../../dialogs/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-torrent-list',
  templateUrl: './torrent-list.component.html',
  styleUrls: ['./torrent-list.component.scss']
})
export class TorrentListComponent implements OnInit, OnDestroy, AfterViewInit {
  private destroyNotifier = new Subject<void>();

  @Output() selectionChanged = new EventEmitter<string[]>();
  @Output() checkedAllChanged = new EventEmitter<boolean>();

  selection = new SelectionModel<TorrentInfo>(true, []);

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

  // Context Menu
  contextMenuPosition = {x: '0px', y: '0px'};
  @ViewChild(MatMenuTrigger) torrentContextMenu!: MatMenuTrigger;

  constructor(
    private appConfigService: AppConfigService,
    private mainDaemonService: MainDaemonService,
    private torrentManagementService: TorrentManagementService,
    private dialog: MatDialog,
  ) {
  }

  ngOnInit(): void {
    const appConfig = this.appConfigService.loadConfig();

    this.appConfigService.configSubjectAsObservable()
      .pipe(takeUntil(this.destroyNotifier))
      .subscribe(value => {
        this.displayedColumns = value.displayedColumns;
        this.decimals = value.decimals;
        this.pageSizes = value.pageSizes;
        this.table.renderRows();
      });

    this.displayedColumns = appConfig.displayedColumns;
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

  masterToggle(): void {
    this.isAllSelected() ?
      this.selection.clear() :
      this.tableDataSource.data.forEach(row => this.selection.select(row));

    this.emitEvents();
  }

  toggle(row: any): void {
    this.selection.toggle(row);

    this.emitEvents();
  }

  drop(event: CdkDragDrop<string[]>): void {
    moveItemInArray(this.displayedColumns, event.previousIndex, event.currentIndex);
    this.appConfigService.setProperty('displayedColumns', this.displayedColumns);
  }

  emitEvents(): void {
    this.checkedAllChanged.emit(this.isAllSelected());

    const hashes = this.selection.selected.map(value => value.hash);
    this.selectionChanged.emit(hashes);
  }

  isAllSelected(): boolean {
    const numSelected = this.selection.selected.length;
    const numRows = this.tableDataSource.data.length;
    return numSelected === numRows;
  }

  // Context Menu
  onContextMenu(event: MouseEvent, item: TorrentInfo): void {
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + 'px';
    this.contextMenuPosition.y = event.clientY + 'px';
    this.torrentContextMenu.menuData = {item};
    this.torrentContextMenu.menu.focusFirstItem('mouse');
    this.torrentContextMenu.openMenu();
  }

  onContextPause(torrent: TorrentInfo): void {
    this.torrentManagementService.pause([torrent.hash]).subscribe();
  }

  onContextResume(torrent: TorrentInfo): void {
    this.torrentManagementService.resume([torrent.hash]).subscribe();
  }

  onContextForceStart(torrent: TorrentInfo): void {
    this.torrentManagementService.setForceStart([torrent.hash], true).subscribe();
  }

  onContextDelete(torrent: TorrentInfo): void {
    this.dialog.open(DeleteDialogComponent, {
      width: '500px',
      data: {checkedAllTorrents: false, selectedTorrentHashes: [torrent.hash]},
    });
  }
}
