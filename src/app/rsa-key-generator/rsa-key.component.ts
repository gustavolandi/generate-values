import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ExportFileService } from '../service/export-file.service';
import { ExportFileModel } from '../service/model/ExportFileModel';
import { RsaKeyService } from '../service/rsa-key.service';
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
        { text: '512 bit',  id: 1, bits : 512 }, 
        { text: '1024 bit', id: 2, bits : 1024 }, 
        { text: '2048 bit', id: 3, bits : 2048 },
        { text: '4096 bit', id: 4, bits : 4096 },
    ];
    keySizeSelected : number = 1;
    controlDownloadFile : boolean = true;
    
    
    constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher,
        private rsaKeyService : RsaKeyService,
        private exportFile : ExportFileService,
        private sharedService : SharedService) {
        this.mobileQuery = media.matchMedia('(max-width: 600px)');
        this._mobileQueryListener = () => changeDetectorRef.detectChanges();
        this.mobileQuery.addListener(this._mobileQueryListener);

    }

      
    ngOnInit(): void {
        
    }

    generateRsaKey() {
        const bits = this.keySizes.filter((keySize) => keySize.id === this.keySizeSelected)[0].bits;
        const keyPair = this.rsaKeyService.generateKeyPairRSA(bits);
        this.privateKey = keyPair.private;
        this.publicKey = keyPair.public;
        this.controlDownloadFile = false;
    }

    downloadFile(type: string = '') {
        if (this.privateKey != '' && this.publicKey != '') {
            const exportFile : ExportFileModel[] = [];
            let fileName = 'RSAKey_' + type;
            if (type === 'publicKey') {
              exportFile.push({
                  firstColumn : this.publicKey
              });
            } else if (type === 'privateKey') {
                exportFile.push({
                    firstColumn : this.privateKey
                });
            } else if (type === '') {
                exportFile.push({
                    firstColumn : this.privateKey
                });
                exportFile.push({
                    firstColumn : this.publicKey
                });
                fileName = 'RSAKeyPair';
            }
            this.exportFile.exportFile(exportFile,
              {
              fileName : fileName,
              exportItens : exportFile.length,
              fileType : 'txt'
              }
            );
        }
    }

    copyValue(type : string) {
        if (type === 'publicKey') {
            this.sharedService.copyValue(this.publicKey);
        } 
        if (type === 'privateKey') {
            this.sharedService.copyValue(this.privateKey);
        }
    }


  }

    