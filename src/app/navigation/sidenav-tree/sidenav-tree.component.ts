import {
  animate, state, style, transition, trigger,
} from '@angular/animations';
import {
  ChangeDetectionStrategy, Component, inject, output,
} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatTreeModule} from '@angular/material/tree';
import {RouterModule} from '@angular/router';
import {DialogsService} from '@core/services/dialogs.service';

import {TREE_DATA} from './sidenav-datasource';
import {MenuItemNode} from './sidenav-tree.enum';

@Component({
  selector: 'anp-sidenav-tree',
  templateUrl: './sidenav-tree.component.html',
  styleUrls: ['./sidenav-tree.component.scss'],
  imports: [MatIconModule, MatMenuModule, MatTreeModule, RouterModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('expandNode', [
      transition(':enter', [
        style({'opacity': 0, 'height': 0, 'min-height': 0}),
        animate('150ms', style({'opacity': 1, 'height': '*', 'min-height': '*'})),
      ]),
      transition(':leave', [
        animate('150ms', style({'opacity': 0, 'height': 0, 'min-height': '0px'})),
      ]),
    ]),
    trigger('expandArrow', [
      state('close', style({transform: 'rotate(0)'})),
      state('expand', style({transform: 'rotate(90deg)'})),
      transition('* => *', [animate('150ms cubic-bezier(0.25, 0.8, 0.25, 1)')]),
    ]),
  ],
})
export class SidenavTreeComponent {
  menuItemChosen = output<void>();

  private dialogs = inject(DialogsService);
  token: string = 'no token';

  dataSource = TREE_DATA;
  childrenAccessor = (node: MenuItemNode) => node.children ?? [];
  hasChild = (_: number, node: MenuItemNode) => !!node.children && node.children.length > 0;

  itemChosen(node: MenuItemNode): void {
    if (node.name === 'Login') {
      this.showLoginForm();
    }

    this.menuItemChosen.emit();
  }

  private showLoginForm(inputData = 'inpuData'): void {
    this.dialogs.login(inputData).subscribe((token: string) => {
      console.log('dialog closed');
      this.token = token;
    });
  }
}
