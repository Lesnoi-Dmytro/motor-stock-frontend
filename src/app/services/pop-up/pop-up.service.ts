import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class PopUpService {
  private snackBar = inject(MatSnackBar);

  public openErrorPopUp(message: string, action = 'Ok') {
    this.openPopUp(message, action, 'error_snackbar');
  }

  public openSuccessPopUp(message: string, action = 'Ok') {
    this.openPopUp(message, action, 'success_snackbar');
  }

  private openPopUp(message: string, action = 'Ok', panelClass?: string) {
    this.snackBar.open(message, action, {
      duration: 300000,
      panelClass: panelClass ? [panelClass] : [],
    });
  }
}
