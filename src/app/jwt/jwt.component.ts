import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ExportFileService } from '../service/export-file.service';
import { SharedService } from '../service/shared.service';

import { JwtHelperService } from '@auth0/angular-jwt';

const REGEX_JWT = /^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.[A-Za-z0-9-_.+/=]*$/;
const CryptoJS = require("crypto-js");

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

    secretHsToken = 'teste';

    control : boolean = false;
    fileContent: string | ArrayBuffer | null = '';

    jwtAlgorithm = [
      { text: 'HS256', id: 1 }, 
      { text: 'HS384', id: 2 },
      { text: 'HS512', id: 3 },
  ];
    jwtAlgorithmSelected : number = 1;

    controlDownloadFile : boolean = true;
    
    @ViewChild('fileInputConvert') fileInputConvert!: ElementRef;
    @ViewChild('fileInputEncode') fileEncode!: ElementRef;
    
    jwtHelperService : JwtHelperService;

    constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher,
      private exportFile : ExportFileService,
      private sharedService : SharedService) {
      this.mobileQuery = media.matchMedia('(max-width: 600px)');
      this._mobileQueryListener = () => changeDetectorRef.detectChanges();
      this.mobileQuery.addListener(this._mobileQueryListener);
      this.jwtHelperService = new JwtHelperService();
    }

    ngOnInit(): void {
        
    }

    jwtDecode(){

      if (this.jwtEncoded === '') {
        this.jwtDecodedHeader = '';
        this.jwtDecodedPayload = '';
        this.jwtDecodedSignature = '';
        this.controlDownloadFile = true;
        return;
      }

      if (this.jwtEncoded.match(REGEX_JWT)) {

        try {
          
          const decodedToken = this.jwtHelperService.decodeToken(this.jwtEncoded);
          
          this.jwtDecodedPayload = JSON.stringify(decodedToken, undefined, 4);

          let decodedHeader = JSON.stringify(atob(this.jwtEncoded.split('.')[0]));
          decodedHeader = decodedHeader.split('\\').join('');
          decodedHeader = decodedHeader.substring(1,decodedHeader.length-1);
          
          const jsonTokenHeader = JSON.parse(decodedHeader);
          this.jwtDecodedHeader =  JSON.stringify(jsonTokenHeader, undefined, 4);
          switch (JSON.parse(this.jwtDecodedHeader).alg) {
            case 'HS256' :
              this.jwtAlgorithmSelected = 1;
              break;
            case 'HS384' :
              this.jwtAlgorithmSelected = 2;
              break;
            case 'HS512' : 
              this.jwtAlgorithmSelected = 3;
              break;  
          } 
          this.controlDownloadFile = false;
        } catch (e) {
              
        }
      }
    }

    headerEncode(){
      const jwtDecodedHeader = JSON.stringify(JSON.parse(this.jwtDecodedHeader));
      const headerEncoded = this.base64Url2(jwtDecodedHeader);  
      const jwtEncoded = headerEncoded + '.' + this.jwtEncoded.split('.')[1];
      let signature = '';
      switch (JSON.parse(this.jwtDecodedHeader).alg) {
        case 'HS256' :
          signature = this.signKeyHS256(jwtEncoded,this.secretHsToken);
          this.jwtAlgorithmSelected = 1;
          break;
        case 'HS384' :
          signature = this.signKeyHS384(jwtEncoded,this.secretHsToken);
          this.jwtAlgorithmSelected = 2;
          break;
        case 'HS512' : 
          signature = this.signKeyHS512(jwtEncoded,this.secretHsToken);
          this.jwtAlgorithmSelected = 3;
          break;  
      } 
      this.jwtEncoded = jwtEncoded + '.' + signature;
    }

    payloadEncode(){
      
    }

    validateJwt(){
      const jwtHelperService = new JwtHelperService();
      const expirationDate = jwtHelperService.getTokenExpirationDate(this.jwtEncoded);
      const isExpired = jwtHelperService.isTokenExpired(this.jwtEncoded);
    }

    signKeyHS256(msg: string,key: string) {
      let signature  = CryptoJS.HmacSHA256(msg, key);
      signature = this.base64url(signature);
      return signature ;
    }

    signKeyHS384(msg: string,key: string) {
      let signature  = CryptoJS.HmacSHA384(msg, key);
      signature = this.base64url(signature);
      return signature ;
    }

    signKeyHS512(msg: string,key: string) {
      let signature  = CryptoJS.HmacSHA512(msg, key);
      signature = this.base64url(signature);
      return signature ;
    }

    base64url(source: string) {
      return CryptoJS.enc.Base64.stringify(source)
              .replace(/=+$/, '')
              .replace(/\+/g, '-')
              .replace(/\//g, '_');
    }

    base64Url2(text : string) {
      return btoa(text)
      .replace(/=+$/, '')
      .replace(/\+/g, '-')
      .replace(/\//g, '_');
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

