import {
  ChangeDetectionStrategy,
  Component, inject, Signal,
  ViewChild,
} from '@angular/core';
import {MatSidenav, MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {RouterModule, RouterOutlet} from '@angular/router';
import {ResponsiveService} from '@core/services/responsive.service';

import {MainToolbarComponent} from './navigation/main-toolbar/main-toolbar.component';
import {SidenavTreeComponent} from './navigation/sidenav-tree/sidenav-tree.component';

@Component({
  selector: 'anp-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MainToolbarComponent,
    MatSidenavModule,
    MatToolbarModule,
    SidenavTreeComponent,
    RouterModule,
    RouterOutlet,
  ],
})
export class AppComponent {
  @ViewChild('sidenav') private sidenav!: MatSidenav;

  responsicService = inject(ResponsiveService);

  isMobile: Signal<boolean> = this.responsicService.isMobile;
  isDesktop: Signal<boolean> = this.responsicService.isDesktop;

  toggleSidnav(): void {
    this.sidenav.toggle();
  }
}
