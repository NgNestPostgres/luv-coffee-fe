import { Component, inject } from '@angular/core';
import { ThemeManagerService } from '@core/services/theme-manager.service';

@Component({
  selector: 'anp-theme-manager',
  templateUrl: './theme-manager.component.html',
  styleUrls: ['./theme-manager.component.scss']
})
export class ThemeManagerComponent {
  private themeManager = inject(ThemeManagerService);
  public isDark$ = this.themeManager.isDark$;

  constructor() { }

  public changeTheme(theme: string) {
    this.themeManager.changeTheme(theme);
  }
}
