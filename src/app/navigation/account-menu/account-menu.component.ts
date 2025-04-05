import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {RouterModule} from '@angular/router';
import {DialogsService} from '@core/services/dialogs.service';

@Component({
  selector: 'anp-profile-menu',

  templateUrl: './account-menu.component.html',
  styleUrl: './account-menu.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    RouterModule,
  ],
})
export class AccountMenuComponent {
  private dialogs = inject(DialogsService);

  token: string = 'no token';

  public showLoginForm(inputData = 'inpuData'): void {
    this.dialogs.login(inputData).subscribe((token: string) => {
      console.log('dialog closed');
      this.token = token;
    });
  }
}
