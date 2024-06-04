import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from '@auth/services/auth.service';
import { UserLogin } from '@angularnestpostgre/packages/fe-shared';
// import { UserRole } from '@angularnestpostgre/packages/fe-shared';

@Component({
  selector: 'anp-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss']
})
export class LoginDialogComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private dialogRef: MatDialogRef<LoginDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: unknown,
  ) {}

  ngOnInit(): void {
    console.log('UserRole.Admin');
  }

  public login(creds: UserLogin) {
    this.authService.login(creds).subscribe(token => {
      this.closeDialog(token);
    });
  }

  private closeDialog(outputData?: unknown): void {
    this.dialogRef.close(outputData);
  }
}
