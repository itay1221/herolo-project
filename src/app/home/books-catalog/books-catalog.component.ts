import { Component, OnInit, OnDestroy } from '@angular/core';
import { Book } from '../../shared/models/book.model';
import { BooksService } from '../../shared/services/books.service';
import { Subscription } from 'rxjs';
import { ModalsService } from '../../shared/services/modals.service';

@Component({
  selector: 'app-books-catalog',
  templateUrl: './books-catalog.component.html',
  styleUrls: ['./books-catalog.component.scss']
})
export class BooksCatalogComponent implements OnInit , OnDestroy {
    booksList : Array<Book> = new Array<Book>();
    isInEditMode : boolean;
    switchText = {leftSide : 'Display Mode' , rightSide : 'Edit Mode'};
    isLoadingPage : boolean;

    deleteBookSub : Subscription = new Subscription();
    editBookSub : Subscription = new Subscription();
    addNewBookSub : Subscription = new Subscription();

    constructor(private booksService : BooksService,
                private modalsService : ModalsService){} 

    ngOnInit() {
        this.getAllBooks();
        this.isToEditABook();
        this.isToDeleteABook();
        this.isToAddABook();
    }

    getAllBooks(){
        this.isLoadingPage = true;

        this.booksService.getListOfAllBooks(
            (booksList : Array<Book>) => {
                let tempBooksArr = new Array<Book>();

                booksList.forEach(
                    (book : Book) => {
                        let tempBook = new Book();
                        tempBook.setBookData(book);
                        tempBooksArr.push(tempBook);
                    });

                this.isLoadingPage = false;
                this.booksList = tempBooksArr;
            },
            (error) => {
                this.isLoadingPage = false;
                console.log(error);
            }
        );
    }

    isToEditABook(){
        this.editBookSub = this.booksService.getEditedBook().subscribe(
            (bookToEdit) => {
                if(bookToEdit){
                    this.saveEditedBook(bookToEdit);
                }
            }
        );
    }

    isToDeleteABook(){
        this.deleteBookSub = this.booksService.getBookToDelete().subscribe(
            (bookToDeleteData) => {
                if(bookToDeleteData.isToDelete && bookToDeleteData.book) 
                    this.deleteBook(bookToDeleteData.book);
            }
        );
    }

    isToAddABook(){
        this.addNewBookSub = this.booksService.getBookToAdd().subscribe(
            (bookToAdd) => {
                if(bookToAdd){
                    this.addNewBook(bookToAdd);
                }
            }
        );
    }

    saveEditedBook(book : Book){
        let bookIndex = this.booksList.findIndex(bookFromList => bookFromList.id == book.id);
        
        if(book.bookImage){
            this.booksService.getBookImage(book.bookImage,
                (url) => {
                    book.bookImage = url;
                    this.booksList[bookIndex].setBookData(book); 
                    this.modalsService.isToOpenEditModal(false);
                },
                (defaultImg) => {
                    book.bookImage = defaultImg;
                    this.booksList[bookIndex].setBookData(book); 
                    this.modalsService.isToOpenEditModal(false);
                }
            );
        }
        else{
            book.bookImage = this.booksService.getDefaultBookImage();
            this.booksList[bookIndex].setBookData(book); 
            this.modalsService.isToOpenEditModal(false);
        }
    }

    deleteBook(bookToDelete : Book){
        let index = this.booksList.indexOf(bookToDelete);
        this.booksList.splice(index,1);
        this.booksService.setBookToDelete(null);
    }

    addNewBook(book : Book){
        if(book)
            book.id = this.booksList.length > 0 ? ((this.booksList[this.booksList.length-1].id) + 1) : 1;
        
        if(this.booksList.length < this.booksList.push(book))
            this.booksService.setNewBookAdded(book);
        else    
            this.booksService.setNewBookAdded(null);
    }

    ngOnDestroy(){
        this.deleteBookSub.unsubscribe();
        this.addNewBookSub.unsubscribe();
        this.editBookSub.unsubscribe();
    }
}
