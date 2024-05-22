import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogConfig } from '@angular/material/dialog/dialog-config';
import { Observable } from 'rxjs';

import { LoginDialogComponent } from '@auth/login-dialog/login-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogsService {

  private readonly defaultDialogConfig: MatDialogConfig = {
    panelClass: 'ta-dialog',
    disableClose: true,
    minWidth: '320px',
    width: '320px',
  };

  constructor(private dialog: MatDialog) { }

  public login(inputData?: any): Observable<any> {
    return this.dialog.open(LoginDialogComponent, {
      data: inputData,
      ...this.defaultDialogConfig,
    })
    .afterClosed();
  }
}
