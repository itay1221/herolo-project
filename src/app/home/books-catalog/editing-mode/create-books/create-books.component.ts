import { Component, OnInit, ViewChild, OnDestroy, Input } from '@angular/core';
import { Book } from '../../../../shared/models/book.model';
import { ModalDirective } from 'angular-bootstrap-md';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ModalsService } from '../../../../shared/services/modals.service';
import { BooksService } from '../../../../shared/services/books.service';
import { DatesService } from '../../../../shared/services/dates.service';
import { ScreenSizeService } from '../../../../shared/services/screen-size.service';
import { CustomValidators } from 'ng4-validators';

@Component({
  selector: 'app-create-books',
  templateUrl: './create-books.component.html',
  styleUrls: ['./create-books.component.scss',
              './../../../../../assets/styles/loader.scss',
              './../../../../../assets/styles/scrollbar.scss']
})
export class CreateBooksComponent implements OnInit , OnDestroy {
    @Input() booksList : Array<Book> = new Array<Book>();
    @ViewChild('addBookModal') addBookModal : ModalDirective;  
    isModalShown : boolean;
    
    bookImgToPreview : string;
    bookForm : FormGroup;

    isLoadingPage : boolean;
    successAddingNewBook : string;
    errorAddingNewBook : string;

    modalSubscription : Subscription = new Subscription();
    bookEditingSubscription : Subscription = new Subscription();
    addNewBookSubscription : Subscription = new Subscription();

    constructor(private booksService : BooksService,
                private modalsService : ModalsService,
                private datesService : DatesService,
                private screenSizeService : ScreenSizeService){}

    ngOnInit(){
        this.setBookForm();
        this.isToOpenWindow();
        this.isNewBookAdded();
    }

    isToOpenWindow(){
        this.modalSubscription = this.modalsService.addBookModalData().subscribe(
            (isToOpenModal) => {
                isToOpenModal ? this.showModal() : this.hideModal();
            }
        );
    }

    isNewBookAdded(){
        this.addNewBookSubscription = this.booksService.getNewBookAdded().subscribe(
            (newBookAdded) => {
                if(newBookAdded)
                    this.successAddingNewBook = "Successfully added the new book! Book Id number : " + newBookAdded.id;
                else
                    this.errorAddingNewBook = "Failed to add new book";
                this.isLoadingPage = false;
            }
        );
    }

    setBookForm(){
        this.bookForm = new FormGroup({
            'bookTitle' : new FormControl(null,Validators.required),
            'authorName' : new FormControl(null,Validators.required),
            'publishedDate' : new FormControl(this.datesService.dateToIsoString(new Date()), 
                                             [Validators.required, CustomValidators.date]),
            'bookImage' : new FormControl(null)
        });
        this.bookImgToPreview = this.booksService.getDefaultBookImage();
    }

    addNewBook(){
        this.isLoadingPage = true;
        this.errorAddingNewBook = '';
        this.successAddingNewBook = '';

        if(!this.isBookTitleExist(this.bookForm.value.bookTitle)){
            if(this.bookForm.valid && this.datesService.isValidDate(this.bookForm.value.publishedDate)){
                let book = new Book(
                    0,
                    this.bookForm.value.authorName,
                    this.datesService.isoStringToDate(this.bookForm.value.publishedDate),
                    this.bookForm.value.bookTitle,
                    this.bookImgToPreview
                );

                this.booksService.setBookToAdd(book);
            }
            else{
                this.errorAddingNewBook = 'Invalid fields, the book has not been added';
                this.isLoadingPage = false;
            }
        }
        else{
            this.errorAddingNewBook = 'There is already a book with the same title';
            this.isLoadingPage = false;
        }
    }

    onChangeBookImage(){
        if(this.bookForm.value.bookImage){
            this.booksService.getBookImage(this.bookForm.value.bookImage,
            (url) => this.bookImgToPreview = url,
            (defaultImg) => this.bookImgToPreview = defaultImg);
        }
        else{
            this.bookImgToPreview = this.booksService.getDefaultBookImage();
        }
    }

    isBookTitleExist(title : string) : boolean{
        return this.booksList.filter(
            book => ((book.bookTitle.toLocaleLowerCase() == title.toLocaleLowerCase()))).length > 0;
    }

    isFormControlNotValidAndTouched(formControlName : string) : boolean{
        return (this.bookForm.get(formControlName).touched) && ! (this.bookForm.get(formControlName).valid);
    }

    showModal():void {
        this.isModalShown = true;
    }

    hideModal() {
        this.addBookModal.hide();
    }

    onHidden():void {
        this.isModalShown = false;
        this.errorAddingNewBook = '';
        this.successAddingNewBook = '';
        this.isLoadingPage = false;
        this.modalsService.isToOpenAddModal(false);
    }

    isMobileDevice() : boolean{
        return this.screenSizeService.detectIfMobileDevice();
    }

    isLandscapeScreen() : boolean{
        return this.screenSizeService.checkIfLandscape();
    }

    ngOnDestroy(){
        this.modalSubscription.unsubscribe();
        this.bookEditingSubscription.unsubscribe();
        this.addNewBookSubscription.unsubscribe();
    }
}
