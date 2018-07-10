import { Component, OnInit } from '@angular/core';
import { ScreenSizeService } from '../../shared/services/screen-size.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit{

    logoClasses : string;

    constructor(private screenSizeService : ScreenSizeService){}

    ngOnInit(){
        this.onResize();
    }

    onResize(){
        this.logoClasses = this.isXsScreen() || (this.isMobileDevice() && this.isLandscapeScreen() && (this.isXsScreen() || this.isSmScreen() || this.screenSizeService.isMdDevice())) ? ' xs-logo-size' : ' lg-logo-size';
    }
    
    isXsScreen() : boolean{
        return this.screenSizeService.isXsDevice();
    }

    isSmScreen() : boolean{
        return this.screenSizeService.isSmDevice();
    }

    isMobileDevice() : boolean{
        return this.screenSizeService.detectIfMobileDevice();
    }

    isSmallDevice() : boolean{
        return this.screenSizeService.detectIfOnlySmallDevice();
    }
    
    isLandscapeScreen() : boolean{
        return this.screenSizeService.checkIfLandscape();
    }

    isDisplayArrowIcon() : boolean{
        return (!this.isSmallDevice() || (this.isSmallDevice() && !this.isLandscapeScreen()) || (!this.isSmallDevice() && !this.isLandscapeScreen()));
    }
}
