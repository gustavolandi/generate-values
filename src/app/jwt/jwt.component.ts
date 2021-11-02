import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ExportFileService } from '../service/export-file.service';
import { SharedService } from '../service/shared.service';

import { JwtHelperService } from '@auth0/angular-jwt';
import { jwtVerify, SignJWT, importPKCS8, importSPKI, importJWK, JWK } from 'jose';

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

    jwtRsPrivateKey : string = '';
    jwtRsPublicKey : string = '';

    control : boolean = false;
    fileContent: string | ArrayBuffer | null = '';

    jwtAlgorithm = [
      { text: 'HS256', id: 1 }, 
      { text: 'HS384', id: 2 },
      { text: 'HS512', id: 3 },
      { text: 'RS256', id: 4 }, 
      { text: 'RS384', id: 5 },
      { text: 'RS512', id: 6 },
      { text: 'ES256', id: 7 }, 
      { text: 'ES384', id: 8 },
      { text: 'ES512', id: 9 },
      { text: 'PS256', id: 10 }, 
      { text: 'PS384', id: 11 },
      { text: 'PS512', id: 12 },
    ];
    jwtAlgorithmSelected : number = 1;

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
        return;
      }

      if (this.jwtEncoded.match(REGEX_JWT)) {

        try {
          
          const decodedToken = this.jwtHelperService.decodeToken(this.jwtEncoded);
          
          this.jwtDecodedPayload = JSON.stringify(decodedToken, undefined, 4);

          let decodedHeader = JSON.stringify(atob(this.jwtEncoded.split('.')[0])).split('\\').join('').slice(1, -1);
          
          this.jwtDecodedHeader =  JSON.stringify(JSON.parse(decodedHeader), undefined, 4);
          this.jwtAlgorithmSelected = this.jwtAlgorithm.filter((alg) => alg.text === JSON.parse(this.jwtDecodedHeader).alg)[0].id;
          if (this.jwtAlgorithmPairKey()) {
            this.updateRsPublicKey();
          }
        } catch (e) {
            this.sharedService.showSnackBar('Erro ao decodificar token',1000);  
        }
      }
    }

    headerEncode(){
      const jwtDecodedHeader = JSON.stringify(JSON.parse(this.jwtDecodedHeader));
      const headerEncoded = this.base64Url2(jwtDecodedHeader);  
      const jwtEncoded = headerEncoded + '.' + this.jwtEncoded.split('.')[1];
      if (this.jwtAlgorithmSelectedHS()) {
        let signature = this.signKeyHS(jwtEncoded,JSON.parse(this.jwtDecodedHeader).alg);
        this.jwtEncoded = jwtEncoded + '.' + signature;
      } else if (this.jwtAlgorithmSelectedRS()) {
        this.updateRsPrivateKey();
      }
    }

    payloadEncode(){
      const jwtDecodedPayload = JSON.stringify(JSON.parse(this.jwtDecodedPayload));
      const payloadEncoded = this.base64Url2(jwtDecodedPayload);  
      const jwtEncoded = this.jwtEncoded.split('.')[0] + '.' + payloadEncoded;
      if (this.jwtAlgorithmSelectedHS()) {
        let signature = this.signKeyHS(jwtEncoded,JSON.parse(this.jwtDecodedHeader).alg);
        this.jwtEncoded = jwtEncoded + '.' + signature;
      } else if (this.jwtAlgorithmSelectedRS()) {
        this.updateRsPrivateKey();
      }
    }

    updateAlgorithm(){
      const header = JSON.parse(this.jwtDecodedHeader);
      header.alg = this.jwtAlgorithm.filter((alg) => alg.id === this.jwtAlgorithmSelected)[0].text;
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

    jwtAlgorithmPairKey(){
      return this.jwtAlgorithmSelectedRS() || this.jwtAlgorithmSelectedES() || this.jwtAlgorithmSelectedPS();
    }

    jwtAlgorithmSelectedRS(){
      return this.jwtAlgorithmSelected === 4 || this.jwtAlgorithmSelected === 5 || this.jwtAlgorithmSelected === 6;
    }

    jwtAlgorithmSelectedES(){
      return this.jwtAlgorithmSelected === 7 || this.jwtAlgorithmSelected === 8 || this.jwtAlgorithmSelected === 9;
    }

    jwtAlgorithmSelectedPS(){
      return this.jwtAlgorithmSelected === 10 || this.jwtAlgorithmSelected === 11 || this.jwtAlgorithmSelected === 12;
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

    downloadFile(type: string) {
     
    }

    copyValue(valueToCopy : string) {
      let value = '';
      if (valueToCopy === 'tokenEncoded') {
        value = this.jwtEncoded;
      } else if (valueToCopy === 'tokenDecodedHeader') {
        value = this.jwtDecodedHeader;
      } else if (valueToCopy === 'tokenDecodedPayload') {
        value = this.jwtDecodedPayload;
      } else if (valueToCopy === 'publicKey') {
        value = this.jwtRsPublicKey;
      } else if (valueToCopy === 'privateKey') {
        value = this.jwtRsPrivateKey;
      }
      if (value != undefined && value != '') {
        this.sharedService.copyValue(value);
      }
    }

    isMobile() : boolean {
      return this.mobileQuery.matches;
    }

    updateRsPrivateKey(encodedJwt : string = this.jwtEncoded,
      decodedPayload : string = this.jwtDecodedPayload,
      decodedHeader : string = this.jwtDecodedHeader) {
      if (encodedJwt !== '' && this.jwtRsPrivateKey !== '') {
        if (this.validatePrivateKey() && encodedJwt.split('.').length < 3) {
            this.privateKey().then((data)=>{
              const jwt =  new SignJWT(JSON.parse(decodedPayload))
              .setProtectedHeader(JSON.parse(decodedHeader))
              .sign(data);
              jwt.then(
                (jwtData) => this.jwtEncoded = jwtData,
                () => this.sharedService.showSnackBar('Erro ao codificar jwt')
              );
            }, 
            ()=> this.sharedService.showSnackBar('Erro private key')
            ); 
        }
      }
    }

    validatePrivateKey(){
      const pkcs1Header = "-----BEGIN RSA PRIVATE KEY-----";
      const pkcs1Footer = "-----END RSA PRIVATE KEY-----";
      const pkcs8Header = "-----BEGIN PRIVATE KEY-----";
      const pkcs8Footer = "-----END PRIVATE KEY-----";
      if (this.jwtRsPrivateKey.indexOf(pkcs1Header) >= 0 || this.jwtRsPrivateKey.indexOf(pkcs1Footer) >=0) {
        this.sharedService.showSnackBar('Formato Inválido Chave Privada - PKCS1');
        return false;
      }
      if (this.jwtRsPrivateKey.indexOf(pkcs8Header) < 0 || this.jwtRsPrivateKey.indexOf(pkcs8Footer) < 0) {
        this.sharedService.showSnackBar('Formato Inválido Chave Privada');
        return false;
      }
      return true;
    }

    updateRsPublicKey(){
      if (this.jwtEncoded !== '' && this.jwtRsPublicKey !== '') {
        if (this.validatePublicKey()){
          this.publicKey()
          .then((data) => {
            jwtVerify(this.jwtEncoded,data).then(
              () => this.validSignature(), 
              () => this.invalidSignatureSnackBar()
            );
          })
          .catch(() => this.invalidSignatureSnackBar())
        }
      }
    }

    validSignature() {
      this.sharedService.showSnackBar('Assinatura verificada');
    }

    invalidSignatureSnackBar(){
      this.sharedService.showSnackBar('Assinatura inválida');
    }

    validatePublicKey(){
      const pkcs1Header = '-----BEGIN RSA PUBLIC KEY-----';
      const pkcs1Footer = '-----END RSA PUBLIC KEY-----';
      const pkcs8Header = '-----BEGIN PUBLIC KEY-----';
      const pkcs8Footer = '-----END PUBLIC KEY-----';
      if (this.jwtRsPublicKey.indexOf(pkcs1Header) >= 0 || this.jwtRsPublicKey.indexOf(pkcs1Footer) >=0) {
        this.sharedService.showSnackBar('Formato Inválido Chave Pública - PKCS1');
        return false;
      }
      if (this.jwtRsPublicKey.indexOf(pkcs8Header) < 0 || this.jwtRsPublicKey.indexOf(pkcs8Footer) < 0) {
          const JWK = this.validateJwk();
          if (JWK == null) {
            this.sharedService.showSnackBar('Formato Inválido Chave Pública');
            return false;
        }
      }
      return true;
    }

    validateJwk() : JWK | null {
      try {
        const JWK : JWK = JSON.parse(this.jwtRsPublicKey);
        return JWK;
      } catch(e) {
        return null;
      }
    }


    async privateKey() {
      return await importPKCS8(this.jwtRsPrivateKey, this.jwtAlgorithm.filter((alg) => alg.id === this.jwtAlgorithmSelected)[0].text);
    }

    async publicKey() {
      const JWK = this.validateJwk();
      if (JWK == null) {
        return await importSPKI(this.jwtRsPublicKey, this.jwtAlgorithm.filter((alg) => alg.id === this.jwtAlgorithmSelected)[0].text);
      } else {
        JWK.use = 'sig';
        return await importJWK(JWK, this.jwtAlgorithm.filter((alg) => alg.id === this.jwtAlgorithmSelected)[0].text);
      }
    }

    async privateKeyPKCS1() {
      return await importPKCS8(this.jwtRsPrivateKey, this.jwtAlgorithm.filter((alg) => alg.id === this.jwtAlgorithmSelected)[0].text);
    }

  }

