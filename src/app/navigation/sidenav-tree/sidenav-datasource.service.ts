import { inject, Injectable, Signal, signal } from '@angular/core';
import { Theme, ThemeManagerService } from '@core/services/theme-manager.service';

export interface MenuItemNode {
  name: string;
  isHidden: boolean;
  value?: string;
  icon?: string,
  path?: string[];
  children?: MenuItemNode[];
}

@Injectable()
export class SidenavDatasourceService {
  private readonly themeManager = inject(ThemeManagerService);

  treeData: Signal<MenuItemNode[]> = signal([
    { name: 'Coffees', isHidden: true, path: ['coffees'] },
    { name: 'Users', isHidden: false, path: ['users'] },
    {
      name: 'Menu',
      isHidden: false,
      children: [
        { name: 'Coffees', isHidden: false, path: ['coffees'] },
        { name: 'Users', isHidden: false, path: ['users'] },
      ],
    },
    {
      name: 'Lib Dev',
      isHidden: false,
      icon: 'local_library',
      children: [
        { name: 'Phone Form Field', isHidden: false, path: ['lib-dev', 'phone-form-field'] },
      ],
    },
    {
      name: 'Account',
      isHidden: false,
      icon: 'account_circle',
      children: [
        {
          name: 'Profile',
          isHidden: false,
          icon: 'person',
          path: ['profile'],
        },
        {
          name: 'Theme',
          isHidden: false,
          icon: this.themeManager.isDark() ? 'dark_mode' : 'light_mode',
          children: [
            {
              name: 'System',
              isHidden: false,
              value: Theme.Auto,
              icon: 'dns',
            },
            {
              name: 'Light',
              isHidden: false,
              value: Theme.Light,
              icon: 'light_mode',
            },
            {
              name: 'Dark',
              isHidden: false,
              value: Theme.Dark,
              icon: 'dark_mode',
            },
          ],
        },
        {
          name: 'Login',
          isHidden: false,
          icon: 'login',
        },
      ],
    },
  ]);

  changeTheme(node: MenuItemNode): void {
    this.themeManager.changeTheme(node.value as Theme);
  }
}
