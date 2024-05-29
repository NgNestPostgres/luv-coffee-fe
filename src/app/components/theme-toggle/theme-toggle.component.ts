import { Component, inject } from '@angular/core';
import { ThemeManagerService } from '@core/services/theme-manager.service';

enum ThemeNames {
  Auto = 'auto',
  Dark = 'dark',
  Light = 'light',
}

@Component({
  selector: 'anp-theme-toggle',
  templateUrl: './theme-toggle.component.html',
  styleUrls: ['./theme-toggle.component.scss']
})
export class ThemeToggleComponent {
  private themeManager = inject(ThemeManagerService);
  public isDark$ = this.themeManager.isDark$;

  constructor() { }

  public changeTheme(theme: string) {
    this.themeManager.changeTheme(theme);
  }
}
