import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from '../material/material.module';
import { ExportFileComponent as ExportFileComponent } from './export-file.component';


@NgModule({
  declarations: [
    ExportFileComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  exports : [ExportFileComponent],
  providers: [],
})
export class ExportFileModule { }