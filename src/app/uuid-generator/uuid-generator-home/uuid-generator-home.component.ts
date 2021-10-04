import { Component, OnInit } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { UUIDGeneratorModule } from '../uuid-generator.module';
import { Clipboard } from "@angular/cdk/clipboard"
import { MatSnackBar } from '@angular/material/snack-bar';

export interface UuidGenerated {

    uuid: string;
}

@Component({
  selector: 'uuid-generator-home',
  templateUrl: './uuid-generator-home.component.html',
  styleUrls: ['./uuid-generator-home.component.css']
})
export class UUIDGeneratorHome implements OnInit {

    uuid = '';

    generatedUuid : UuidGenerated[] = [];
    
    constructor(private clipboard: Clipboard,
        private _snackBar: MatSnackBar){

    }

    ngOnInit(){
        this.generateNewUuid();
    }

    copyValue(){
        this.clipboard.copy(this.uuid);
        this._snackBar.open('Copiado','',{
            duration: 500
          });
    }

    generateNewUuid(){
        this.uuid = uuidv4();
        const uuidGenerated : UuidGenerated = {
            uuid : this.uuid
        };
        this.generatedUuid.push(uuidGenerated);
    }
  
}