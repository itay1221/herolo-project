import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { Book } from '../../../../shared/models/book.model';
import { ScreenSizeService } from '../../../../shared/services/screen-size.service';
import { BooksService } from '../../../../shared/services/books.service';
import { ModalsService } from '../../../../shared/services/modals.service';

@Component({
  selector: 'app-book-item',
  templateUrl: './book-item.component.html',
  styleUrls: ['./book-item.component.scss']
})
export class BookItemComponent implements OnInit {
    @Input() book : Book;
    @Input() isInEditMode : boolean;

    constructor(private modalsService : ModalsService,
                private screenSizeService : ScreenSizeService,
                private booksService : BooksService){}

    ngOnInit(){
        this.setBookImage();
    }

    setBookImage(){
        if(this.book.bookImage){
            this.booksService.getBookImage(this.book.bookImage,
            (url) => this.book.bookImage = url,
            (defaultImg) => this.book.bookImage = defaultImg);
        }
        else{
            this.book.bookImage = this.booksService.getDefaultBookImage();
        }
    }

    deleteBook(){
        this.booksService.setBookToDelete(this.book);
    }

    editBook(){
        this.booksService.setBookToEdit(this.book);
        this.modalsService.isToOpenEditModal(true);
    }

    isXsScreen() : boolean{
        return this.screenSizeService.isXsDevice();
    }

    isLandscapeScreen() : boolean{
        return this.screenSizeService.checkIfLandscape();
    }

    isMobileDevice() : boolean{
        return this.screenSizeService.detectIfMobileDevice();
    }
}
