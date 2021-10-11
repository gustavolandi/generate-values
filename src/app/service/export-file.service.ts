import { Injectable } from '@angular/core';
import { Workbook } from 'exceljs';
import * as fileSaver from 'file-saver';
import { ExportFileModel } from './model/ExportFileModel';
import { FileParams } from './model/FileParams';

@Injectable({
    providedIn: 'root'
  })
export class ExportFileService {

    constructor(){

    }

    public async exportFile(exportData : ExportFileModel[], fileParams : FileParams) {
        if (fileParams.fileType === 'xlsx') {
            this.generateExcel(exportData,fileParams);
        } else if (fileParams.fileType === 'csv') {
            this.generateCsv(exportData,fileParams);
        } else if (fileParams.fileType === 'txt') {
            this.generateTxt(exportData,fileParams);
        }
    }

    private async generateExcel(exportData : ExportFileModel[], fileParams : FileParams) {
        this.generateSheet(exportData,fileParams).xlsx.writeBuffer().then((data) => {
                let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
                fileSaver.saveAs(blob, fileParams.fileName + '.xlsx');
        });
    }

    private async generateCsv(exportData : ExportFileModel[], fileParams : FileParams) {
        this.generateSheet(exportData,fileParams).csv.writeBuffer().then((data) => {
                let blob = new Blob([data], { type: 'text/csv' });
                fileSaver.saveAs(blob, fileParams.fileName + '.csv');
        });
    }

    private async generateTxt(exportData : ExportFileModel[], fileParams : FileParams) {
        let data: string = '';
        exportData.forEach(item => 
            {
                data = data + item.firstColumn + '\n';
            });
        data = data.substring(0,data.length - 1);
        const blob = new Blob([data], { type: 'application/octet-stream' });
        fileSaver.saveAs(blob, fileParams.fileName  + '.txt' );
    }

    private generateSheet(exportData : ExportFileModel[], fileParams : FileParams) : Workbook {
        let workbook = new Workbook();
        let worksheet = workbook.addWorksheet(fileParams.worksheetName);
        exportData.forEach(item => {
            worksheet.addRow([item.firstColumn]);
        });
        worksheet.getColumn(1).width = fileParams.firstColumnSize;
        return workbook;
    }

}