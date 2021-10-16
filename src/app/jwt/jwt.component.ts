import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ExportFileService } from '../service/export-file.service';
import { SharedService } from '../service/shared.service';

import { JwtHelperService } from '@auth0/angular-jwt';

const REGEX_JWT = /^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.[A-Za-z0-9-_.+/=]*$/;

@Component({
    selector: 'jwt',
    templateUrl: './jwt.component.html',
    styleUrls: ['./jwt.component.css']
  })
  export class JWTComponent implements OnInit {
    
    mobileQuery: MediaQueryList;
    private _mobileQueryListener: () => void;
    
    jwtEncoded : string = '';

    jwtDecodedHeader : string = '';
    jwtDecodedPayload : string = '';

    jwtDecodedSignature : string = '';
    jwtDecodedSignaturePrivateKey : string = '';
    jwtDecodedSignaturePublicKey : string = '';

    control : boolean = false;
    fileContent: string | ArrayBuffer | null = '';

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

    jwtDecode(){

      if (this.jwtEncoded === '') {
        this.jwtDecodedHeader = '';
        this.jwtDecodedPayload = '';
        this.jwtDecodedSignature = '';
        this.jwtDecodedSignaturePrivateKey = '';
        this.jwtDecodedSignaturePublicKey = '';
        return;
      }

      if (this.jwtEncoded.match(REGEX_JWT)) {

        try {
           const jwtHelperService = new JwtHelperService();
          
          const decodedToken = jwtHelperService.decodeToken(this.jwtEncoded);
          
          this.jwtDecodedPayload = JSON.stringify(decodedToken, undefined, 4);

          let decodedHeader = JSON.stringify(atob(this.jwtEncoded.split('.')[0]));
          decodedHeader = decodedHeader.split('\\').join('');
          decodedHeader = decodedHeader.substring(1,decodedHeader.length-1);
          
          const jsonTokenHeader = JSON.parse(decodedHeader);
          this.jwtDecodedHeader =  JSON.stringify(jsonTokenHeader, undefined, 4);
        } catch (e) {
          console.log(e);
        }

      } else {
        
      }
    }

    validateJwt(){
      const jwtHelperService = new JwtHelperService();
      const expirationDate = jwtHelperService.getTokenExpirationDate(this.jwtEncoded);
      const isExpired = jwtHelperService.isTokenExpired(this.jwtEncoded);
    }
     

    encodeBase64(){
    }

    decodeBase64() {

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

