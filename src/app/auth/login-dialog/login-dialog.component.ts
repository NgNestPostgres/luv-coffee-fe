// import { UserRole } from '@ngnestpostgres/fe-shared';
import {Breakpoints} from '@angular/cdk/layout';
import {
  ChangeDetectionStrategy, Component, inject, OnInit,
} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {AuthState} from '@auth/interfaces/auth-state.enum';
import {AuthService} from '@auth/services/auth.service';
import {AuthMethod, UserLogin} from '@ngnestpostgres/fe-shared';

@Component({
  selector: 'anp-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatToolbarModule,
  ],
})
export class LoginDialogComponent implements OnInit {
  private authService = inject(AuthService);
  private data: unknown = inject(MAT_DIALOG_DATA);
  private dialogRef = inject(MatDialogRef<LoginDialogComponent>);

  readonly AuthMethod = AuthMethod;
  readonly AuthState = AuthState;

  authMethod: AuthMethod = this.AuthMethod.NotDefined;
  authState: AuthState = AuthState.NotStarted;
  predefinedEmail = '';

  ngOnInit(): void {
    console.log('UserRole.Admin');

    console.log('Web ' + Breakpoints.Web);
    console.log('WebLandscape ' + Breakpoints.WebLandscape);
    console.log('WebPortrait ' + Breakpoints.WebPortrait);

    console.log('Tablet ' + Breakpoints.Tablet);
    console.log('TabletPortrait ' + Breakpoints.TabletPortrait);
    console.log('TabletLandscape ' + Breakpoints.TabletLandscape);

    console.log('Handset ' + Breakpoints.Handset);
    console.log('HandsetLandscape ' + Breakpoints.HandsetLandscape);
    console.log('HandsetPortrait ' + Breakpoints.HandsetPortrait);

    console.log('XSmall ' + Breakpoints.XSmall);
    console.log('Small ' + Breakpoints.Small);
    console.log('Medium ' + Breakpoints.Medium);
    console.log('Large ' + Breakpoints.Large);
    console.log('XLarge ' + Breakpoints.XLarge);
  }

  public closeForm(): void {
    this.closeDialog();
    this.authMethod = AuthMethod.NotDefined;
    this.authState = AuthState.NotStarted;
    this.predefinedEmail = '';
    // this.isRequestSuccessful = false;
    // this.serverMessage$.next(null);
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
