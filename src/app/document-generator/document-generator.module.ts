import { ClipboardModule } from '@angular/cdk/clipboard';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from '../material/material.module';
import { CNPJGeneratorComponent } from './cnpj-generator/cnpj-generator.component';
import { CPFGeneratorComponent } from './cpf-generator/cpf-generator.component';


@NgModule({
  declarations: [
    CNPJGeneratorComponent,
    CPFGeneratorComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    MaterialModule,
    ClipboardModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  exports : [    
    CNPJGeneratorComponent,
    CPFGeneratorComponent
  ],
  providers: [],
})
export class DocumentGeneratorHome { }
