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
        workbook.xlsx.writeBuffer().then((data) => {
                let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
                fileSaver.saveAs(blob, fileName);
        });
    }

}