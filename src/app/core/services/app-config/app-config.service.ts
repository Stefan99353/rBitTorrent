import {Injectable} from '@angular/core';
import {AppConfig} from '../../config/app-config';
import {Observable, Subject} from 'rxjs';

export const APP_SETTINGS_STORAGE_KEY = 'app-settings';

@Injectable({
  providedIn: 'root'
})
export class AppConfigService {

  configSubject = new Subject<AppConfig>();

  constructor() {
  }

  loadConfig(): AppConfig {
    const storageJson = localStorage.getItem(APP_SETTINGS_STORAGE_KEY);
    return storageJson ? JSON.parse(storageJson) : new AppConfig();
  }

  setProperty(property: string, value: any): void {
    const config = this.loadConfig();

    config[property] = value;

    this.saveConfig(config);
  }

  saveConfig(config: AppConfig): void {
    localStorage.setItem(APP_SETTINGS_STORAGE_KEY, JSON.stringify(config));
    this.configSubject.next(config);
  }

  reset(): void {
    localStorage.setItem(APP_SETTINGS_STORAGE_KEY, JSON.stringify(new AppConfig()));
    this.configSubject.next(new AppConfig());
  }

  configSubjectAsObservable(): Observable<AppConfig> {
    return this.configSubject.asObservable();
  }
}
