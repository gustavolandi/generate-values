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
      
    constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
      this.mobileQuery = media.matchMedia('(max-width: 600px)');
      this._mobileQueryListener = () => changeDetectorRef.detectChanges();
      this.mobileQuery.addListener(this._mobileQueryListener);
    }

    ngOnInit(): void {
        
    }

    encodeBase64(){
      if (this.textToEncode !== '') {
        if (this.multipleLines) {
          const lineEncoded : Array<string> = [];
          if (this.textToEncode.indexOf('\r') > 0) {
            this.textToEncode.split('\r\n').forEach(line => {
              lineEncoded.push(btoa(line));
            });
            this.textToDecode = lineEncoded.toString().split(',').join('\n');
          } else {
            this.textToEncode.split('\n').forEach(line => {
              lineEncoded.push(btoa(line));
            });
            this.textToDecode = lineEncoded.toString().split(',').join('\n');
          }
        } else {
          this.textToDecode = btoa(this.textToEncode);
        }
    } else {
        this.textToDecode = '';
    }
    }

    decodeBase64(){
      this.textToEncode = atob(this.textToDecode);
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


    private convertFile(file : any) {
      const linesText : Array<string> = file.split('\r\n');
      if (this.multipleLines) {
        const lineEncoded : Array<string> = [];
        linesText.forEach(line => {
          lineEncoded.push(btoa(line));
        });
        this.textToEncode = file;
          this.textToDecode = lineEncoded.toString().replace(',','\r\n');
      } else {
        this.textToEncode = file;
        this.textToDecode = btoa(file);
      }
    }

  }

