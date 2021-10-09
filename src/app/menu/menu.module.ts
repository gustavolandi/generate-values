import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DocumentGeneratorModule } from '../document-generator/document-generator.module';
import { MaterialModule } from '../material/material.module';
import { UUIDGeneratorModule } from '../uuid-generator/uuid-generator.module';
import { MenuComponent } from './menu.component';

@NgModule({
  declarations: [
    MenuComponent
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
