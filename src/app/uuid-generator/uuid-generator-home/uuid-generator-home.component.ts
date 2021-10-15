import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { ExportFileService } from 'src/app/service/export-file.service';
import { ExportFileModel } from 'src/app/service/model/ExportFileModel';
import { FileParams } from 'src/app/service/model/FileParams';
import { SharedService } from 'src/app/service/shared.service';
import { MediaMatcher } from '@angular/cdk/layout';

@Component({
  selector: 'uuid-generator-home',
  templateUrl: './uuid-generator-home.component.html',
  styleUrls: ['./uuid-generator-home.component.css']
})
export class UUIDGeneratorHome implements OnInit {

    uuid = '';
    mobileQuery: MediaQueryList;
    private _mobileQueryListener: () => void;

    constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, 
        private sharedService: SharedService,
        private exportFileService: ExportFileService){
            this.mobileQuery = media.matchMedia('(max-width: 600px)');
            this._mobileQueryListener = () => changeDetectorRef.detectChanges();
            this.mobileQuery.addListener(this._mobileQueryListener);
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