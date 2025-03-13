import {ChangeDetectionStrategy, ChangeDetectorRef, Component, inject} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {DialogsService} from '@core/services/dialogs.service';

@Component({
  selector: 'anp-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatButtonModule],
})
export class UsersListComponent {
  private ref = inject(ChangeDetectorRef);
  public token: string = 'no token';

  constructor(
    private dialogs: DialogsService,
  ) {}

  public showLoginForm(): void {
    this.dialogs.login().subscribe((token: string) => {
      this.token = token;
      this.ref.markForCheck();
    });
  }
}
