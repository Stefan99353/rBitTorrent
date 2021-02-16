import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {AppConfigService} from '../../../services/app-config/app-config.service';
import {AppConfig} from '../../../config/app-config';
import {TorrentGenericProperties} from '../../../models/torrent-generic-properties';
import {TorrentManagementService} from '../../../services/torrent-management/torrent-management.service';

@Component({
  selector: 'app-torrent-details',
  templateUrl: './torrent-details.component.html',
  styleUrls: ['./torrent-details.component.scss']
})
export class TorrentDetailsComponent implements OnInit {

  @Input() torrentHash!: string;

  constructor() {
  }

  ngOnInit(): void {

  }
}
