export class ScreenSizeService{
    public isXlDevice() : boolean{
        return window.innerWidth >= 1200;
    }

    public isLgDevice() : boolean{
        return window.innerWidth < 1200 && window.innerWidth >= 992
    }

    public isMdDevice() {
        return window.innerWidth < 992 && window.innerWidth >= 768
    }

    public isSmDevice() {
        return window.innerWidth < 768 && window.innerWidth >= 576
    }

    public isXsDevice() {
        return window.innerWidth < 576
    }

    public checkIfLandscape() : boolean{
        return window.innerWidth > window.innerHeight;
    }
    
    public detectIfMobileDevice() : boolean { 
        if( navigator.userAgent.match(/Android/i)
        || navigator.userAgent.match(/webOS/i)
        || navigator.userAgent.match(/iPhone/i)
        || navigator.userAgent.match(/iPad/i)
        || navigator.userAgent.match(/iPod/i)
        || navigator.userAgent.match(/BlackBerry/i)
        || navigator.userAgent.match(/Windows Phone/i))
           return true;
        return false;
    }

    public detectIfOnlySmallDevice() : boolean { 
        if( navigator.userAgent.match(/Android/i)
        || navigator.userAgent.match(/webOS/i)
        || navigator.userAgent.match(/iPhone/i)
        || navigator.userAgent.match(/iPod/i)
        || navigator.userAgent.match(/BlackBerry/i)
        || navigator.userAgent.match(/Windows Phone/i))
           return true;
        return false;
    }
}