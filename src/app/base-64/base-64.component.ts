import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ExportFileService } from '../service/export-file.service';
import { ExportFileModel } from '../service/model/ExportFileModel';
import { FileParams } from '../service/model/FileParams';

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
    controlDownloadFile : boolean = true;

    @ViewChild('fileInputConvert') fileInputConvert!: ElementRef;
    @ViewChild('fileInputEncode') fileEncode!: ElementRef;

      
    constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private exportFile : ExportFileService) {
      this.mobileQuery = media.matchMedia('(max-width: 600px)');
      this._mobileQueryListener = () => changeDetectorRef.detectChanges();
      this.mobileQuery.addListener(this._mobileQueryListener);
    }

    ngOnInit(): void {
        
    }

    encodeBase64(){
      if (this.textToEncode === '') {
        this.textToDecode = '';
        this.controlDownloadFile = true;
        return;
      }
      this.textToDecode = this.encodeDecode(this.textToEncode,'encode',this.multipleLines);
      this.controlDownloadFile = false;
    }

    decodeBase64() {
      if (this.textToDecode === '') {
        this.textToEncode = '';
        this.controlDownloadFile = true;
        return;
      }
      this.textToEncode = this.encodeDecode(this.textToDecode,'decode',this.multipleLines);
      this.controlDownloadFile = false;
    }

    readFile(event: any) {
      let fileReader: FileReader = new FileReader();
      fileReader.onload = (e) => {
        this.convertFile(fileReader.result);
      }
      fileReader.readAsText(event.target.files[0]);
      this.fileEncode.nativeElement.value = '';
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
      let fileReader: FileReader = new FileReader();
      fileReader.onload = () => {
        const result : any = fileReader.result;
        let textEncoded = this.encodeDecode(result,this.validateTypeEncodeOrDecode(),this.multipleLinesToConvertFile);
        const exportFile : ExportFileModel[] = [];
        textEncoded.split('\n').forEach(item => {
          exportFile.push({
            firstColumn : item
          });
        });
        this.exportFile.exportFile(exportFile,
          {
          fileName : 'Base64_' + this.validateTypeEncodeOrDecode(),
          exportItens : textEncoded.split('\n').length,
          fileType : 'txt'
          }
        );
      }
      fileReader.readAsText(event.target.files[0]);
      this.fileInputConvert.nativeElement.value = '';
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

    validateTypeEncodeOrDecode() : string {
      return this.convertFileSelect == 1 ? 'encode' : 'decode';
    }

    downloadFile(type: string) {
      console.log('download file');
      if (this.textToEncode != '' && this.textToDecode != ''){
        let length = 0;
        const exportFile : ExportFileModel[] = [];
        if (type === 'encode') {
          length = this.textToEncode.split('\n').length;
          this.textToEncode.split('\n').forEach(item => {
            exportFile.push({
              firstColumn : item
            });
          });
        } else {
          length = this.textToDecode.split('\n').length;
          this.textToDecode.split('\n').forEach(item => {
            exportFile.push({
              firstColumn : item
            });
          });
        }
        this.exportFile.exportFile(exportFile,
          {
          fileName : 'Base64_' + this.validateTypeEncodeOrDecode(),
          exportItens : length,
          fileType : 'txt'
          }
        );
      }
    }



  }

