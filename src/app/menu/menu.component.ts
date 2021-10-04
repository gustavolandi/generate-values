import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

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
}