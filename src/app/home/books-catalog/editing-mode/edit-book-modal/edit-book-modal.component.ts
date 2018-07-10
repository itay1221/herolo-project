import { Component, OnInit, ViewChild, OnDestroy, Input } from '@angular/core';
import { BooksService } from '../../../../shared/services/books.service';
import { Subscription } from 'rxjs';
import { Book } from '../../../../shared/models/book.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ModalDirective } from 'angular-bootstrap-md';
import { ModalsService } from '../../../../shared/services/modals.service';
import { CustomValidators } from 'ng4-validators';
import { ScreenSizeService } from '../../../../shared/services/screen-size.service';
import { DatesService } from '../../../../shared/services/dates.service';

@Component({
  selector: 'app-edit-book-modal',
  templateUrl: './edit-book-modal.component.html',
  styleUrls: [
      './edit-book-modal.component.scss' , 
      './../../../../../assets/styles/scrollbar.scss',
      './../../../../../assets/styles/loader.scss']
})
export class EditBookModalComponent implements OnInit , OnDestroy {
    @Input() booksList : Array<Book> = new Array<Book>();
    @ViewChild('autoShownModal') autoShownModal : ModalDirective;  
    isModalShown : boolean;
    
    bookToEdit : Book = new Book();
    bookImgToPreview : string;
    editBookForm : FormGroup;

    isLoadingPage : boolean;
    errorSavingEditedBook : string;

    modalSubscription : Subscription = new Subscription();
    bookEditingSubscription : Subscription = new Subscription();

    constructor(private booksService : BooksService,
                private modalsService : ModalsService,
                private datesService : DatesService,
                private screenSizeService : ScreenSizeService){}

    ngOnInit(){
        this.isToOpenWindow();
    }

    isToOpenWindow(){
        this.isLoadingPage = true;

        this.modalSubscription = this.modalsService.editBookModalData().subscribe(
            (isToOpenModal) => {
                isToOpenModal ? this.showModal() : this.hideModal();
            }
        );

        this.bookEditingSubscription = this.booksService.getBookToEdit().subscribe(
            (bookToEdit) => {
                this.isLoadingPage = true;

                if(bookToEdit){
                    this.bookToEdit = bookToEdit;
                    this.editForm();
                    this.bookImgToPreview = this.bookToEdit.bookImage;
                }
                this.isLoadingPage = false;
            }
        );
    }

    editForm(){
        let defaultImg = this.booksService.getDefaultBookImage();

        this.editBookForm = new FormGroup({
            'bookTitle' : new FormControl(this.bookToEdit.bookTitle,Validators.required),
            'authorName' : new FormControl(this.bookToEdit.authorName,Validators.required),
            'publishedDate' : new FormControl(this.datesService.dateToIsoString(this.bookToEdit.publishedDate), 
                                             [Validators.required, CustomValidators.date]),
            'bookImage' : new FormControl(this.bookToEdit.bookImage == defaultImg ? null : this.bookToEdit.bookImage)
        });
    }

    saveEditedBook(){
        if(!this.isBookTitleExist(this.editBookForm.value.bookTitle , this.bookToEdit.id)){
            if(this.editBookForm.valid && this.datesService.isValidDate(this.editBookForm.value.publishedDate)){
                let book = new Book(
                    this.bookToEdit.id,
                    this.editBookForm.value.authorName,
                    this.datesService.isoStringToDate(this.editBookForm.value.publishedDate),
                    this.editBookForm.value.bookTitle,
                    this.bookImgToPreview
                );
                this.booksService.setEditedBook(book);
            }
            else{
                this.errorSavingEditedBook = 'Invalid fields, the book has not been updated';
                this.isLoadingPage = false;
            }
        }
        else{
            this.errorSavingEditedBook = 'There is already a book with the same title';
        }
    }

    onChangeBookImage(){
        if(this.editBookForm.value.bookImage){
            this.booksService.getBookImage(this.editBookForm.value.bookImage,
            (url) => this.bookImgToPreview = url,
            (defaultImg) => this.bookImgToPreview = defaultImg);
        }
        else{
            this.bookImgToPreview = this.booksService.getDefaultBookImage();
        }
    }

    isBookTitleExist(title : string , id : number) : boolean{
        return this.booksList.filter(
            book => ((book.bookTitle.trim().toLocaleLowerCase() == title.trim().toLocaleLowerCase())
                    && (book.id != id))).length > 0;
    }

    checkFormControlValid(formControlName : string) : boolean{
        return this.editBookForm.get(formControlName).valid;
    }

    showModal():void {
        this.isModalShown = true;
    }

    hideModal() {
        this.autoShownModal.hide();
    }

    onHidden():void {
        this.isModalShown = false;
        this.errorSavingEditedBook = '';
        this.modalsService.isToOpenEditModal(false);
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
    }
}
