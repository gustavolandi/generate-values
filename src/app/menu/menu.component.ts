import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { MENU_ITENS } from './list-menu';

@Component({
  selector: 'menu-sidenav',
  templateUrl: 'menu.component.html',
  styleUrls: ['menu.component.css'],
})
export class MenuComponent {
    @ViewChild(MatSidenav)
    snav!: MatSidenav;
   
    isExpanded = true;
    showSubmenu: boolean = false;
    isShowing = false;
    showSubSubMenu: boolean = false;
    appName = 'Value Generator';
    selectedMenu = 1;
    menuItens = MENU_ITENS;
    mobileQuery: MediaQueryList;
    menuTitleSelected = '';

    private _mobileQueryListener: () => void;
      
    constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
      this.mobileQuery = media.matchMedia('(max-width: 600px)');
      this._mobileQueryListener = () => changeDetectorRef.detectChanges();
      this.mobileQuery.addListener(this._mobileQueryListener);
    }

    ngOnInit(){
      this.menuTitleSelected = MENU_ITENS[0].fullName;
    }

    ngOnDestroy(): void {
      this.mobileQuery.removeListener(this._mobileQueryListener);
    }
  
    selectMenu(selectedMenu : number) {
        this.selectedMenu = selectedMenu;
        this.menuTitleSelected = this.menuItens[this.selectedMenu-1].fullName;
    }
}