import { Component } from '@angular/core';
import { DialogsService } from '@core/services/dialogs.service';

@Component({
  selector: 'anp-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent {

  public token: string = 'no token';

  constructor(
    private dialogs: DialogsService
  ) {}

  public showLoginForm(): void {
    this.dialogs.login().subscribe(token => {
      this.token = token;
      console.log(token);
    });
  }
}
