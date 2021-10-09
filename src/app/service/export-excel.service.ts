import { Injectable } from '@angular/core';
import { Workbook } from 'exceljs';
import * as fileSaver from 'file-saver';
import { ExportExcelModel } from './model/ExportExcelModel';

@Injectable({
    providedIn: 'root'
  })
export class ExportExcel {

    constructor(){

    }

    async generateExcel(exportUuid : ExportExcelModel[], fileName: string) {
        let workbook = new Workbook();
        let worksheet = workbook.addWorksheet('UUID');
        exportUuid.forEach(item => {
            worksheet.addRow([item.firstColumn]);
        });
        worksheet.getColumn(1).width = 37;
        workbook.xlsx.writeBuffer().then((data) => {
                let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
                fileSaver.saveAs(blob, fileName);
        });
    }

    async generateCsv(exportUuid : ExportExcelModel[], fileName: string) {
        let workbook = new Workbook();
        let worksheet = workbook.addWorksheet('UUID');
        exportUuid.forEach(item => {
            worksheet.addRow([item.firstColumn]);
        });
        worksheet.getColumn(1).width = 37;
        workbook.csv.writeBuffer().then((data) => {
                let blob = new Blob([data], { type: 'text/csv' });
                fileSaver.saveAs(blob, fileName);
        });
    }

    async generateTxt(exportUuid : ExportExcelModel[], fileName: string) {
        let data: string = '';
        exportUuid.forEach(item => 
            {
                data = data + item.firstColumn + '\n';
            });
        data = data.substring(0,data.length - 1);
        const blob = new Blob([data], { type: 'application/octet-stream' });
        fileSaver.saveAs(blob, fileName);
    }

}