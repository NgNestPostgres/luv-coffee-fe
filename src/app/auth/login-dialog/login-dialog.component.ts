import {
  ChangeDetectionStrategy, Component, inject, OnInit,
} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {AuthService} from '@auth/services/auth.service';
import {UserLogin} from '@ngnestpostgres/fe-shared';
// import { UserRole } from '@ngnestpostgres/fe-shared';

@Component({
  selector: 'anp-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatButtonModule,
    MatDialogModule,
  ],
})
export class LoginDialogComponent implements OnInit {
  private authService = inject(AuthService);
  private data: unknown = inject(MAT_DIALOG_DATA);
  private dialogRef = inject(MatDialogRef<LoginDialogComponent>);

  ngOnInit(): void {
    console.log('UserRole.Admin');
  }

  public login(creds: UserLogin) {
    this.authService.login(creds).subscribe((token: string) => {
      this.closeDialog(token);
    });
  }

  private closeDialog(outputData?: unknown): void {
    this.dialogRef.close(outputData);
  }
}
