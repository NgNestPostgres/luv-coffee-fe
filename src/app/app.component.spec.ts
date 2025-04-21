import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';

import { AppComponent } from './app.component';
import { CoreService } from './core/services/core.service';
import { ResponsiveService } from './core/services/responsive.service';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let coreServiceSpy: jasmine.SpyObj<CoreService>;
  let responsiveServiceSpy: jasmine.SpyObj<ResponsiveService>;

  beforeEach(async () => {
    coreServiceSpy = jasmine.createSpyObj('CoreServise', ['initCoreServices']);
    responsiveServiceSpy = jasmine.createSpyObj('ResponsiveService', ['isMobile', 'isDesktop']);
    responsiveServiceSpy.isMobile.and.returnValue(false);
    responsiveServiceSpy.isDesktop.and.returnValue(true);

    await TestBed.configureTestingModule({
      imports: [
        MatButtonModule,
        NoopAnimationsModule,
        MatSidenavModule,
        MatToolbarModule,
        MatIconModule,
      ],
      providers: [
        provideRouter([]),
        { provide: CoreService, useValue: coreServiceSpy },
        { provide: ResponsiveService, useValue: responsiveServiceSpy },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
    expect(component.isMobile()).toBe(false);
    expect(component.isDesktop()).toBe(true);
  });

  describe('ngOnInit', () => {
    it('should call initCoreServices', () => {
      component.ngOnInit();
      expect(coreServiceSpy.initCoreServices).toHaveBeenCalled();
    });
  });

  describe('toggleSidnav', () => {
    it('should toggle sidenav', fakeAsync(() => {
      component['sidenav'].open();
      tick();
      expect(component['sidenav'].opened).toBe(true);
      component.toggleSidnav();
      tick();
      expect(component['sidenav'].opened).toBe(false);
      component.toggleSidnav();
      tick();
      expect(component['sidenav'].opened).toBe(true);
    }));
  });
});
