export class Book{
    constructor(public id ? : number,
                public authorName ? : string,
                public publishedDate ? : Date,
                public bookTitle ? : string,
                public bookImage ? : string 
            ){}

    setBookData(book : Book){
        this.id = book.id;
        this.authorName = book.authorName;
        this.publishedDate = new Date(book.publishedDate);
        this.bookTitle = book.bookTitle;
        this.bookImage = book.bookImage;
    }
}