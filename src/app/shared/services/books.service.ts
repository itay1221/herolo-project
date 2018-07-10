import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Book } from "../models/book.model";
import { Subject } from "rxjs";

@Injectable()
export class BooksService{
    private bookToAdd : Subject<Book> = new Subject<Book>();
    private newBookAdded : Subject<Book> = new Subject<Book>();
    private bookToEdit : Subject<Book> = new Subject<Book>();
    private editedBook  : Subject<Book> = new Subject<Book>();
    private bookToDelete : Subject<{book: Book, isToDelete : boolean}> = new Subject<{book: Book, isToDelete : boolean}>();

    constructor(private httpClient : HttpClient){}

    public getListOfAllBooks(callBack : (booksList : Array<Book>) => void , errorCallBack : (error) => void){
        this.httpClient.get("/assets/api/books.json")
        .toPromise()
        .then(callBack)
        .catch(errorCallBack);
    }

    public setBookToDelete(book : Book , isToDelete : boolean = false){
        this.bookToDelete.next({book : book , isToDelete : isToDelete});
    }

    public getBookToDelete() : Subject<{book : Book , isToDelete : boolean}>{
        return this.bookToDelete;
    }

    public setBookToEdit(book : Book){
        this.bookToEdit.next(book);
    }

    public getBookToEdit() : Subject<Book>{
        return this.bookToEdit;
    }

    public setEditedBook(book : Book){
        this.editedBook.next(book);
    }

    public getEditedBook() : Subject<Book>{
        return this.editedBook;
    }

    public setBookToAdd(book : Book){
        this.bookToAdd.next(book);
    }

    public getBookToAdd() : Subject<Book>{
        return this.bookToAdd;
    }

    public setNewBookAdded(bookAdded : Book){
        this.newBookAdded.next(bookAdded);
    }

    public getNewBookAdded() : Subject<Book>{
        return this.newBookAdded;
    }

    public getBookImage(imgUrl : string , callBack : (image : string) => void , errorCallBack : (defaultImg : string) => void){
        this.httpClient.get(imgUrl).toPromise()
        .catch(
            (error : HttpErrorResponse) => {
                (error.status == 200) ? 
                callBack(imgUrl) : 
                errorCallBack(this.getDefaultBookImage());
            });
    }

    public getDefaultBookImage() : string{
        return "/assets/images/book.png";
    }
}