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

    secretHsToken = '';
    secretHsTokenValue = '';
    secretHsEncoded : boolean = false;

    control : boolean = false;
    fileContent: string | ArrayBuffer | null = '';

    jwtAlgorithm = [
      { text: 'HS256', id: 1 }, 
      { text: 'HS384', id: 2 },
      { text: 'HS512', id: 3 },
      { text: 'RS256', id: 4 }, 
      { text: 'RS384', id: 5 },
      { text: 'RS512', id: 6 },
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

          let decodedHeader = JSON.stringify(atob(this.jwtEncoded.split('.')[0])).split('\\').join('').slice(1, -1);
          
          this.jwtDecodedHeader =  JSON.stringify(JSON.parse(decodedHeader), undefined, 4);
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
      let signature = this.signKeyHS(jwtEncoded,JSON.parse(this.jwtDecodedHeader).alg);
      this.jwtEncoded = jwtEncoded + '.' + signature;
    }

    payloadEncode(){
      const jwtDecodedPayload = JSON.stringify(JSON.parse(this.jwtDecodedPayload));
      const payloadEncoded = this.base64Url2(jwtDecodedPayload);  
      const jwtEncoded = this.jwtEncoded.split('.')[0] + '.' + payloadEncoded;
      let signature = this.signKeyHS(jwtEncoded,JSON.parse(this.jwtDecodedHeader).alg);
      this.jwtEncoded = jwtEncoded + '.' + signature;
    }

    updateAlgorithm(){
      const header = JSON.parse(this.jwtDecodedHeader);
      switch (this.jwtAlgorithmSelected) {
        case 1 :
          header.alg = 'HS256';
          break;
        case 2 :
          header.alg = 'HS384';
          break;
        case 3 : 
          header.alg = 'HS512';
          break;  
      } 
      this.jwtDecodedHeader = JSON.stringify(header, undefined, 4);
      this.headerEncode();
    }

    validateJwt(){
      const jwtHelperService = new JwtHelperService();
      const expirationDate = jwtHelperService.getTokenExpirationDate(this.jwtEncoded);
      const isExpired = jwtHelperService.isTokenExpired(this.jwtEncoded);
    }

    signKeyHS(msg: string, alg : string) {
      let signature = '';
      switch (alg) {
        case 'HS256' :
          signature = CryptoJS.HmacSHA256(msg, this.secretHsTokenValue);
          this.jwtAlgorithmSelected = 1;
          break;
        case 'HS384' :
          signature = CryptoJS.HmacSHA384(msg, this.secretHsTokenValue);
          this.jwtAlgorithmSelected = 2;
          break;
        case 'HS512' : 
          signature  = CryptoJS.HmacSHA512(msg, this.secretHsTokenValue);
          this.jwtAlgorithmSelected = 3;
          break;
      }
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

    jwtAlgorithmSelectedHS() : boolean {
      return this.jwtAlgorithmSelected === 1 || this.jwtAlgorithmSelected === 2 || this.jwtAlgorithmSelected === 3;
    }

    updateSecretHS(){
      this.secretKeyHSValue();
      if (this.jwtEncoded !== '') {
        const jwtDecodedHeader = JSON.stringify(JSON.parse(this.jwtDecodedHeader));
        const headerEncoded = this.base64Url2(jwtDecodedHeader);  
        const jwtDecodedPayload = JSON.stringify(JSON.parse(this.jwtDecodedPayload));
        const payloadEncoded = this.base64Url2(jwtDecodedPayload);  
        const jwtEncoded = headerEncoded + '.' + payloadEncoded;
        let signature = this.signKeyHS(jwtEncoded,JSON.parse(jwtDecodedHeader).alg);
        this.jwtEncoded = jwtEncoded + '.' + signature;
      }
    }

    jwtAlgorithmSelectedRS(){
      return this.jwtAlgorithmSelected === 4 || this.jwtAlgorithmSelected === 5 || this.jwtAlgorithmSelected === 6;
    }

    encodeKeyHsBase64(checked: boolean) {
      this.secretHsEncoded = checked;
      this.updateSecretHS();
    }

    secretKeyHSValue(){
      if (this.secretHsEncoded) {
        this.secretHsTokenValue = this.base64Url2(this.secretHsToken);
      } else {
        this.secretHsTokenValue = this.secretHsToken;
      }
    }

    readFile(event: any) {
     
    }

    readAndConvertFile(event: any) {
     
    }

    downloadFile(type: string) {
     
    }

    copyValue(valueToCopy : string) {
      
    }

    isMobile() : boolean {
      return this.mobileQuery.matches;
    }

  }

