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
      this.textToDecode = this.encodeDecode(this.textToEncode,'encode',this.multipleLines);
    }

    decodeBase64() {
        if (this.textToDecode === '') {
          this.textToEncode = '';
          return;
        }
        this.textToEncode = this.encodeDecode(this.textToDecode,'decode',this.multipleLines);
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

    encodeDecode(text : string, encodeOrDecode : string,multipleLines : boolean) {
      let textToEncodeDecode = '';
      if (multipleLines) {
        const lineDecoded : Array<string> = [];
        if (text.indexOf('\r') > 0) {
          text.split('\r\n').forEach(line => {
            lineDecoded.push(this.encodeOrDecode(line,encodeOrDecode));
          });
        } else {
          text.split('\n').forEach(line => {
            lineDecoded.push(this.encodeOrDecode(line,encodeOrDecode));
          });
        }
        textToEncodeDecode = lineDecoded.toString().split(',').join('\n');
      } else {
        textToEncodeDecode = this.encodeOrDecode(text,encodeOrDecode);
      }
      return textToEncodeDecode;
    }

    encodeOrDecode(text : string, encodeOrDecode : string) : string {
      if (encodeOrDecode === 'encode') {
        return btoa(text);
      } 
      return atob(text);
    }



  }

