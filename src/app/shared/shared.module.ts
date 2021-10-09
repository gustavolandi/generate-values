import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CpfMaskDirective } from './directives/CpfMask.directive';
import { CpfPipe } from './pipes/cpf.pipe';

@NgModule({
    declarations: [ CpfPipe,CpfMaskDirective, ],
    imports: [ CommonModule ],
    exports: [ CpfMaskDirective, CpfPipe ],
    providers: [ CpfPipe ],
})
export class SharedModule {}