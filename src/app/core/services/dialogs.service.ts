import { inject, Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { LoginData } from '@auth/interfaces/auth-state.enum';
import { LoginDialogComponent } from '@auth/login-dialog/login-dialog.component';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DialogsService {
  private readonly dialog = inject(MatDialog);

  private readonly defaultDialogConfig: MatDialogConfig = {
    autoFocus: false,
    // panelClass: 'ta-dialog',
    disableClose: true,
    maxHeight: '90vh',
    maxWidth: '600px',
    minWidth: '380px',
    width: '90vw',
  };

  login(inputData?: LoginData): Observable<string> {
    return this.dialog.open<LoginDialogComponent, LoginData>(LoginDialogComponent, {
      data: inputData,
      ...this.defaultDialogConfig,
    })
      .afterClosed();
  }
}
