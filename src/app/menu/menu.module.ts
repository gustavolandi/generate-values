import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DocumentGeneratorModule } from '../document-generator/document-generator.module';
import { MaterialModule } from '../material/material.module';
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
    DocumentGeneratorModule
  ],
  providers: [],
  bootstrap: [MenuComponent]
})
export class MenuModule { }
