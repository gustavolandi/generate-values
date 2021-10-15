import { ClipboardModule } from '@angular/cdk/clipboard';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ExportFileModule } from '../export-file/export-file.module';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';
import { MD5Component } from './md5.component';


@NgModule({
  declarations: [
    MD5Component
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
    MD5Component
  ],
  providers: [],
})
export class MD5Module { }
