import {inject, Injectable} from '@angular/core';

import {ThemeManagerService} from './theme-manager.service';

@Injectable({
  providedIn: 'root',
})
export class CoreService {
  private readonly themeService = inject(ThemeManagerService);

  initCoreServices(): void {
    this.initThemeService();
  }

  private initThemeService(): void {
    this.themeService.init();
  }
}
