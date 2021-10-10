import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CpfMaskDirective } from './directives/CpfMask.directive';
import { CpfPipe } from './pipes/cpf.pipe';
import { CnpjPipe } from './pipes/cnpj.pipe';

@NgModule({
    declarations: [ CpfPipe,CnpjPipe,CpfMaskDirective, ],
    imports: [ CommonModule ],
    exports: [ CpfMaskDirective, CpfPipe, CnpjPipe ],
    providers: [ CpfPipe, CnpjPipe ],
})
export class SharedModule {}