import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ExportFileService } from '../service/export-file.service';
import { SharedService } from '../service/shared.service';

@Component({
    selector: 'rsa-key',
    templateUrl: './rsa-key.component.html',
    styleUrls: ['./rsa-key.component.css']
  })
  export class RSAKeyComponent implements OnInit {
    

    mobileQuery: MediaQueryList;
    private _mobileQueryListener: () => void;

    privateKey: string = '';
    publicKey: string = '';
    keySizes = [
        { text: '512 bit', id: 1 }, 
        { text: '1024 bit', id: 2 }, 
        { text: '2048 bit', id: 2 },
        { text: '4096 bit', id: 3 },
    ];
    keySizeSelected : number = 1;
    controlDownloadFile : boolean = true;
    
    
    constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher,
        private exportFile : ExportFileService,
        private sharedService : SharedService) {
        this.mobileQuery = media.matchMedia('(max-width: 600px)');
        this._mobileQueryListener = () => changeDetectorRef.detectChanges();
        this.mobileQuery.addListener(this._mobileQueryListener);

      }

      
    ngOnInit(): void {
        
    }

    generateRsaKey() {

    }

    readFile(event: any) {
     
    }

    readAndConvertFile(event: any) {
     
    }

    downloadFile(type: string) {
     
    }

    copyValue(valueToCopy : string) {
      
    }


  }

    