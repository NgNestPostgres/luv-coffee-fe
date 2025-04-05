import {ChangeDetectionStrategy, Component, inject, output, Signal} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {RouterModule} from '@angular/router';
import {ResponsiveService} from '@core/services/responsive.service';

import {AccountMenuComponent} from '../account-menu/account-menu.component';
import {SearchBoxComponent} from '../search-box/search-box.component';
import {ThemeManagerComponent} from '../theme-manager/theme-manager.component';
import {TopMenuComponent} from '../top-menu/top-menu.component';

@Component({
  selector: 'anp-main-toolbar',
  templateUrl: './main-toolbar.component.html',
  styleUrl: './main-toolbar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatButtonModule,
    MatIconModule,
    AccountMenuComponent,
    SearchBoxComponent,
    ThemeManagerComponent,
    TopMenuComponent,
    RouterModule,
  ],
})
export class MainToolbarComponent {
  sidenavToggled = output<void>();

  responsicService = inject(ResponsiveService);

  isMobile: Signal<boolean> = this.responsicService.isMobile;
  isDesktop: Signal<boolean> = this.responsicService.isDesktop;

  toggleSidenav(): void {
    this.sidenavToggled.emit();
  }
}
