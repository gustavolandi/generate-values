import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
@Component({
    selector: 'spinner',
    templateUrl: './spinner.component.html',
    styleUrls: ['./spinner.component.css']
  })
  export class SpinnerComponent implements OnInit {

    @Input() loading : boolean = false;
    mode: ProgressSpinnerMode = 'determinate';
    
    constructor() {

    }
    
    ngOnInit(): void {
        
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.loading != null) {
            this.loading = changes.loading.currentValue;
        }
        // for (const loading in changes) {
        //   const chng = changes[loading];
        //   const cur  = JSON.stringify(chng.currentValue);
        //   const prev = JSON.stringify(chng.previousValue);
        // }
      }

  }