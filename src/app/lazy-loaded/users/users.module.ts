import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';

import { UsersComponent } from './users.component';
import { UsersListComponent } from './users-list/users-list.component';
import { UsersRoutingModule } from './users-routing.module';

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
