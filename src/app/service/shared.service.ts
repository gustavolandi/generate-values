import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Clipboard } from '@angular/cdk/clipboard';

@Injectable({
    providedIn: 'root'
  })
export class SharedService {

    constructor(private clipboard: Clipboard,
        private _snackBar: MatSnackBar){
    }

    public copyValue(valueToCopy : string, showSnackBar : boolean = true, messageSnackBar : string = 'Copiado!', timeSnackBar : number = 750) {
        this.clipboard.copy(valueToCopy);
        if (showSnackBar) {
            this._snackBar.open(messageSnackBar,'',{
                duration: timeSnackBar
              });
        }
    }

    public validateDigitsEquals(valueToValidate: string) : boolean {
        return valueToValidate.split('').every(char => char === valueToValidate[0]);
    }

    public showSnackBar(messageSnackBar : string, timeSnackBar : number = 750) {
        this._snackBar.open(messageSnackBar,'',{
            duration: timeSnackBar
          });
    }
}