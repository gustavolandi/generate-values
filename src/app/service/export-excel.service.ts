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

    async exportFile(exportData : ExportExcelModel[], fileName: string, fileType: string, workSheetName : string = '') {
        if (fileType === 'xlsx') {
            this.generateExcel(exportData,fileName,workSheetName);
        } else if (fileType === 'csv') {
            this.generateCsv(exportData,fileName,workSheetName);
        } else if (fileType === 'txt') {
            this.generateTxt(exportData,fileName);
        }
    }

    async generateExcel(exportData : ExportExcelModel[], fileName: string, workSheetName : string) {
        let workbook = new Workbook();
        let worksheet = workbook.addWorksheet(workSheetName);
        exportData.forEach(item => {
            worksheet.addRow([item.firstColumn]);
        });
        worksheet.getColumn(1).width = 37;
        workbook.xlsx.writeBuffer().then((data) => {
                let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
                fileSaver.saveAs(blob, fileName + '.xlsx');
        });
    }

    async generateCsv(exportData : ExportExcelModel[], fileName: string, workSheetName : string) {
        let workbook = new Workbook();
        let worksheet = workbook.addWorksheet(workSheetName);
        exportData.forEach(item => {
            worksheet.addRow([item.firstColumn]);
        });
        worksheet.getColumn(1).width = 37;
        workbook.csv.writeBuffer().then((data) => {
                let blob = new Blob([data], { type: 'text/csv' });
                fileSaver.saveAs(blob, fileName + '.csv');
        });
    }

    async generateTxt(exportData : ExportExcelModel[], fileName: string) {
        let data: string = '';
        exportData.forEach(item => 
            {
                data = data + item.firstColumn + '\n';
            });
        data = data.substring(0,data.length - 1);
        const blob = new Blob([data], { type: 'application/octet-stream' });
        fileSaver.saveAs(blob, fileName  + '.txt' );
    }

}