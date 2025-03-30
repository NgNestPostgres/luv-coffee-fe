import {MenuItemNode} from './sidenav-tree.enum';

export const TREE_DATA: MenuItemNode[] = [
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
    children: [
      {name: 'Phone Form Field', path: ['lib-dev', 'phone-form-field']},
    ],
  },
];
