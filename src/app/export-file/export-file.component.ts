import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ExportFilesType } from 'src/app/service/model/ExportFilesType';

@Component({
  selector: 'export-file',
  templateUrl: './export-file.component.html',
  styleUrls: ['./export-file.component.css']
})
export class ExportFileComponent implements OnInit {

    exportValue: number = 100;
    errorMessage = '';
    typeFile = 'xlsx';
    @Output() submit = new EventEmitter();
    @Input() title = 'Export';

    typesFiles : ExportFilesType[] = [
        { type : 'xlsx'},
        { type : 'csv' },
        { type : 'txt' }
    ];

    constructor(){
    }

    ngOnInit(){

    }

    exportFile(){
        this.errorMessage = '';
        if (this.exportValue == undefined || this.exportValue <= 0  || this.exportValue >= 1000) {
            this.errorMessage = 'Type a number between 1 and 999';
            return;
        }
        this.submit.emit({
            fileType : this.typeFile,
            exportItens : this.exportValue
        });
    }




  
}