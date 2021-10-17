import { ClipboardModule } from '@angular/cdk/clipboard';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ExportFileModule } from '../export-file/export-file.module';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';
import { JWTComponent } from './jwt.component';


@NgModule({
  declarations: [
    JWTComponent
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
    JWTComponent
  ],
  providers: [],
})
export class JWTModule { }
