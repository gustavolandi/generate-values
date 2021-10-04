import { ClipboardModule } from '@angular/cdk/clipboard';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from '../material/material.module';
import { UUIDGeneratorHome } from './uuid-generator-home/uuid-generator-home.component';


@NgModule({
  declarations: [
    UUIDGeneratorHome
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    ClipboardModule
  ],
  exports : [UUIDGeneratorHome],
  providers: [],
})
export class UUIDGeneratorModule { }
