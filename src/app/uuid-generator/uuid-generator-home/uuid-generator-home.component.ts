import { Component, OnInit } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { Clipboard } from "@angular/cdk/clipboard"
import { MatSnackBar } from '@angular/material/snack-bar';
import { ExportExcel } from 'src/app/service/export-excel.service';

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
        private _snackBar: MatSnackBar,
        private exportExcel: ExportExcel){

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

    exportUuid(){
        const exportUuid : UuidGenerated[] = [];
        for (let i=0;i<100;i++) {
            exportUuid.push({
                uuid : uuidv4()
            });
        }
        this.exportExcel.generateExcel(exportUuid,'UUID-generate.xlsx');
    }

  
}