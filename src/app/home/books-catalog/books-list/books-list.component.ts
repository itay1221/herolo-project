import { Component, Input } from '@angular/core';
import { Book } from '../../../shared/models/book.model';
import { ScreenSizeService } from '../../../shared/services/screen-size.service';


@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.scss']
})
export class BooksListComponent {
    @Input() booksList : Array<Book>;
    @Input() isInEditMode : boolean;
    isToOpenDeleteModal : boolean;

    constructor(private screenSizeService : ScreenSizeService){}

    getClassesForMobileDevice() : string{
        return this.screenSizeService.isXsDevice() ? ' ml-auto mr-auto' : '';
    }

    isXsScreen() : boolean{
        return this.screenSizeService.isXsDevice();
    }
}
