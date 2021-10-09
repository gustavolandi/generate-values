import { Component, OnInit } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { Clipboard } from "@angular/cdk/clipboard"
import { MatSnackBar } from '@angular/material/snack-bar';
import { ExportExcel } from 'src/app/service/export-excel.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ExportExcelModel } from 'src/app/service/model/ExportExcelModel';
import { ExportFilesType } from 'src/app/service/model/ExportFilesType';

@Component({
  selector: 'uuid-generator-home',
  templateUrl: './uuid-generator-home.component.html',
  styleUrls: ['./uuid-generator-home.component.css']
})
export class UUIDGeneratorHome implements OnInit {

    uuid = '';
    exportValue: number = 100;
    errorMessage = '';
    form: FormGroup = new FormGroup({
        exportValue: new FormControl('',[Validators.required,
            Validators.min(0),
            Validators.max(999)]),
    });
    typeFile = 'xlsx';

    typesFiles : ExportFilesType[] = [
        { type : 'xlsx'},
        { type : 'csv' },
        { type : 'txt' }
    ];

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

    exportUuid(){
        this.errorMessage = '';
        if (this.exportValue == undefined || this.exportValue <= 0  || this.exportValue >= 1000) {
            this.errorMessage = 'Type a number between 1 and 999';
            return;
        }
        const exportUuid : ExportExcelModel[] = [];
        for (let i=0;i<this.exportValue;i++) {
            exportUuid.push({
                firstColumn : uuidv4()
            });
        }
        if (this.typeFile === 'xlsx') {
            this.exportExcel.generateExcel(exportUuid,'UUID-generate.xlsx');
        } else if (this.typeFile === 'csv') {
            this.exportExcel.generateCsv(exportUuid,'UUID-generate.csv');
        } else if (this.typeFile === 'txt') {
            this.exportExcel.generateTxt(exportUuid,'UUID-generate.txt');
        }
    }

  
}