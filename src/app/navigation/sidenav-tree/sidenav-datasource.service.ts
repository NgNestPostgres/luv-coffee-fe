import {inject, Injectable, Signal, signal} from '@angular/core';
import {Theme, ThemeManagerService} from '@core/services/theme-manager.service';

export interface MenuItemNode {
  name: string;
  value?: string;
  iconName?: string,
  path?: string[];
  children?: MenuItemNode[];
}

@Injectable()
export class SidenavDatasourceService {
  private readonly themeManager = inject(ThemeManagerService);

  treeData: Signal<MenuItemNode[]> = signal([
    {name: 'Coffees', path: ['coffees']},
    {name: 'Users', path: ['users']},
    {
      name: 'Menu',
      children: [
        {name: 'Coffees', path: ['coffees']},
        {name: 'Users', path: ['users']},
      ],
    },
    {
      name: 'Lib Dev',
      icon: 'local_library',
      children: [
        {name: 'Phone Form Field', path: ['lib-dev', 'phone-form-field']},
      ],
    },
    {
      name: 'Account',
      icon: 'account_circle',
      children: [
        {
          name: 'Profile',
          icon: 'person',
          path: ['profile'],
        },
        {
          name: 'Theme',
          icon: this.themeManager.isDark() ? 'dark_mode' : 'light_mode',
          children: [
            {
              name: 'System',
              value: Theme.Auto,
              icon: 'dns',
            },
            {
              name: 'Light',
              value: Theme.Light,
              icon: 'light_mode',
            },
            {
              name: 'Dark',
              value: Theme.Dark,
              icon: 'dark_mode',
            },
          ],
        },
        {
          name: 'Login',
          icon: 'login',
        },
      ],
    },
  ]);

  changeTheme(node: MenuItemNode): void {
    this.themeManager.changeTheme(node.value as Theme);
  }
}
