import { NgModule } from '@angular/core';

import { SharedModule } from '@shared/shared.module';
import { UsersRoutingModule } from './users-routing.module';

import { UsersComponent } from './users.component';
import { UsersListComponent } from './users-list/users-list.component';


@NgModule({
  declarations: [
    UsersComponent,
    UsersListComponent
  ],
  imports: [
    SharedModule,
    UsersRoutingModule,
  ]
})
export class UsersModule { }
