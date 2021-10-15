import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ExportFileService } from '../service/export-file.service';
import { ExportFileModel } from '../service/model/ExportFileModel';
import { FileParams } from '../service/model/FileParams';
import { SharedService } from '../service/shared.service';

@Component({
    selector: 'jwt',
    templateUrl: './jwt.component.html',
    styleUrls: ['./jwt.component.css']
  })
  export class JWTComponent implements OnInit {
    
    mobileQuery: MediaQueryList;
    textToEncode : string = '';
    textToDecode : string = '';
    control : boolean = false;
    fileContent: string | ArrayBuffer | null = '';
    private _mobileQueryListener: () => void;
    multipleLines : boolean = false;
    multipleLinesToConvertFile : boolean = false;
    convertFileOptions = [{text: 'Encode', id : 1 }, {text: 'Decode', id: 2}];
    convertFileSelect : number = 1;
    controlDownloadFile : boolean = true;

    @ViewChild('fileInputConvert') fileInputConvert!: ElementRef;
    @ViewChild('fileInputEncode') fileEncode!: ElementRef;
      
    constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, 
      private exportFile : ExportFileService,
      private sharedService : SharedService) {
      this.mobileQuery = media.matchMedia('(max-width: 600px)');
      this._mobileQueryListener = () => changeDetectorRef.detectChanges();
      this.mobileQuery.addListener(this._mobileQueryListener);
    }

    ngOnInit(): void {
        
    }

    

    copyValue(valueToCopy : string) {
      if (this.textToEncode != '') {
        if (valueToCopy === 'encode') {
          this.sharedService.copyValue(this.textToEncode);
        } else if (valueToCopy === 'decode') {
          this.sharedService.copyValue(this.textToDecode);
        }
      }
    }

  }

