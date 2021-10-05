import { Injectable } from '@angular/core';
import { UuidGenerated } from '../uuid-generator/uuid-generator-home/uuid-generator-home.component';
import { Workbook } from 'exceljs';
import * as fileSaver from 'file-saver';

@Injectable({
    providedIn: 'root'
  })
export class ExportExcel {

    constructor(){

    }

    async generateExcel(exportUuid : UuidGenerated[], fileName: string) {
        let workbook = new Workbook();
        let worksheet = workbook.addWorksheet('UUID');
        exportUuid.forEach(item => {
            worksheet.addRow([item.uuid]);
        });
        worksheet.getColumn(1).width = 37;
        workbook.xlsx.writeBuffer().then((data) => {
                let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
                fileSaver.saveAs(blob, fileName);
        });
    }

    async generateCsv(exportUuid : UuidGenerated[], fileName: string) {
        let workbook = new Workbook();
        let worksheet = workbook.addWorksheet('UUID');
        exportUuid.forEach(item => {
            worksheet.addRow([item.uuid]);
        });
        worksheet.getColumn(1).width = 37;
        workbook.csv.writeBuffer().then((data) => {
                let blob = new Blob([data], { type: 'text/csv' });
                fileSaver.saveAs(blob, fileName);
        });
    }

    async generateTxt(exportUuid : UuidGenerated[], fileName: string) {
        let data: string = '';
        exportUuid.forEach(item => 
            {
                data = data + item.uuid + '\n';
            });
        data = data.substring(0,data.length - 1);
        const blob = new Blob([data], { type: 'application/octet-stream' });
        fileSaver.saveAs(blob, fileName);
    }

}