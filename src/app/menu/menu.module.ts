import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Base64Module } from '../base-64/base-64.module';
import { DocumentGeneratorModule } from '../document-generator/document-generator.module';
import { JWTModule } from '../jwt/jwt.module';
import { MaterialModule } from '../material/material.module';
import { MD5Module } from '../md5/md5.module';
import { UUIDGeneratorModule } from '../uuid-generator/uuid-generator.module';
import { MenuItensComponent } from './menu-itens/menu-itens.component';
import { MenuComponent } from './menu.component';

@NgModule({
  declarations: [
    MenuComponent,
    MenuItensComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    UUIDGeneratorModule,
    DocumentGeneratorModule,
    Base64Module,
    MD5Module,
    JWTModule
  ],
  providers: [],
  bootstrap: [MenuComponent]
})
export class MenuModule { }
