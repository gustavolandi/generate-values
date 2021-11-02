import { ClipboardModule } from '@angular/cdk/clipboard';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ExportFileModule } from '../export-file/export-file.module';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';
import { JWTGenerateComponent } from './jwt-generate/jwt-generate.component';
import { JWTValidationComponent } from './jwt-validation/jwt-validation.component';


@NgModule({
  declarations: [
    JWTGenerateComponent,
    JWTValidationComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    MaterialModule,
    ClipboardModule,
    ReactiveFormsModule,
    FormsModule,
    ExportFileModule,
    SharedModule
  ],
  exports : [    
    JWTGenerateComponent,
    JWTValidationComponent
  ],
  providers: [],
})
export class JWTModule { }
