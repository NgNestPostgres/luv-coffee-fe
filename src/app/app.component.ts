import { MediaMatcher } from '@angular/cdk/layout';
import {
  ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule, RouterOutlet } from '@angular/router';

import { SearchBoxComponent } from './home/search-box/search-box.component';
import { SidenavTreeComponent } from './home/sidenav-tree/sidenav-tree.component';
import { ThemeManagerComponent } from './home/theme-manager/theme-manager.component';
import { TopMenuComponent } from './home/top-menu/top-menu.component';

@Component({
  selector: 'anp-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
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
    RouterOutlet
  ]
})
export class AppComponent implements OnInit, OnDestroy {
  @ViewChild('sidenav') private sidenav!: MatSidenav;

  public tabQuery!: MediaQueryList;
  public mobileQuery!: MediaQueryList;

  private mobileQueryListener = () => this.mobileQueryMatched();
  private tabQueryListener = () => this.tabQueryMatched();

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private media: MediaMatcher,
  ) {}

  ngOnInit(): void {
    this.mobileQuery = this.media.matchMedia('(max-width: 600px)');
    this.tabQuery = this.media.matchMedia('(max-width: 1025px)');
    this.mobileQuery.addEventListener('change', this.mobileQueryListener);
    this.tabQuery.addEventListener('change', this.tabQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeEventListener('change', this.mobileQueryListener);
    this.mobileQuery.removeEventListener('change', this.tabQueryListener);
  }

  private mobileQueryMatched(): void {
    this.changeDetectorRef.detectChanges();
  }

  private tabQueryMatched(): void {
    if (!this.tabQuery.matches) {
      this.sidenav.close();
    }

    this.changeDetectorRef.detectChanges();
  }
}
