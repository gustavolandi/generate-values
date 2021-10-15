import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Md5 } from 'md5-typescript';
import { ExportFileService } from '../service/export-file.service';
import { ExportFileModel } from '../service/model/ExportFileModel';

@Component({
    selector: 'md5',
    templateUrl: './md5.component.html',
    styleUrls: ['./md5.component.css']
  })
  export class MD5Component implements OnInit {
    
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

    encodeMd5(){
      if (this.textToEncode === '') {
        this.textToDecode = '';
        this.controlDownloadFile = true;
        return;
      }
      this.textToDecode = this.encodeAndValidateLines(this.textToEncode,this.multipleLines);
      this.controlDownloadFile = false;
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
      this.encodeMd5();
    }

    selectMultipleLinesToConvert(checked : boolean) {
      this.multipleLinesToConvertFile = checked;
    }

    private convertFile(file : any) {
      this.textToEncode = file;
      this.encodeMd5();
      this.fileEncode.nativeElement.value = '';
    }

    readAndConvertFile(event: any) {
      let fileReader: FileReader = new FileReader();
      fileReader.onload = () => {
        const result : any = fileReader.result;
        let textEncoded = this.encodeAndValidateLines(result,this.multipleLinesToConvertFile);
        const exportFile : ExportFileModel[] = [];
        textEncoded.split('\n').forEach(item => {
          exportFile.push({
            firstColumn : item
          });
        });
        this.exportFile.exportFile(exportFile,
          {
          fileName : 'MD5_encode',
          exportItens : textEncoded.split('\n').length,
          fileType : 'txt'
          }
        );
      }
      fileReader.readAsText(event.target.files[0]);
      this.fileInputConvert.nativeElement.value = '';
    }

    encodeAndValidateLines(text : string ,multipleLines : boolean) {
      let textToEncodeDecode = '';
      if (multipleLines) {
        const lineDecoded : Array<string> = [];
        if (text.indexOf('\r') > 0) {
          text.split('\r\n').forEach(line => {
            lineDecoded.push(this.encode(line));
          });
        } else {
          text.split('\n').forEach(line => {
            lineDecoded.push(this.encode(line));
          });
        }
        textToEncodeDecode = lineDecoded.toString().split(',').join('\n');
      } else {
        textToEncodeDecode = this.encode(text);
      }
      return textToEncodeDecode;
    }

    encode(text : string) : string {
      return Md5.init(text);
    }

    downloadFile(type: string) {
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
          fileName : 'MD5_encode',
          exportItens : length,
          fileType : 'txt'
          }
        );
      }
    }



  }

