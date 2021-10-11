import { Component, OnInit } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { ExportFileService } from 'src/app/service/export-file.service';
import { ExportFileModel } from 'src/app/service/model/ExportFileModel';
import { FileParams } from 'src/app/service/model/FileParams';
import { SharedService } from 'src/app/service/shared.service';

@Component({
  selector: 'uuid-generator-home',
  templateUrl: './uuid-generator-home.component.html',
  styleUrls: ['./uuid-generator-home.component.css']
})
export class UUIDGeneratorHome implements OnInit {

    uuid = '';

    constructor(private sharedService: SharedService,
        private exportFileService: ExportFileService){
    }

    ngOnInit(){
        this.generateNewUuid();
    }

    copyValue(){
        this.sharedService.copyValue(this.uuid);
    }

    generateNewUuid(){
        this.uuid = uuidv4();
    }

    exportUuid(fileParams: FileParams){
        const exportUuid : ExportFileModel[] = [];
        for (let i=0;i<fileParams.exportItens;i++) {
            exportUuid.push({
                firstColumn : uuidv4()
            });
        }
        fileParams.fileName = 'UUID-generate';
        fileParams.worksheetName = 'UUID';
        fileParams.firstColumnSize = 37;
        this.exportFileService.exportFile(exportUuid,fileParams);
    }

  
}