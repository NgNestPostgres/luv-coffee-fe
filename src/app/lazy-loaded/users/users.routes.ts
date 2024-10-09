import { Routes } from '@angular/router';

import { UsersComponent } from './users.component';
import { UsersListComponent } from './users-list/users-list.component';

export const USERS_ROUTES: Routes = [
  {
    path: '',
    component: UsersComponent,
    children: [
      {
        path: '',
        component: UsersListComponent
      },
    ]
  }
];
