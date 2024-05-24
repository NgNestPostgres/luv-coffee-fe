import { Component, Inject, OnInit } from '@angular/core';
import { MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';
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
    @Inject(MAT_DIALOG_DATA) private data: any,
  ) {}

  ngOnInit(): void {
    console.log('UserRole.Admin');
  }

  public login(creds: UserLogin) {
    this.authService.login(creds).subscribe(token => {
      this.closeDialog(token);
    });
  }

  private closeDialog(outputData?: any): void {
    this.dialogRef.close(outputData);
  }
}
