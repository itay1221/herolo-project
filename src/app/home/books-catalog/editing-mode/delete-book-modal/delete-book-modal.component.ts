import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { ModalDirective } from 'angular-bootstrap-md';
import { Subscription } from 'rxjs';
import { BooksService } from '../../../../shared/services/books.service';
import { Book } from '../../../../shared/models/book.model';
import { ScreenSizeService } from '../../../../shared/services/screen-size.service';

@Component({
  selector: 'app-delete-book-modal',
  templateUrl: './delete-book-modal.component.html',
  styleUrls: ['./delete-book-modal.component.scss']
})
export class DeleteBookModalComponent implements OnInit , OnDestroy {
    @ViewChild('autoShownModal') public autoShownModal : ModalDirective; 
    isModalShown : boolean;
    bookToDelete : Book;

    modalSubscription : Subscription = new Subscription();

    constructor(private booksService : BooksService,
                private screenSizeService : ScreenSizeService){}

    ngOnInit(){
        this.isToOpenWindow();
    }

    isToOpenWindow(){
        this.modalSubscription = this.booksService.getBookToDelete().subscribe(
            (bookToDelete) => {
                if(bookToDelete.book && !bookToDelete.isToDelete){
                    this.bookToDelete = bookToDelete.book;
                    this.showModal();
                }
                else if(!bookToDelete.book){
                    this.hideModal();
                }
            }
        );
    }

    deleteBook(book : Book){
        this.booksService.setBookToDelete(book,true);
    }

    showModal() {
        this.isModalShown = true;
    }

    hideModal() {
        this.autoShownModal.hide();
    }

    onHidden() {
        this.isModalShown = false;
        this.booksService.setBookToDelete(null);
    }

    isMobileDevice() : boolean{
        return this.screenSizeService.detectIfMobileDevice();
    }

    isLandscapeScreen() : boolean{
        return this.screenSizeService.checkIfLandscape();
    }

    ngOnDestroy(){
        this.modalSubscription.unsubscribe();
    }
}
