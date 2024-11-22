import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

import { ThemeManagerService } from './service/theme-manager.service';

@Component({
  selector: 'anp-theme-manager',
  templateUrl: './theme-manager.component.html',
  styleUrls: ['./theme-manager.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AsyncPipe, MatButtonModule, MatIconModule, MatMenuModule],
})
export class ThemeManagerComponent {
  private themeManager = inject(ThemeManagerService);
  public isDark$ = this.themeManager.isDark$;

  public changeTheme(theme: string) {
    this.themeManager.changeTheme(theme);
  }
}
