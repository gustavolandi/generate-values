import { Component, OnInit } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { Clipboard } from "@angular/cdk/clipboard"
import { MatSnackBar } from '@angular/material/snack-bar';
import { ExportExcel } from 'src/app/service/export-excel.service';
import { ExportExcelModel } from 'src/app/service/model/ExportExcelModel';
import { FileParams } from 'src/app/service/model/FileParams';

@Component({
  selector: 'uuid-generator-home',
  templateUrl: './uuid-generator-home.component.html',
  styleUrls: ['./uuid-generator-home.component.css']
})
export class UUIDGeneratorHome implements OnInit {

    uuid = '';

    constructor(private clipboard: Clipboard,
        private _snackBar: MatSnackBar,
        private exportExcel: ExportExcel){
    }

    ngOnInit(){
        this.generateNewUuid();
    }

    copyValue(){
        this.clipboard.copy(this.uuid);
        this._snackBar.open('Copied!','',{
            duration: 500
          });
    }

    generateNewUuid(){
        this.uuid = uuidv4();
    }

    exportUuid(fileParams: FileParams){
        const exportUuid : ExportExcelModel[] = [];
        for (let i=0;i<fileParams.exportItens;i++) {
            exportUuid.push({
                firstColumn : uuidv4()
            });
        }
        fileParams.fileName = 'UUID-generate';
        fileParams.worksheetName = 'UUID';
        fileParams.firstColumnSize = 37;
        this.exportExcel.exportFile(exportUuid,fileParams);
    }

  
}