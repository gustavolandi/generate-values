import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { MENU_ITENS } from './list-menu';

@Component({
  selector: 'menu-sidenav',
  templateUrl: 'menu.component.html',
  styleUrls: ['menu.component.css'],
})
export class MenuComponent {
    @ViewChild(MatSidenav)
    sidenav!: MatSidenav;
   
    isExpanded = true;
    showSubmenu: boolean = false;
    isShowing = false;
    showSubSubMenu: boolean = false;
    appName = 'Value Generator';
    selectedMenu = 1;
    menuItens = MENU_ITENS;
  
    mouseenter() {
      if (!this.isExpanded) {
        this.isShowing = true;
      }
    }
  
    mouseleave() {
      if (!this.isExpanded) {
        this.isShowing = false;
      }
    }

    selectMenu(selectedMenu : number) {
        this.selectedMenu = selectedMenu;
    }

    showFullName() {
      return this.isExpanded || this.isShowing;
    }

    showName() {
      return !(this.isExpanded || this.isShowing);
    }
}