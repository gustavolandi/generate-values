import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CpfMaskDirective } from './directives/CpfMask.directive';
import { CpfPipe } from './pipes/cpf.pipe';
import { CnpjPipe } from './pipes/cnpj.pipe';
import { CnpjMaskDirective } from './directives/CnpjMask.directive';

@NgModule({
    declarations: [ CpfPipe,CnpjPipe,CpfMaskDirective,CnpjMaskDirective ],
    imports: [ CommonModule ],
    exports: [ CpfMaskDirective,CnpjMaskDirective, CpfPipe, CnpjPipe ],
    providers: [ CpfPipe, CnpjPipe, CpfMaskDirective,CnpjMaskDirective ],
})
export class SharedModule {}