import { Component } from '@angular/core';
import { ScreenSizeService } from '../shared/services/screen-size.service';
import { Link } from '../shared/models/link.model';
import { ModalsService } from '../shared/services/modals.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
    menuOverflow : string = 'hidden';
    links : Array<Link> = [
        new Link('Home', 'main-page'),
        new Link('Books', 'main-page-catalog'),
        new Link('Add Book', null , true)
    ];
    clickedLinkIndex : number = 0;
    menuOpened : boolean = false;
    menuActionTime : number = 500;

    constructor(private screenService : ScreenSizeService,
                private modalsService : ModalsService) { }

    linkWithFunction(linkName : string){
        switch(linkName.toLocaleLowerCase()){
            case 'add book' : this.openAddBookModal();
        }
    }

    openAddBookModal(){
        this.modalsService.isToOpenAddModal(true);
    }

    closeMenu(){
        if(this.isMobile() && this.menuOpened){
            this.clickOnMobileMenuBtn();
        }
    }

    getMenuHeight(numOfLinksToAdd : number) : string{
        if(this.menuOpened){
            return (40 * (this.links.length + numOfLinksToAdd)) + 'px';
        }
        else{
            return '0px';
        }
    }

    isMobile() : boolean{
        return window.innerWidth < 992;
    }

    linkClicked(linkIndex : number){
        if(this.isMobile())
            this.menuOpened = false;
        this.clickedLinkIndex = linkIndex;
    }

    clickOnMobileMenuBtn(){
        this.menuOpened = !this.menuOpened;
    }

    onResize(){
        //close auto when it is not mobile
        if(!this.isMobile() && this.menuOpened)
            this.menuOpened = false;
    }
}
