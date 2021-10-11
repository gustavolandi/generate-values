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
  
    private _mobileQueryListener: () => void;
      
    constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
      this.mobileQuery = media.matchMedia('(max-width: 600px)');
      this._mobileQueryListener = () => changeDetectorRef.detectChanges();
      this.mobileQuery.addListener(this._mobileQueryListener);
    }

    ngOnInit(): void {
        
    }

    encodeBase64(){
      this.textToDecode = btoa(this.textToEncode);
    }

    decodeBase64(){
      this.textToEncode = atob(this.textToDecode);
    }

  }