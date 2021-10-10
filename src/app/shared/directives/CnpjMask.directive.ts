import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { CnpjPipe } from '../pipes/cnpj.pipe';

@Directive({
    selector: '[cnpjMask]'
})
export class CnpjMaskDirective {
    
    @Input() ngModel: string = '';
    oldValue = '';

  constructor(private el: ElementRef,
    private cnpjPipe : CnpjPipe) {
    (el.nativeElement as HTMLInputElement).value = '';
  }

  @HostListener('ngModelChange')
  onChange() {
    let text = (this.el.nativeElement as HTMLInputElement).value.trim();
    if (!text.match(/^[0-9-.\/]*$/) || text.length >= 19) {
        text = this.oldValue;
    } else {
        if (this.oldValue.length > text.length) {
            if (this.oldValue.length == 3) {
                text = text.substring(0,1);
            }
            if (this.oldValue.length == 7) {
                text = text.substring(0,5);
            }
            if (this.oldValue.length == 11) {
                text =  text.substring(0,9);
            }
            if (this.oldValue.length == 11) {
                text =  text.substring(0,9);
            }
            if (this.oldValue.length == 16) {
                text =  text.substring(0,14);
            }
        } else {
            if (text.length == 2 || text.length == 6) {
                text = text.concat('.');
            }
            if (text.length == 10) {
                text = text.concat('/');
            }
            if (text.length == 15) {
                text = text.concat('-');
            }
            if (text.length == 14) {
                if (text.indexOf('.') < 0 || text.indexOf('-') || text.indexOf('/')) {
                    text = this.cnpjPipe.transform(text);
                } 
            } 
        }
    }
    (this.el.nativeElement as HTMLInputElement).value = text;
    this.oldValue = text;

  }


 }