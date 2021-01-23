import {Injectable} from '@angular/core';
import {AppConfig} from '../../config/app-config';

export const APP_SETTINGS_STORAGE_KEY = 'app-settings';

@Injectable({
  providedIn: 'root'
})
export class AppConfigService {

  constructor() {
  }

  loadConfig(): AppConfig {
    const storageJson = localStorage.getItem(APP_SETTINGS_STORAGE_KEY);
    return storageJson ? JSON.parse(storageJson) : new AppConfig();
  }

  saveConfig(config: AppConfig): void {
    localStorage.setItem(APP_SETTINGS_STORAGE_KEY, JSON.stringify(config));
  }

  reset(): void {
    localStorage.removeItem(APP_SETTINGS_STORAGE_KEY);
  }
}
