import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { UUIDGeneratorHome } from './uuid-generator/uuid-generator-home/uuid-generator-home.component';

const routes: Routes = [
  { path: '', component : MenuComponent },
  { path: 'generate-uuid', component : UUIDGeneratorHome },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
