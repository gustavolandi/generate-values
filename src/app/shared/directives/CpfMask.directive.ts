import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { CpfPipe } from '../pipes/cpf.pipe';

@Directive({
    selector: '[cpfMask]'
})
export class CpfMaskDirective {
    
    @Input() ngModel: string = '';
    oldValue = '';

  constructor(private el: ElementRef,
    private cpfPipe : CpfPipe) {
    (el.nativeElement as HTMLInputElement).value = '';
  }

  @HostListener('ngModelChange')
  onChange() {
    let text = (this.el.nativeElement as HTMLInputElement).value.trim();
    if (!text.match(/^[0-9-.]*$/) || text.length >= 15) {
        text = this.oldValue;
    } else {
        if (this.oldValue.length > text.length) {
            if (this.oldValue.length == 4) {
                text = text.substring(0,2);
            }
            if (this.oldValue.length == 8) {
                text = text.substring(0,6);
            }
            if (this.oldValue.length == 12) {
                text =  text.substring(0,10);
            }
        } else {
            if (text.length == 3) {
                text = text.concat('.');
            }
            if (text.length == 7) {
                text = text.concat('.');
            }
            if (text.length == 11) {
                if (text.indexOf('.') < 0) {
                    text = this.cpfPipe.transform(text);
                } else {
                    text = text.concat('-');
                }
            } 
        }
    }
    (this.el.nativeElement as HTMLInputElement).value = text;
    this.oldValue = text;

  }


 }