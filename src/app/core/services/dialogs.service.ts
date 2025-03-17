import {inject, Injectable} from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {LoginDialogComponent} from '@auth/login-dialog/login-dialog.component';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DialogsService {
  private readonly dialog = inject(MatDialog);

  private readonly defaultDialogConfig: MatDialogConfig = {
    panelClass: 'ta-dialog',
    disableClose: false,
    maxWidth: '640px',
    minWidth: '500px',
    width: '90%',
  };

  public login(inputData?: unknown): Observable<string> {
    return this.dialog.open(LoginDialogComponent, {
      data: inputData,
      ...this.defaultDialogConfig,
    })
      .afterClosed();
  }
}
