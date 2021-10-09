import { Component, Input } from '@angular/core';



  @Component({
    selector: 'menu-itens',
    templateUrl: 'menu-itens.component.html',
    styleUrls: ['menu-itens.component.css'],
  })
  export class MenuItensComponent {

     @Input() selectedMenu = 1;

  }