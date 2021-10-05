import { ClipboardModule } from '@angular/cdk/clipboard';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from '../material/material.module';
import { UUIDGeneratorHome } from './uuid-generator-home/uuid-generator-home.component';


@NgModule({
  declarations: [
    UUIDGeneratorHome
  ],
  imports: [
    CommonModule,
    BrowserModule,
    MaterialModule,
    ClipboardModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  exports : [UUIDGeneratorHome],
  providers: [],
})
export class UUIDGeneratorModule { }
