import { TestBed } from '@angular/core/testing';
import { Theme, ThemeManagerService } from '@core/services/theme-manager.service';

import { MenuItemNode, SidenavDatasourceService } from './sidenav-datasource.service';

describe('SidenavDatasourceService', () => {
  let service: SidenavDatasourceService;
  let themeManagerServiceSpy: jasmine.SpyObj<ThemeManagerService>;

  beforeEach(() => {
    themeManagerServiceSpy = jasmine.createSpyObj('ThemeManagerService', ['isDark', 'changeTheme']);

    TestBed.configureTestingModule({
      providers: [
        SidenavDatasourceService,
        { provide: ThemeManagerService, useValue: themeManagerServiceSpy },
      ],
    });
    service = TestBed.inject(SidenavDatasourceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('changeTheme', () => {
    it('should trigger theme change to "Light"', () => {
      const node: MenuItemNode = {
        name: 'Light',
        isHidden: false,
        value: Theme.Light,
      };
      service.changeTheme(node);

      expect(themeManagerServiceSpy.changeTheme).toHaveBeenCalledWith(Theme.Light);
    });
  });
});
