import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {computed, inject, Injectable, Signal, signal, WritableSignal} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ResponsiveService {
  private responsive = inject(BreakpointObserver);

  private isMobileWS: WritableSignal<boolean> = signal(false);
  private isTabletWS: WritableSignal<boolean> = signal(false);
  private isDesktopWS: WritableSignal<boolean> = signal(false);

  isMobile: Signal<boolean> = computed(() => this.isMobileWS());
  isTablet: Signal<boolean> = computed(() => this.isTabletWS()); ;
  isDesktop: Signal<boolean> = computed(() => this.isDesktopWS()); ;

  constructor() {
    this.responsive.observe([
      Breakpoints.XSmall,
      Breakpoints.Small,
      Breakpoints.Medium,
      Breakpoints.Large,
      Breakpoints.XLarge,
    ])
      .subscribe((result) => {
        const breakpoints = result.breakpoints;

        this.isMobileWS.set(false);
        this.isTabletWS.set(false);
        this.isDesktopWS.set(false);

        if (breakpoints[Breakpoints.XSmall]) {
          if (result.matches) {
            this.isMobileWS.set(true);
          }
        }

        if (breakpoints[Breakpoints.Small]) {
          if (result.matches) {
            this.isTabletWS.set(true);
          }
        }

        const isDesktop = breakpoints[Breakpoints.Medium] ||
          breakpoints[Breakpoints.Large] ||
          breakpoints[Breakpoints.XLarge];

        if (isDesktop) {
          if (result.matches) {
            this.isDesktopWS.set(true);
          }
        }
      });
  }
}
