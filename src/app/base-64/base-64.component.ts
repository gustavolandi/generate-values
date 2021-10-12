import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

@Component({
    selector: 'base-64',
    templateUrl: './base-64.component.html',
    styleUrls: ['./base-64.component.css']
  })
  export class Base64Component implements OnInit {
    
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

      
    constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
      this.mobileQuery = media.matchMedia('(max-width: 600px)');
      this._mobileQueryListener = () => changeDetectorRef.detectChanges();
      this.mobileQuery.addListener(this._mobileQueryListener);
    }

    ngOnInit(): void {
        
    }

    encodeBase64(){
      if (this.textToEncode === '') {
        this.textToDecode = '';
        return;
      }
      if (this.multipleLines) {
        const lineEncoded : Array<string> = [];
        if (this.textToEncode.indexOf('\r') > 0) {
          this.textToEncode.split('\r\n').forEach(line => {
            lineEncoded.push(btoa(line));
          });
        } else {
          this.textToEncode.split('\n').forEach(line => {
            lineEncoded.push(btoa(line));
          });
        }
        this.textToDecode = lineEncoded.toString().split(',').join('\n');
      } else {
        this.textToDecode = btoa(this.textToEncode);
      }
    }

    decodeBase64() {
        if (this.textToDecode === '') {
          this.textToEncode = '';
          return;
        }
        if (this.multipleLines) {
          const lineDecoded : Array<string> = [];
          if (this.textToDecode.indexOf('\r') > 0) {
            this.textToDecode.split('\r\n').forEach(line => {
              lineDecoded.push(atob(line));
            });
          } else {
            this.textToDecode.split('\n').forEach(line => {
              lineDecoded.push(atob(line));
            });
          }
          this.textToEncode = lineDecoded.toString().split(',').join('\n');
        } else {
          this.textToEncode = atob(this.textToDecode);
        }
    }

    readFile(event: any) {
      let fileReader: FileReader = new FileReader();
      fileReader.onload = (e) => {
        this.convertFile(fileReader.result);
      }
      fileReader.readAsText(event.target.files[0]);
    }

    selectMultipleLines(checked: boolean){
      this.multipleLines = checked;
      this.encodeBase64();
    }

    selectMultipleLinesToConvert(checked : boolean) {
      this.multipleLinesToConvertFile = checked;
    }

    private convertFile(file : any) {
      this.textToEncode = file;
      this.encodeBase64();
    }

    readAndConvertFile(event: any) {

    }

  }

