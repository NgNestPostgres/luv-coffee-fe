import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';


@Component({
  selector: 'anp-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  @ViewChild('sidenav') private sidenav!: MatSidenav;

  public tabQuery!: MediaQueryList;
  public mobileQuery!: MediaQueryList;

  private _mobileQueryListener = () => this._mobileQueryMatched();
  private _tabQueryListener = () => this._tabQueryMatched();

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private media: MediaMatcher,
  ) {}

  ngOnInit(): void {
    this.mobileQuery = this.media.matchMedia('(max-width: 600px)');
    this.tabQuery = this.media.matchMedia('(max-width: 1025px)');
    this.mobileQuery.addEventListener('change', this._mobileQueryListener);
    this.tabQuery.addEventListener('change', this._tabQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeEventListener('change', this._mobileQueryListener);
    this.mobileQuery.removeEventListener('change', this._tabQueryListener);
  }

  private _mobileQueryMatched(): void {
    this.changeDetectorRef.detectChanges();
  };

  private _tabQueryMatched(): void {
    if (!this.tabQuery.matches) {
      this.sidenav.close();
    }

    this.changeDetectorRef.detectChanges();
  };
}
