import {
  ChangeDetectionStrategy,
  Component, inject, Signal,
} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {RouterModule, RouterOutlet} from '@angular/router';
import {ResponsiveService} from '@core/services/responsive.service';

import {SearchBoxComponent} from './navigation/search-box/search-box.component';
import {SidenavTreeComponent} from './navigation/sidenav-tree/sidenav-tree.component';
import {ThemeManagerComponent} from './navigation/theme-manager/theme-manager.component';
import {TopMenuComponent} from './navigation/top-menu/top-menu.component';

@Component({
  selector: 'anp-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatToolbarModule,
    SearchBoxComponent,
    SidenavTreeComponent,
    ThemeManagerComponent,
    TopMenuComponent,
    RouterModule,
    RouterOutlet,
  ],
})
export class AppComponent {
  responsicService = inject(ResponsiveService);

  isMobile: Signal<boolean> = this.responsicService.isMobile;
  isDesktop: Signal<boolean> = this.responsicService.isDesktop;
}
