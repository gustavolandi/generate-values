import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'cpfFormat'})
export class CpfPipe implements PipeTransform {
    transform(value: any): any {
        return value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, '\$1.\$2.\$3\-\$4');
    }
}