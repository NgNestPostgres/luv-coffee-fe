import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  selector: 'anp-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
})
export class UsersListComponent {

}
