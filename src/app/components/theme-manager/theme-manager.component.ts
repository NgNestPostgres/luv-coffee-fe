import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { ThemeManagerService } from '@core/services/theme-manager.service';

@Component({
  standalone: true,
  selector: 'anp-theme-manager',
  imports: [AsyncPipe, MatButtonModule, MatIconModule, MatMenuModule],
  templateUrl: './theme-manager.component.html',
  styleUrls: ['./theme-manager.component.scss']
})
export class ThemeManagerComponent {
  private themeManager = inject(ThemeManagerService);
  public isDark$ = this.themeManager.isDark$;

  public changeTheme(theme: string) {
    this.themeManager.changeTheme(theme);
  }
}
