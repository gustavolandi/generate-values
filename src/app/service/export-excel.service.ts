import { Injectable } from '@angular/core';
import { Workbook } from 'exceljs';
import * as fileSaver from 'file-saver';
import { ExportExcelModel } from './model/ExportExcelModel';
import { FileParams } from './model/FileParams';

@Injectable({
    providedIn: 'root'
  })
export class ExportExcel {

    constructor(){

    }

    async exportFile(exportData : ExportExcelModel[], fileParams : FileParams) {
        if (fileParams.fileType === 'xlsx') {
            this.generateExcel(exportData,fileParams);
        } else if (fileParams.fileType === 'csv') {
            this.generateCsv(exportData,fileParams);
        } else if (fileParams.fileType === 'txt') {
            this.generateTxt(exportData,fileParams);
        }
    }

    async generateExcel(exportData : ExportExcelModel[], fileParams : FileParams) {
        let workbook = new Workbook();
        let worksheet = workbook.addWorksheet(fileParams.worksheetName);
        exportData.forEach(item => {
            worksheet.addRow([item.firstColumn]);
        });
        worksheet.getColumn(1).width = fileParams.firstColumnSize;
        workbook.xlsx.writeBuffer().then((data) => {
                let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
                fileSaver.saveAs(blob, fileParams.fileName + '.xlsx');
        });
    }

    async generateCsv(exportData : ExportExcelModel[], fileParams : FileParams) {
        let workbook = new Workbook();
        let worksheet = workbook.addWorksheet(fileParams.worksheetName);
        exportData.forEach(item => {
            worksheet.addRow([item.firstColumn]);
        });
        worksheet.getColumn(1).width = fileParams.firstColumnSize;
        workbook.csv.writeBuffer().then((data) => {
                let blob = new Blob([data], { type: 'text/csv' });
                fileSaver.saveAs(blob, fileParams.fileName + '.csv');
        });
    }

    async generateTxt(exportData : ExportExcelModel[], fileParams : FileParams) {
        let data: string = '';
        exportData.forEach(item => 
            {
                data = data + item.firstColumn + '\n';
            });
        data = data.substring(0,data.length - 1);
        const blob = new Blob([data], { type: 'application/octet-stream' });
        fileSaver.saveAs(blob, fileParams.fileName  + '.txt' );
    }

}