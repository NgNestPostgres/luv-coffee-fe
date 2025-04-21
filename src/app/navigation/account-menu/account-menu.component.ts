import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import { LoginData } from '@auth/interfaces/auth-state.enum';
import { DialogsService } from '@core/services/dialogs.service';
import { Theme, ThemeManagerService } from '@core/services/theme-manager.service';

@Component({
  selector: 'anp-account-menu',

  templateUrl: './account-menu.component.html',
  styleUrl: './account-menu.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    RouterModule,
  ],
})
export class AccountMenuComponent {
  private dialogs = inject(DialogsService);
  private themeManager = inject(ThemeManagerService);

  isDark = this.themeManager.isDark;
  token: string = 'no token';
  Theme = Theme;

  changeTheme(theme: string) {
    this.themeManager.changeTheme(theme);
  }

  showLoginForm(loginData?: LoginData): void {
    this.dialogs.login(loginData).subscribe((token: string) => {
      console.log('dialog closed');
      this.token = token;
    });
  }
}
