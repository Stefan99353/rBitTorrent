import {Component, OnDestroy, OnInit} from '@angular/core';
import {AppConfigService} from '../../core/services/app-config/app-config.service';
import {ALL_COLUMNS, AppConfig} from '../../core/config/app-config';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit, OnDestroy {
  private destroyNotifier = new Subject<void>();

  appConfig!: AppConfig;
  configChanged = false;

  syncIntervalMin = 100;
  syncIntervalMax = 60000;

  decimalsMin = 0;
  decimalsMax = 5;

  allColumns: any[] = [];

  constructor(private configService: AppConfigService) {
  }

  ngOnInit(): void {
    this.appConfig = this.configService.loadConfig();
    this.buildAllColumnsList();

    this.configService.configSubjectAsObservable()
      .pipe(takeUntil(this.destroyNotifier))
      .subscribe(value => {
        this.appConfig = value;
        this.buildAllColumnsList();
      });
  }

  ngOnDestroy(): void {
    this.destroyNotifier.next();
  }

  save(): void {
    this.configService.saveConfig(this.appConfig);
    this.configChanged = false;
  }

  changed(): void {
    this.checkMinMax('syncInterval', this.syncIntervalMin, this.syncIntervalMax, 1000);
    this.checkMinMax('decimals', this.decimalsMin, this.decimalsMax, 2);

    this.configChanged = true;
  }

  checkMinMax(property: string, min: number, max: number, def: number): void {
    if (this.appConfig[property] == null) {
      this.appConfig[property] = def;
    }

    if (this.appConfig[property] < min) {
      this.appConfig[property] = min;
    }

    if (this.appConfig[property] > max) {
      this.appConfig[property] = max;
    }
  }

  buildAllColumnsList(): void {
    this.allColumns = ALL_COLUMNS.map(value => {
      return {
        name: value,
        show: this.appConfig.displayedColumns.includes(value)
      };
    });
  }

  buildColumns(): void {
    this.appConfig.displayedColumns = this.allColumns
      .filter(value => value.show)
      .map(value => value.name);

    this.configChanged = true;
  }
}
